import mongoose from "mongoose";
/** Import types and intefaces */
import {type BrandDocument, BrandStatus} from "../interfaces/brand.interfaces.js";

/** Note: Brand Schema For brands. */
const BrandSchema = new mongoose.Schema<BrandDocument>({
    brand:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:Object.values(BrandStatus),
        default:BrandStatus.ENABLED
    }
}, {timestamps:true});

/** Note: Brand Model for services. */
const BrandModel = mongoose.model<BrandDocument>("Brand", BrandSchema);
export default BrandModel;