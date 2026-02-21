import ChatModel from "../models/chat.model.js";
/** Response Constants */
import {ERROR_MESSAGES,STATUS_CODES} from "../constants/responseConstants.js"
import ApiError from "../utils/ApiError.js";

/** Services */
import UserServices from "./user.services.js";
import type { ChatDocument,CreateChatInterface } from "../interfaces/chat.interfaces.js";

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
    public async CreateChat(chatObject: CreateChatInterface): Promise<ChatDocument> {};
    
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
    public async DeleteChat(chatId: any): Promise<void> {};

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
    public async GetChats(chatObject: any): Promise<ChatDocument[]> {};
}