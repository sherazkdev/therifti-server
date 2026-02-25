/** Services */
import type { SendMessageInterface, MessageDocument, GetChatMessagesInterface, MarkMessagesAsSeenInterface } from "../interfaces/message.interfaces.js";
declare class MessageServices {
    private socketServices;
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
    SendMessage(sendMessageObject: SendMessageInterface): Promise<void>;
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
    GetChatMessages(object: GetChatMessagesInterface): Promise<MessageDocument[]>;
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
    MarkMessagesAsSeen(params: MarkMessagesAsSeenInterface): Promise<void>;
}
export default MessageServices;
//# sourceMappingURL=message.services.d.ts.map