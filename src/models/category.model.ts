import mongoose from "mongoose";

/** Interfaces */
import type {CategoryDocument} from "../interfaces/category.interfaces.js";
import {CategoryStatus} from "../interfaces/category.interfaces.js";

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
        required:true        
    },
    title:{
        type:String,
        minLength:3,
        required:true
    },
    status:{
        type:String,
        enum:Object.values(CategoryStatus),
        default:CategoryStatus.ENABLED
    }
},{timestamps:true})

/** CategoryModel */
const CategoryModel = mongoose.model<CategoryDocument>("Category",CategorySchema);
export default CategoryModel;