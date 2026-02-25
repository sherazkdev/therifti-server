import mongoose from "mongoose";

/** Interfaces */
import { type MaterialDocument,MATERIAL_STATUS } from "../interfaces/material.interfaces.js";

/** Note: Material Schema */
const MaterialSchema = new mongoose.Schema<MaterialDocument>({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    material:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:MATERIAL_STATUS,
        default:"ENABLED"
    }
},{timestamps:true});

/** Note: Material Model */
const MaterialModel = mongoose.model<MaterialDocument>("Material",MaterialSchema);
export default MaterialModel;