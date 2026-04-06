import mongoose from "mongoose";
/** Note: Interface */
import type { MediaDocument } from "../interfaces/media.interfaces.js";

const MediaSchema = new mongoose.Schema<MediaDocument>({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        default:null
    },
    messageId:{
        type: mongoose.Schema.Types.ObjectId,
        default:null
    },
    publicId:{
        type:String,
        required:true
    },
    mediaUrl:{
        type:String,
        required:true
    }
},{timestamps:true});

/** Note: Media Model */
const MediaModel = mongoose.model<MediaDocument>("Media",MediaSchema);
export default MediaModel;