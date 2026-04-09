import MessageModel from "../models/message.model.js";
import mongoose from "mongoose";
import { MessageStatus } from "../interfaces/message.interfaces.js";

/** Services */
import type { SendMessageInterface,MessageDocument, GetChatMessagesInterface, CancelOfferInterface, MarkMessagesAsSeenInterface, DeleteMessageInterface, AcceptOfferInterface, SendOffferInterface } from "../interfaces/message.interfaces.js";
import SocketServices from "../sockets/sockets.js";
import { Server } from "socket.io";
import ApiError from "../utils/ApiError.js";
import { ERROR_MESSAGES, STATUS_CODES } from "../constants/responseConstants.js";
import ChatModel from "../models/chat.model.js";
import type ChatServices from "./chat.services.js";
import type { CreateChatInterface } from "../interfaces/chat.interfaces.js";

class MessageServices {

	private chatServices: ChatServices;

	constructor(chatServices: ChatServices){
		this.chatServices = chatServices;
	};

	/** 
	 * Note: Getter Socket Services.
	 * 
	 * This getter is used to get the SocketServices instance.
	 * 
	 * @returns {SocketServices} - The SocketServices instance.
	*/
	private get socketServices(){
		return  SocketServices.getServerInstance();
	};

    /**
     * Note: Send Message Service.
     * 
     * This service using for message sending real time to chat room.
     * and after send message if user is ofline to send a notification.
     * 
     * @param {Object} sendMessageObject - Message sending details object.
     * @param {string} [sendMessageObject.chatId] - ChatId for chat identifier.
     * @param {string} [sendMessageObject.senderId] - SenderId using who is the message owner.
     * @param {string} [sendMessageObject.receiverId] - ReceiverId for who is a receiver.
     * @param {string} [sendMessageObject.content] - Content for message.
     *  
     * @returns {Promise<void>} - This service send a message and return a real time socket message using socket.io.
     * @throws Null.
     */
	public async SendMessage(sendMessageObject: SendMessageInterface):Promise<void> {
		const { chatId, sender, receiverId, content } = sendMessageObject;
        /** Note: Create message Document. */
		const message = await MessageModel.create({
			chatId: new mongoose.Types.ObjectId(chatId),
			senderId: new mongoose.Types.ObjectId(sender._id),
			receiverId: new mongoose.Types.ObjectId(receiverId),
			content,
			type:"TEXT",
			seen:"SENT",
			status: MessageStatus.ENABLED
		});

		/** Note: Update Chat Document Last message */
		const chatDocument = await ChatModel.findByIdAndUpdate(new mongoose.Types.ObjectId(chatId),{
			$set : {
				lastMessage: new mongoose.Types.ObjectId(message._id)
			}
		})

		const messageDocument = await MessageModel.findById(new mongoose.Types.ObjectId(message._id)).populate("senderId","fullname") as MessageDocument;

		const messageObj:any = messageDocument.toObject();
		delete messageObj.senderId;
		messageObj.sender = sender;
        /** Note: Trigger emit event. */
        this.socketServices.EmitEvents(messageObj);
		return;
	}
	/**
	 * Note: Get chat messages by chatId.
	 *
	 * This service retrieves the chat message history for a specific chat.
	 * It is used to display message history for sellers or clients.
	 *
	 * @param {Object} params - Chat message query parameters.
	 * @param {string} [params.chatId] - Unique identifier of the chat.
	 * @param {number} [params.page] - Page number for pagination (optional).
	 * @param {number} [params.limit] - Number of messages per page (optional).
	 *
	 * @returns {Promise<MessageDocument[]>} 
	 * A promise that resolves to an array of chat messages with sender details.
	*/
	public async GetChatMessages(object:GetChatMessagesInterface):Promise<MessageDocument[]> {
		const {chatId,limit,page} = object;

		const chatMessagesDocuments = await MessageModel.aggregate([
			{
				$match: {
					chatId: new mongoose.Types.ObjectId(chatId)
				}
			},
			{
				$lookup : {
					from:"users",
					localField:"senderId",
					foreignField:"_id",
					as:"sender"
				}
			},
			{
				$addFields : {
					sender:{
						$first:"$sender"
					}
				}
			},
			{
				$project: {
					_id: 1,
					content: 1,
					createdAt: 1,
					sender: {
						_id: "$sender._id",
						fullname: "$sender.fullname",
						avatar: "$sender.avatar"
					},
					offer:1,
					type:1,
					status:1,
					seen:1
				}
			}
		]);
		return chatMessagesDocuments;
	}

	/**
	 * Marks all unread messages in a chat as seen.
	 *
	 * This service updates the status of all messages in a specific chat
	 * that were sent **to the given receiver** and are not yet marked as
	 * `SEEN`. It is typically used when a user opens a chat and views
	 * previously unread messages.
	 *
	 * Update criteria:
	 * - Matches messages by `chatId`
	 * - Filters by `receiverId`
	 * - Updates only messages whose status is not `SEEN`
	 *
	 * @param {MarkMessagesAsSeenInterface} params - Parameters required to mark messages as seen.
	 * @param {string} params.chatId - Unique identifier of the chat.
	 * @param {string} params.receiverId - User ID of the message receiver.
	 *
	 * @returns {Promise<void>} Resolves when the messages are successfully updated.
	 */
	public async MarkMessagesAsSeen(params: MarkMessagesAsSeenInterface): Promise<void> {
		const { chatId, receiverId } = params;

		await MessageModel.updateMany(
			{
				chatId: new mongoose.Types.ObjectId(chatId),
				receiverId: new mongoose.Types.ObjectId(receiverId),
				seen: { $ne: "SEEN" }
			},
			{ $set: { status: "SEEN" } }
		);
	}

	/**
	 * Note: Deletes a message by its unique identifier.
	 *
	 * This service validates the existence of a message before performing
	 * a hard delete operation from the database. If the message does not
	 * exist, an ApiError is thrown.
	 *
	 * Typical use case:
	 * - User deletes a sent message.
	 * - Admin removes an inappropriate or invalid message.
	 *
	 * Deletion behavior:
	 * - Performs a permanent delete (`deleteOne`) on the message document.
	 * - No soft-delete or recovery is applied.
	 *
	 * @param {DeleteMessageInterface} deleteMessageObj - Object containing message deletion parameters.
	 * @param {string} deleteMessageObj.messageId - Unique identifier of the message to be deleted.
	 *
	 * @returns {Promise<void>} Resolves when the message is successfully deleted.
	 *
	 * @throws {ApiError} Throws BAD_REQUEST error if the message does not exist.
	 */
	public async DeleteMessage(deleteMessageObj:DeleteMessageInterface): Promise<void> {
		const {messageId} = deleteMessageObj;
		/** Note: Check Message Document is exist. */
		const messageDocument = await this.GetMessageById(messageId);
		if(!messageDocument) throw new ApiError(STATUS_CODES.BAD_REQUEST,ERROR_MESSAGES.MESSAGE.NOT_FOUND);
		/** Delete Messafe Document */
		await messageDocument.deleteOne();
		return;
	};

	/**
	 * Note: Retrieves a message document by its unique identifier.
	 *
	 * This helper method is used internally to fetch a single message
	 * from the database using its MongoDB ObjectId.
	 *
	 * Typical use cases:
	 * - Validate message existence before update or deletion.
	 * - Fetch message details for internal service logic.
	 *
	 * @param {string} messageId - Unique identifier of the message.
	 *
	 * @returns {Promise<MessageDocument | null>} 
	 * Returns the message document if found, otherwise null.
	 *
	 * Notes:
	 * - Converts the string ID to a MongoDB ObjectId.
	 * - Does not throw an error if the message is not found.
	 */
	protected async GetMessageById(messageId:string):Promise<MessageDocument | null> {
		const messageDocument = await MessageModel.findById(new mongoose.Types.ObjectId(messageId));
		return messageDocument;
	}

	/**
	 * Note: Send Offer To Seller.
	 *  
	*/
	public async SendOffer(offerObj:SendOffferInterface):Promise<any> {
		const {offeredPrice,senderId, receiverId, productId} = offerObj;
		/** Note: Chat Document is exist. */
		let chatDocument = null;
		chatDocument = await ChatModel.findOne({
			members:{$all:[new mongoose.Types.ObjectId(senderId),new mongoose.Types.ObjectId(receiverId)]},
			productRef:new mongoose.Types.ObjectId(productId)
		});
		if(!chatDocument) {
			const chatObject:CreateChatInterface = {
				members:[senderId,receiverId],
				productRef:productId
			};
			chatDocument = await this.chatServices.CreateChat(chatObject);
		};

		/** Note: Check Old Offer is exist */
		const oldOfferMessage = await MessageModel.findOne({
			chatId:new mongoose.Types.ObjectId(chatDocument._id),
			type:"OFFER"
		});
		if(!oldOfferMessage){
			const messageDoc = await MessageModel.create({
				chatId: new mongoose.Types.ObjectId(chatDocument._id),
				senderId: new mongoose.Types.ObjectId(senderId),
				receiverId: new mongoose.Types.ObjectId(receiverId),
				offer:{
					previousOfferId: null,
					offeredPrice: offeredPrice,
					status:"PENDING"
				},
				type:"OFFER",
				status:"ENABLED"
			});
		}else {
			const messageDoc = await MessageModel.create({
				chatId: new mongoose.Types.ObjectId(chatDocument._id),
				senderId: new mongoose.Types.ObjectId(senderId),
				receiverId: new mongoose.Types.ObjectId(receiverId),
				offer:{
					previousOfferId: new mongoose.Types.ObjectId(oldOfferMessage._id),
					offeredPrice: offeredPrice,
					status:"PENDING"
				},
				type:"OFFER",
				status:"ENABLED"
			});			
		}

		return {chatId:chatDocument._id};
	};

	
	public async AcceptOffer(acceptOfferObj:AcceptOfferInterface):Promise<void> {
		const { offerId } = acceptOfferObj;
		/** Note: Message Document is exist. */
		const messageDocument = await MessageModel.findById(new mongoose.Types.ObjectId(offerId));
		if(!messageDocument) throw new ApiError(STATUS_CODES.BAD_REQUEST,ERROR_MESSAGES.MESSAGE.NOT_FOUND);
		/** Note: Update Message Document Offer Status. */
		await messageDocument.updateOne({
			$set:{
				"offer.status":"ACCEPTED"
			}
		});
		return;
	};


	public async CancelOffer(cancelOfferObj:CancelOfferInterface):Promise<void> {
		const { offerId } = cancelOfferObj;		
		/** Note: Message Document is exist. */
		const messageDocument = await MessageModel.findById(new mongoose.Types.ObjectId(offerId));
		if(!messageDocument) throw new ApiError(STATUS_CODES.BAD_REQUEST,ERROR_MESSAGES.MESSAGE.NOT_FOUND);
		/** Note: Update Message Document Offer Status. */
		await messageDocument.updateOne({
			$set:{
				"offer.status":"CANCELLED"
			}
		});
		return;
	};
}

export default MessageServices;
