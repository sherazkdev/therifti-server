import ChatModel from "../models/chat.model.js";
/** Response Constants */
import {ERROR_MESSAGES,STATUS_CODES} from "../constants/responseConstants.js"
import ApiError from "../utils/ApiError.js";

/** Services */
import UserServices from "./user.services.js";
import type { ChatDocument,CreateChatInterface, GetChatInterface } from "../interfaces/chat.interfaces.js";
import mongoose from "mongoose";

class ChatServices {
    private userService = new UserServices();
    
    /**
     * Note: Creates a chat room for communication between a seller and a client.
     *
     * This service enables real-time communication between users
     * based on a specific product reference. Only one chat room
     * can exist per product between participants.
     *
     * @param {Object} chatObject - Chat creation details.
     * @param {Array<string>} chatObject.members - List of user IDs participating in the chat.
     * @param {string} chatObject.productRef - Reference ID of the product related to the conversation.
     *
     * @returns {Promise<ChatDocument>} The newly created chat room document.
     *
     * @throws {ApiError} If a chat room already exists for the given product and members.
     */
    public async CreateChat(chatObject: CreateChatInterface): Promise<ChatDocument> {
        const {members,productRef} = chatObject;
        /** Note: Check chat allready exist. */
        const oldChatDocument = await this.CheckChatByMembers(members);
        if(oldChatDocument) throw new ApiError(STATUS_CODES.BAD_REQUEST,ERROR_MESSAGES.CHAT.ALREADY_EXIST);
        /** If not exist chat document create new chat document for messaging room. */
        const chatDocument = await ChatModel.create({
            productRef:new mongoose.Types.ObjectId(productRef),
            members:members.map(id => new mongoose.Types.ObjectId(id))
        });
        return chatDocument;
    };
    
    /**
     * Note: Check Chat By Members.
     * 
     * This service using for check chat is exist to return a chat. and if not exist return a nullable value.
     * 
     * @param {Array} members - List of user IDs participating in the chat.
     * @returns {ChatDocument} Matched chat document. 
    */
    public async CheckChatByMembers(members:string[]):Promise<ChatDocument | null> {
        const chatDocument = await ChatModel.findOne({
            members : { $all : members }
        });
        return chatDocument;
    };

    /**
     * Note: Deletes an existing chat room by its unique identifier.
     *
     * This service permanently removes the chat and its related data
     * (such as messages, if handled within the same flow).
     *
     * @param {string} chatId - Unique identifier of the chat room to delete.
     *
     * @returns {Promise<void>} Resolves when the chat is successfully deleted.
     *
     * @throws {ApiError} If the chat does not exist or deletion fails.
     */
    public async DeleteChat(chatId: any): Promise<void> {
        /** Note: Check chat room is already exist. */
        const chatDocument = await ChatModel.findById(new mongoose.Types.ObjectId(chatId));
        if(!chatDocument) throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.CHAT.CHAT_NOT_FOUND);
        /** Note: Delete Permanently chat room. */
        await chatDocument.deleteOne();
        return; 
    };

    /**
     * Note: Retrieves all chat rooms based on the provided filter criteria.
     *
     * This service returns a list of chat rooms associated with
     * a specific user or matching given conditions.
     *
     * @param {Object} chatObject - Filtering options for fetching chats.
     * @param {string} [chatObject.userId] - User ID to retrieve chats for a specific user.
     * @param {string} [chatObject.productRef] - Optional product reference filter.
     *
     * @returns {Promise<ChatDocument[]>} A list of chat room documents.
     *
     * @throws {ApiError} If retrieval fails.
    */
    public async GetChats(chatObject: GetChatInterface): Promise<ChatDocument[]> {
        const {userId} = chatObject;
        /** Note: Chats list. */
        const chatDocuments = await ChatModel.aggregate([
            {
                $match: {
                    members: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "members",
                    foreignField: "_id",
                    as: "members"
                }
            },
            {
                $addFields: {
                    member: {
                        $filter: {
                            input: "$members",
                            as: "m",
                            cond: {
                                $ne: ["$$m._id", new mongoose.Types.ObjectId(userId)]
                            }
                        }
                    }
                }
            },
            {
                $unwind : "$member"
            },
            {
                $lookup: {
                    from: "messages",
                    localField: "lastMessage",
                    foreignField: "_id",
                    as: "lastMessage"
                }
            },
            {
                $project : {
                    _id:1,
                    lastMessage:1,
                    "member.avatar":1,
                    "member._id":1,
                    "member.fullname":1,
                }
            }
        ]);
        return chatDocuments;
    };
}