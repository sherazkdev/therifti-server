import SizeModel from "../models/size.model.js";
/** Response Constants */
import {SUCCESS_MESSAGES,ERROR_MESSAGES, STATUS_CODES} from "../constants/responseConstants.js";
import ApiError from "../utils/ApiError.js";

/** Interfaces */
import type { CreateSizeInterface, SizeDocument, UpdateSizeInterface } from "../interfaces/size.interfaces.js";
import mongoose from "mongoose";
class SizeServices {

    /**
     * Note: Create Size.
     * @param {string} categoryId - CategoryId reference.
     * @param {string} international - international size is required.
     * @param {string} US - Us size | Optional.
     * @param {string} UK - UK size | Optionl.
     * @param {String} EU - EU size | Optional.
     * @param {string} waist - waist is Optional.
     * @throws {ApiError} if size already exist throw error.
     * @returns {UserDocument}.
    */
    public async CreateSize(sizeDetails:CreateSizeInterface):Promise<SizeDocument> {
        const {categoryId,international,EU,UK,US,waist} = sizeDetails;
        /** Note: Check size already exist */
        const size = await SizeModel.findOne({
            categoryId:new mongoose.Types.ObjectId(categoryId),
            international:international
        });
        if(size){
            throw new ApiError(STATUS_CODES.UNAUTHORIZED,ERROR_MESSAGES.SIZE.ALREADY_EXIST);
        }
        /** Note: Create Size Document */
        const sizeDocument = await SizeModel.create({
            categoryId:new mongoose.Types.ObjectId(categoryId),
            international:international,
            US:US ?? null,
            UK:UK ?? null,
            EU:EU ?? null,
            waist:waist ?? null
        });

        return sizeDocument;

    };
    
    /**
     * Note: Find Size by Id.
     * @param {string} sizeId - sizeId of the SizeDocument.
     * @throws {ApiError} if sizeDocument not exist.
     * @returns {Promise<SizeDocument>} finded sizeDocument.
    */
    public async FindSizeById(sizeId:string):Promise<SizeDocument> {
        const sizeDocument = await SizeModel.findById(new mongoose.Types.ObjectId(sizeId));
        if(!sizeDocument){
            throw new ApiError(STATUS_CODES.UNAUTHORIZED,ERROR_MESSAGES.SIZE.NOT_FOUND);
        }
        return sizeDocument;
    }

    /**
     * Updates an existing Size document.
     *
     * @param {UpdateSizeInterface} updateSizeObject - Object containing fields to update.
     * @param {string} updateSizeObject.sizeId - Unique identifier of the Size document.
     * @param {string} [updateSizeObject.categoryId] - Category reference ID.
     * @param {string} [updateSizeObject.international] - International size standard.
     * @param {string} [updateSizeObject.UK] - UK size standard.
     * @param {string} [updateSizeObject.EU] - EU size standard.
     * @param {string} [updateSizeObject.US] - US size standard.
     * @param {string} [updateSizeObject.waist] - Waist measurement.
     *
     * @returns {Promise<SizeDocument>} Updated Size document.
     *
     * @throws {ApiError} If the Size document does not exist.
    */
    public async UpdateSize(updateSizeObject:UpdateSizeInterface):Promise<SizeDocument> {
        const {categoryId,international,sizeId,EU,UK,US,waist} = updateSizeObject;
        
        /** Check SizeDocument is exist. */
        const sizeDocument = await this.FindSizeById(sizeId);
        /** Note: Assigin the UpdateSizeObject value to SizeDocument. */
        sizeDocument.categoryId = new mongoose.Types.ObjectId(categoryId);
        sizeDocument.international = international;
        if(EU !== undefined) sizeDocument.EU = EU;
        if(UK !== undefined) sizeDocument.UK = UK;
        if(US !== undefined) sizeDocument.US = US;
        if(waist !== undefined) sizeDocument.waist = waist;

        /** Note: Save document. */
        await sizeDocument.save();
        return sizeDocument;
    };

    /**
     * Note: Delete Size Document.
     * @param {string} sizeId - Unique identifier of the Size document.
     * 
     * @returns {Promise<boolean>} If size Document return boolean.
     * @throws {ApiError} If size Document does not exist.
    */
    public async DeleteSize(sizeId:string):Promise<boolean> {
        const sizeDocument = await this.FindSizeById(sizeId);
        /** Note: Delete Size document. */
        await sizeDocument.deleteOne();
        return true;
    };

    /**
     * Note: Find Category sizes Document.
     * @param {string} categoryId - Size Document Indentifier.
     * @returns {Promise<SizeDocument[]>} Matched By categoryId size documents. 
    */
    public async GetSizedsByCategory(categoryId:string):Promise<SizeDocument[]> {
        const sizesDocuments = await SizeModel.find({
            categoryId:new mongoose.Types.ObjectId(categoryId)
        });
        return sizesDocuments;
    };
}

export default SizeServices;