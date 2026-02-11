import mongoose from "mongoose";

/** Import Types */
import type {ProductDocument} from "../interfaces/product.interfaces.js";
import { ProductColor, ProductCondition, ProductMaterial, ProductParcelSize, ProductStatus } from "../interfaces/product.interfaces.js";

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
        enum:Object.values(ProductCondition),
        required:true
    },
    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Brand",
        index:true,
        required:true
    },
    material:{
        type:String,
        enum:Object.values(ProductMaterial),
        required:true
    },
    colors:{
        type: [String],
        enum: Object.values(ProductColor),
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
        enum:Object.values(ProductParcelSize),
        default:ProductParcelSize.MEDIUM
    },
    status:{
        type:String,
        enum:Object.values(ProductStatus),
        default:ProductStatus.PUBLISHED
    }
},{timestamps:true});

/* ProductModel **/
const ProductModel = mongoose.model<ProductDocument>("Product",ProductSchema);
export default ProductModel;