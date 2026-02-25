import mongoose from "mongoose";
/** Types */
import {} from "../interfaces/chat.interfaces.js";
/** Chat Model */
const ChatSchema = new mongoose.Schema({
    productRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: null
    }
}, { timestamps: true });
/** ChatModel */
const ChatModel = mongoose.model("Chat", ChatSchema);
export default ChatModel;
//# sourceMappingURL=chat.model.js.map