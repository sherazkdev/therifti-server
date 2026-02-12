import BrandModel from "../models/brand.model.js";
/** Response Constants */
import {SUCCESS_MESSAGES,ERROR_MESSAGES, STATUS_CODES} from "../constants/responseConstants.js";
import ApiError from "../utils/ApiError.js";

/** Interfaces */
import type {BrandDocument,CreateBrandInterface} from "../interfaces/brand.interfaces.js";
import mongoose from "mongoose";

class BrandServices {

    /**
     * Note: Create Brand For Product.
     * @param {object} brandObject - Object containing fields to update.
     * @param {string} [brandObject.categoryId] - Category reference ID.
     * @param {string} [brandObject.brand] - Brand name.
     * @param {string} [brandObject.status] - Brand visibility status.
     * 
     * @throws {ApiError} If brand already brand name is unique.
     * @returns {BrandDocument} Newly brand document
    */
    public async CreateBrand(brandObject:CreateBrandInterface):Promise<BrandDocument> {
        const {brand,categoryId,status} = brandObject;
        /** Note: Check Brand is Already exist. */
        const brandDocument = await BrandModel.findOne({
            categoryId:new mongoose.Types.ObjectId,
            brand:brand
        });
        if(brandDocument) throw new ApiError(STATUS_CODES.UNAUTHORIZED,ERROR_MESSAGES.BRAND.ALREADY_EXIST);
        /** Note: Create newly Brand document. */
        const createBrandDocument = await BrandModel.create({
            categoryId:new mongoose.Types.ObjectId(categoryId),
            brand:brand,
            status:status
        });
        return createBrandDocument;
    };

    /**
     * Note: Get Brand By Category.
     * @param {string} categoryId - Brand Identifier.
     * @returns {Promise<BrandDocument[]>} return matched documents. 
    */
    public async GetBrandByCategory(categoryId:string):Promise<BrandDocument[]> {
        const brands = await BrandModel.find({
            categoryId:new mongoose.Types.ObjectId(categoryId)
        });
        return brands;
    };
    
}

export default BrandServices;