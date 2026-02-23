import MessageModel from "../models/message.model.js";
import ApiError from "../utils/ApiError.js";
import {ERROR_MESSAGES, STATUS_CODES} from "../constants/responseConstants.js";
import mongoose from "mongoose";
import { MessageStatus } from "../interfaces/message.interfaces.js";
import { NotificationType } from "../interfaces/notification.interface.js";

/** Services */
import type { SendMessageInterface,MessageDocument, GetChatMessagesInterface } from "../interfaces/message.interfaces.js";
import SocketServices from "../sockets/sockets.js";

class MessageServices {
    private socketServices = new SocketServices();
    
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
		const { chatId, senderId, receiverId, content } = sendMessageObject;
        /** Note: Create message Document. */
		const message = await MessageModel.create({
			chatId: new mongoose.Types.ObjectId(chatId),
			senderId: new mongoose.Types.ObjectId(senderId),
			receiverId: new mongoose.Types.ObjectId(receiverId),
			content,
			status: MessageStatus.SENT
		});

        /** Note: Trigger emit event. */
        this.socketServices.EmitEvents(message);
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
				$lookup: {
					from: "users",
					localField: "senderId",
					foreignField: "_id",
					as: "sender"
				}
			},
			{ $unwind: "$sender" },
			{
				$project: {
					_id: 1,
					content: 1,
					createdAt: 1,
					sender: {
						_id: "$sender._id",
						fullname: "$sender.fullname",
						avatar: "$sender.avatar"
					}
				}
			}
		]);
		
		return chatMessagesDocuments;
	}

	public async MarkMessagesAsSeen(chatId: string, receiverId: string) {
		await MessageModel.updateMany({
			chatId: new mongoose.Types.ObjectId(chatId),
			receiverId: new mongoose.Types.ObjectId(receiverId),
			status: { $ne: MessageStatus.SEEN }
		}, { $set: { status: MessageStatus.SEEN } });
		return;
	}
}

export default MessageServices;
