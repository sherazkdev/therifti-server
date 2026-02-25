import mongoose from "mongoose";
/** Import types and intefaces */
import {type BrandDocument, BRAND_STATUS} from "../interfaces/brand.interfaces.js";

/** Note: Brand Schema For brands. */
const BrandSchema = new mongoose.Schema<BrandDocument>({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:BRAND_STATUS,
        default:"ENABLED"
    }
}, {timestamps:true});

/** Note: Brand Model for services. */
const BrandModel = mongoose.model<BrandDocument>("Brand", BrandSchema);
export default BrandModel;