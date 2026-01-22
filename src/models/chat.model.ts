import mongoose from "mongoose";
/** Types */
import {type ChatDocument} from "../interfaces/chat.interfaces.js";

/** Chat Model */
const ChatSchema = new mongoose.Schema<ChatDocument>({
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }],
    lastMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
        default:null
    }
},{timestamps:true});
/** ChatModel */
const ChatModel = mongoose.model<ChatDocument>("Chat",ChatSchema);
export default ChatModel