import type { ChatDocument, CreateChatInterface, GetChatInterface } from "../interfaces/chat.interfaces.js";
declare class ChatServices {
    private userService;
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
    CreateChat(chatObject: CreateChatInterface): Promise<ChatDocument>;
    /**
     * Note: Check Chat By Members.
     *
     * This service using for check chat is exist to return a chat. and if not exist return a nullable value.
     *
     * @param {Array} members - List of user IDs participating in the chat.
     * @returns {ChatDocument} Matched chat document.
    */
    CheckChatByMembers(members: string[]): Promise<ChatDocument | null>;
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
    DeleteChat(chatId: string): Promise<void>;
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
    GetChats(chatObject: GetChatInterface): Promise<ChatDocument[]>;
}
export default ChatServices;
//# sourceMappingURL=chat.services.d.ts.map