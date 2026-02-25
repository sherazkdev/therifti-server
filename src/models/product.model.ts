import mongoose from "mongoose";

/** Import Types */
import type {ProductDocument} from "../interfaces/product.interfaces.js";
import { PRODUCT_COLOR, PRODUCT_CONDITION, PRODUCT_MATERIAL, PRODUCT_MATERIAL_ENUM, PRODUCT_PARCEL_SIZE, PRODUCT_STATUS } from "../interfaces/product.interfaces.js";

const ProductSchema = new mongoose.Schema<ProductDocument>({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        index:true,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true  
    },
    size:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Size",
        required:true
    },
    title:{
        type:String,
        index:true,
        required:true
    },
    coverImage:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    condition:{
        type:String,
        index:true,
        enum:PRODUCT_CONDITION,
        required:true
    },
    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Brand",
        index:true,
        required:true
    },
    materials: [
        {
            type: String,
            enum: PRODUCT_MATERIAL_ENUM,
            required: true,
        },
    ],
    colors:{
        type: [String],
        enum: PRODUCT_COLOR,
        validate: {
            validator: (v: String[]) => v.length <= 2,
            message: `Error: maximum 2 colors allowed.`
        },
        index: true,
    },
    price:{
        type:Number,
        index:true,
        required:true,
    },
    parcelSize:{
        type:String,
        enum:PRODUCT_PARCEL_SIZE,
        required:true
    },
    status:{
        type:String,
        enum:PRODUCT_STATUS,
        default:"PUBLISHED"
    }
},{timestamps:true});

/* ProductModel **/
const ProductModel = mongoose.model<ProductDocument>("Product",ProductSchema);
export default ProductModel;