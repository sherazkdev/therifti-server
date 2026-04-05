import mongoose from "mongoose";
/** Types || Interfaces */
import {type MessageDocument,MessageStatus, OFFER_STATUS, SEEN_STATUS, TYPE_STATUS} from "../interfaces/message.interfaces.js";

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
    offer:{
        type:{    
            previousOfferId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Chat",
                default:null
            },
            offeredPrice:{
                type:Number,
                required:true
            },
            status:{
                type:String,
                enum:OFFER_STATUS,
                required:true,
                default:"PENDING"
            }
        }
    },
    content:{
        type:String,
        required:true
    },
    seen:{
        type:String,
        enum:SEEN_STATUS,
        default:"SENT"
    },
    type:{
        type:String,
        enum:TYPE_STATUS,
        required:true
    },
    status:{
        type:String,
        enum:Object.values(MessageStatus),
        default:MessageStatus.ENABLED
    }
},{ timestamps:true});

/** MessageModel */
const MessageModel = mongoose.model<MessageDocument>("Message", MessageSchema);
export default MessageModel;