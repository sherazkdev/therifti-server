import mongoose from "mongoose";
import type { SizeDocument } from "../interfaces/size.interfaces.js";

/** Note: Size Schema */
const SizeSchema = new mongoose.Schema<SizeDocument>({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    international:{
        type:String,
        required:true
    },
    EU:{
        type:String,
        default:null
    },
    US:{
        type:String,
        default:null
    },
    UK:{
        type:String,
        default:null
    },
    waist:{
        type:String,
        default:null
    }
},{timestamps:true});

/** Note: Size Model */
const SizeModel = mongoose.model<SizeDocument>("Size",SizeSchema);

export default SizeModel;