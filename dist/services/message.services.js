import MessageModel from "../models/message.model.js";
import mongoose from "mongoose";
import { MessageStatus } from "../interfaces/message.interfaces.js";
import SocketServices from "../sockets/sockets.js";
class MessageServices {
    socketServices = SocketServices.io();
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
    async SendMessage(sendMessageObject) {
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
    async GetChatMessages(object) {
        const { chatId, limit, page } = object;
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
    async MarkMessagesAsSeen(params) {
        const { chatId, receiverId } = params;
        await MessageModel.updateMany({
            chatId: new mongoose.Types.ObjectId(chatId),
            receiverId: new mongoose.Types.ObjectId(receiverId),
            status: { $ne: MessageStatus.SEEN }
        }, { $set: { status: MessageStatus.SEEN } });
    }
}
export default MessageServices;
//# sourceMappingURL=message.services.js.map