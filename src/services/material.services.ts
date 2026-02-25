import MaterialModel from "../models/material.model.js";
import mongoose from "mongoose";

/** Response Constants */
import {ERROR_MESSAGES, STATUS_CODES} from "../constants/responseConstants.js";
import { type MaterialDocument, type CreateMaterialInterface, type DeleteMaterialInterface, type GetMaterialByCategoryInterface, type GetMaterialInterface, type UpdateMaterialInterface } from "../interfaces/material.interfaces.js";
import ApiError from "../utils/ApiError.js";

/** Note: Services */
import CategoryServices from "./category.services.js";

class MaterialServices {
    private categoryService:CategoryServices;

    constructor(categoryService:CategoryServices){
        this.categoryService = categoryService;
    }

    /**
     * Note: Create Material Service.
     * 
     * `Purpose:`
     * - This service using for create a material for a multiple products.
     * - and we get any category material using categoryId.
     *  
     * @param {CreateMaterialInterface} materialObj - Create a material using materialObj data.
     * @param {string} [materialObj.categoryId] - CategoryId for material identifer what material the category.
     * @param {string} [materialObj.material] - Material like title to show on client face.
     * @param {string} [materialObj.status] - Status for decide to show the user client and soft delete is possible using status.
     * 
     * @throws {Promise<ApiError>} - If material title already exist `Duplicate not allowed`.
     * @returns {Promise<void>} - Noting to return.
     * 
     * `Notes:`
     * - Validates that the selected category exists before creation
     * - Validates Duplicate Material is exist.
     * - Automatically converts string IDs to MongoDB ObjectIds
     * - Business logic is handled at the service layer
    */
    public async CreateMaterial(materialObj:CreateMaterialInterface):Promise<void> {
        const {categoryId,material,status} = materialObj;
        /** Note: Validate Category Document is exist. */
        const categoryDocument = await this.categoryService.GetCategoryById(categoryId);
        if(!categoryDocument) throw new ApiError(STATUS_CODES.BAD_REQUEST,ERROR_MESSAGES.CATEGORY.NOT_FOUND);
        // Note: Check already exist category document.
        const materialDocument = await MaterialModel.findOne({material:material});
        if(materialDocument) throw new ApiError(STATUS_CODES.BAD_REQUEST,ERROR_MESSAGES.MATERIAL.ALREADY_EXIST);
        // Category Document
        await MaterialModel.create({
            categoryId:new mongoose.Types.ObjectId(categoryId),
            material:material,
            status:status
        });
        return;
    };


    /**
     * Note: Update Material Service.
     * 
     * `Purpose:`
     * - Updates an existing material document.
     * - Ensures category and material name are valid and not duplicated.
     * 
     * @param {UpdateMaterialInterface} materialObj - Data for updating material.
     * @param {string} [materialObj.materialId] - Material document ID to update.
     * @param {string} [materialObj.categoryId] - Updated category ID.
     * @param {string} [materialObj.material] - Updated material title.
     * @param {MaterialStatus} [materialObj.status] - Updated status.
     * 
     * @throws {Promise<ApiError>} - Throws if material or category not found, or duplicate title exists.
     * @returns {Promise<void>} - Nothing is returned.
     * 
     * `Notes:`
     * - Checks material document exists.
     * - Validates category changes.
     * - Checks duplicate material titles before updating.
     */
    public async UpdateMaterial(materialObj:UpdateMaterialInterface):Promise<void> {
        const {categoryId,material,materialId,status} = materialObj;
        /** Note: Check material document is exist. */
        const materialDocument = await MaterialModel.findById(new mongoose.Types.ObjectId(materialId));
        if(!materialDocument) throw new ApiError(STATUS_CODES.BAD_REQUEST,ERROR_MESSAGES.MATERIAL.NOT_FOUND);
        /** If category Document found. */
        if(materialDocument.categoryId.toString() != categoryId){
            /** Note: Validate Category Document is exist. */
            const categoryDocument = await this.categoryService.GetCategoryById(categoryId);
            if(!categoryDocument) throw new ApiError(STATUS_CODES.BAD_REQUEST,ERROR_MESSAGES.CATEGORY.NOT_FOUND);
        } if(materialDocument.material !== material){
            // Note: Check already exist category document.
            const materialDocument = await MaterialModel.findOne({material:material});
            if(materialDocument) throw new ApiError(STATUS_CODES.BAD_REQUEST,ERROR_MESSAGES.MATERIAL.ALREADY_EXIST);
        }
        /** Note: Assign to materialDocument update document values */
        materialDocument.categoryId = new mongoose.Types.ObjectId(categoryId);
        materialDocument.material = material;
        materialDocument.status = status;
        await materialDocument.save();
        return;

    };
    
    /**
     * Note: Delete Material Service.
     * 
     * `Purpose:`
     * - Permanently deletes a material document by its ID.
     * 
     * @param {DeleteMaterialInterface} materialObj - Data for deleting material.
     * @param {string} [materialObj.materialId] - Material document ID to delete.
     * 
     * @throws {Promise<ApiError>} - Throws if material document not found.
     * @returns {Promise<void>} - Nothing is returned.
     */
    public async DeleteMaterial(materialObj:DeleteMaterialInterface):Promise<void> {
        const {materialId} = materialObj;
        /** Note: Check material document is exist. */
        const materialDocument = await MaterialModel.findById(new mongoose.Types.ObjectId(materialId));
        if(!materialDocument) throw new ApiError(STATUS_CODES.BAD_REQUEST,ERROR_MESSAGES.MATERIAL.NOT_FOUND);
        
        /** Note: Delete materialDocument parmanently. */
        await materialDocument.deleteOne();
        return;
    };

    /**
     * Note: Get Materials Service.
     * 
     * `Purpose:`
     * - Fetches all materials with pagination.
     * 
     * @param {GetMaterialInterface} materialObj - Pagination data.
     * @param {number} [materialObj.limit] - Maximum number of documents to fetch.
     * @param {number} [materialObj.page] - Page number for pagination.
     * @param {string} [materialObj.userId] - Optional user context for filtering (if needed).
     * 
     * @returns {Promise<MaterialDocument[]>} - Array of material documents.
     */
    public async GetMaterials(materialObj:GetMaterialInterface):Promise<MaterialDocument[]> {
        const {limit,page,userId} = materialObj;
        const skipNumber = (page - 1) * limit;

        const materialDocuments = await MaterialModel.find().skip(skipNumber).limit(limit);
        return materialDocuments;
    };

    /**
     * Note: Get Material By Category Service.
     * 
     * `Purpose:`
     * - Fetches all materials for a specific category.
     * 
     * @param {GetMaterialByCategoryInterface} materialObj - Category filter data.
     * @param {string} [materialObj.categoryId] - Category ID to filter materials.
     * 
     * @returns {Promise<MaterialDocument[]>} - Array of material documents for the category.
     */
    public async GetMaterialByCategory(materialObj:GetMaterialByCategoryInterface):Promise<MaterialDocument[]> {
        const {categoryId} = materialObj;
        /** Note: Get material by category Id safely. */
        const materialDocuments = await MaterialModel.find({categoryId:new mongoose.Types.ObjectId(categoryId)});
        return materialDocuments;
    };
}

export default MaterialServices;