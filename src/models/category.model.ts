import mongoose from "mongoose";

/** Interfaces */
import type {CategoryDocument} from "../interfaces/category.interfaces.js";
import {CATEGORY_STATUS} from "../interfaces/category.interfaces.js";

/** CategorySchema */
const CategorySchema = new mongoose.Schema<CategoryDocument>({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        default:null
    },
    title:{
        type:String,
        minLength:3,
        required:true
    },
    image:{
        type:String,
        required:true    
    },
    status:{
        type:String,
        enum:CATEGORY_STATUS,
        default:"ENABLED"
    }
},{timestamps:true})

/** CategoryModel */
const CategoryModel = mongoose.model<CategoryDocument>("Category",CategorySchema);
export default CategoryModel;