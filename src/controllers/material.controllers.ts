/** Response Constants */
import {ERROR_MESSAGES, STATUS_CODES, SUCCESS_MESSAGES} from "../constants/responseConstants.js";
import ApiError from "../utils/ApiError.js";

/** Note: imports types */
import type {Request,Response} from "express";
import { VALIDATE_CREATE_MATERIAL,VALIDATE_UPDATE_MATERIAL,VALIDATE_GET_MATERIAL_BY_CATEGORY,VALIDATE_DELETE_MATERIAL,VALIDATE_GET_MATERIALS } from "../validaters/material.validaters.js";

/** Services*/
import MaterialServices from "../services/material.services.js";
import ApiResponse from "../utils/ApiResponse.js";

class MaterialControllers {
    private materialServices: MaterialServices;

    constructor(materialServices:MaterialServices){
        this.materialServices = materialServices;
    }

    /**
     * Note: Handle Create Material
     *
     * Purpose:
     * This controller handles the creation of a new material.
     * It validates the incoming request data using Zod and delegates
     * the creation action to MaterialService.
     *
     * @param {Request} req - Express request object containing the material payload.
     * @param {Response} res - Express response object.
     * 
     * @returns {Promise<Response>} API response indicating success of material creation.
     *
     * Use cases:
     * - Admin or system adds a new material for products.
     * - Material is linked to a specific category using categoryId.
     *
     * Notes:
     * - Validation is performed using Zod.
     * - Converts string IDs to MongoDB ObjectIds.
     * - Throws ApiError if material already exists.
     */
    public HandleCreateMaterial = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_CREATE_MATERIAL.parse(req.body);

        /** Note: Create material payload. */
        const createMaterialPayload = result;
        await this.materialServices.CreateMaterial(createMaterialPayload);
        return res.status(STATUS_CODES.CREATED).json(
            new ApiResponse([],SUCCESS_MESSAGES.MATERIAL.CREATED,true,STATUS_CODES.CREATED)
        )
    };

    /**
     * Note: Handle Update Material
     *
     * Purpose:
     * This controller handles updating an existing material.
     * It validates request data using Zod and delegates update action to MaterialService.
     *
     * @param {Request} req - Express request object containing update payload.
     * @param {Response} res - Express response object.
     * 
     * @returns {Promise<Response>} API response indicating success of material update.
     *
     * Use cases:
     * - Admin updates material name, status, or category.
     * - Ensures no duplicate material title exists.
     *
     * Notes:
     * - Validation is performed using Zod.
     * - Converts string IDs to MongoDB ObjectIds.
     * - Throws ApiError if material or category not found.
     */
    public HandleUpdateMaterial = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_UPDATE_MATERIAL.parse(req.body);

        /** Note: Update material payload. */
        const UpdateMaterialPayload = result;
        await this.materialServices.UpdateMaterial(UpdateMaterialPayload);
        return res.status(STATUS_CODES.ACCEPTED).json(
            new ApiResponse([],SUCCESS_MESSAGES.MATERIAL.UPDATED,true,STATUS_CODES.ACCEPTED)
        )
    };
    
    /**
     * Note: Handle Delete Material
     *
     * Purpose:
     * This controller handles deletion of a material document.
     * Validates request data and delegates deletion to MaterialService.
     *
     * @param {Request} req - Express request object containing material ID.
     * @param {Response} res - Express response object.
     * 
     * @returns {Promise<Response>} API response indicating success of material deletion.
     *
     * Use cases:
     * - Admin permanently deletes a material.
     *
     * Notes:
     * - Validation is performed using Zod.
     * - Converts string IDs to MongoDB ObjectIds.
     * - Throws ApiError if material not found.
     */
    public HandleDeleteMaterial = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_DELETE_MATERIAL.parse(req.body);

        /** Note: Delete material payload. */
        const DeleteMaterialPayload = result;
        await this.materialServices.DeleteMaterial(DeleteMaterialPayload);
        return res.status(STATUS_CODES.ACCEPTED).json(
            new ApiResponse([],SUCCESS_MESSAGES.MATERIAL.DELETED,true,STATUS_CODES.ACCEPTED)
        )
    };
    
    /**
     * Note: Handle Get Materials By Category
     *
     * Purpose:
     * This controller fetches all materials linked to a specific category.
     * Validates request payload and delegates retrieval to MaterialService.
     *
     * @param {Request} req - Express request object containing categoryId.
     * @param {Response} res - Express response object.
     * 
     * @returns {Promise<Response>} API response containing array of materials for the category.
     *
     * Use cases:
     * - Display all materials under a category in admin panel or client app.
     *
     * Notes:
     * - Validation is performed using Zod.
     * - Converts string IDs to MongoDB ObjectIds.
     */
    public HandleGetMaterialByCategory = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_GET_MATERIAL_BY_CATEGORY.parse(req.params);

        /** Note: Get material payload. */
        const getMaterialsPayload = result;
        const materialDocuments = await this.materialServices.GetMaterialByCategory(getMaterialsPayload);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(materialDocuments,SUCCESS_MESSAGES.MATERIAL.FETHED,true,STATUS_CODES.OK)
        )
    };

    /**
     * Note: Handle Get Materials
     *
     * Purpose:
     * This controller fetches all materials with pagination.
     * Validates request payload and delegates retrieval to MaterialService.
     *
     * @param {Request} req - Express request object containing pagination info.
     * @param {Response} res - Express response object.
     * 
     * @returns {Promise<Response>} API response containing paginated array of materials.
     *
     * Use cases:
     * - Display all materials for listing in admin panel or client app.
     *
     * Notes:
     * - Validation is performed using Zod.
     */
    public HandleGetMaterials = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_GET_MATERIALS.parse(req.body);

        /** Note: Get material payload. */
        const getMaterialsPayload = result;
        const materialDocuments = await this.materialServices.GetMaterials(getMaterialsPayload);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(materialDocuments,SUCCESS_MESSAGES.MATERIAL.FETHED,true,STATUS_CODES.OK)
        )
    };
}

export default MaterialControllers;