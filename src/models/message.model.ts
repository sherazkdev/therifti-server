import mongoose from "mongoose";
/** Types || Interfaces */
import {type MessageDocument,MessageStatus} from "../interfaces/message.interfaces.js";

/** MessageSchema */
const MessageSchema = new mongoose.Schema<MessageDocument>({
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat",
        required:true
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat",
        required:true
    },
    content:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:Object.values(MessageStatus),
        default:MessageStatus.SENT
    }
},{ timestamps:true});

/** MessageModel */
const MessageModel = mongoose.model<MessageDocument>("Message", MessageSchema);
export default MessageModel;