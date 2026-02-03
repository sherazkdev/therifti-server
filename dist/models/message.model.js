import mongoose from "mongoose";
/** Types || Interfaces */
import { MessageStatus } from "../interfaces/message.interfaces.js";
/** MessageSchema */
const MessageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(MessageStatus),
        default: MessageStatus.SENT
    }
}, { timestamps: true });
/** MessageModel */
const MessageModel = mongoose.model("Message", MessageSchema);
export default MessageModel;
//# sourceMappingURL=message.model.js.map