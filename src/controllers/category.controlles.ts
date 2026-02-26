import CategoryModel from "../models/category.model.js";

/** Response Constants */
import { ERROR_MESSAGES,STATUS_CODES, SUCCESS_MESSAGES } from "../constants/responseConstants.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/** Zod Validaters */
import { VALIDATE_CREATE_CATEGORY,VALIDATE_DELETE_CATEGORY,VALIDATE_UPDATE_CATEGORY } from "../validaters/category.validater.js";
import type { Request,Response } from "express";

/** Services */
import type CategoryServices from "../services/category.services.js";
import type { UserDocument } from "../interfaces/user.interfaces.js";

class CategoryControllers {
    private categoryServices: CategoryServices;

    constructor(categoryServices:CategoryServices){
        this.categoryServices = categoryServices;
    }

    /**
     * Note: Handle Create Category
     *
     * Purpose:
     * This controller handles the creation of a new category. It validates
     * the request payload using Zod, adds the logged-in user as the owner,
     * and persists the new category via the category service.
     *
     * @param {Request} req - Express request object containing category data.
     * @param {Response} res - Express response object used to return the result.
     *
     * @returns {Promise<Response>} API response confirming category creation.
     *
     * Notes:
     * - Uses `VALIDATE_CREATE_CATEGORY` Zod schema for validation
     * - Throws `ApiError` with BAD_REQUEST if validation fails
     * - Owner is automatically assigned from `req.user`
     */
    public HandleCreateCategory = async (req:Request,res:Response) => {
        const result = VALIDATE_CREATE_CATEGORY.safeParse(req.body);
        if(!result.success){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG)
        }
        /** Note: Create Category payload. */
        const createCategoryPayload = {
            ...result.data,
            owner:(req.user as UserDocument)._id.toString()
        };
        await this.categoryServices.CreateCategory(createCategoryPayload);
        return res.status(STATUS_CODES.ACCEPTED).json(
            new ApiResponse([],SUCCESS_MESSAGES.CATEGORY.CREATED,true,STATUS_CODES.ACCEPTED)
        )
    };

    /**
     * Note: Handle Update Category
     *
     * Purpose:
     * This controller handles updating an existing category document.
     * It validates the request body and passes it to the category service.
     *
     * @param {Request} req - Express request object containing updated category data.
     * @param {Response} res - Express response object used to return the result.
     *
     * @returns {Promise<Response>} API response confirming category update.
     *
     * Notes:
     * - Uses `VALIDATE_UPDATE_CATEGORY` Zod schema for validation
     * - Throws `ApiError` with BAD_REQUEST if validation fails
     * - Calls `categoryServices.UpdateCategory` to perform the update
     */
    public HandleUpdateCategory = async (req:Request,res:Response) => {
        const result = VALIDATE_UPDATE_CATEGORY.safeParse(req.body);
        if(!result.success){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG)
        }        
        /** Note: Update Category payload. */
        const updateCategoryPayload = result.data;
        await this.categoryServices.UpdateCategory(updateCategoryPayload);
        return res.status(STATUS_CODES.ACCEPTED).json(
            new ApiResponse([],SUCCESS_MESSAGES.CATEGORY.UPDATED,true,STATUS_CODES.ACCEPTED)
        )
    };
    
    /**
     * Note: Handle Delete Category
     *
     * Purpose:
     * This controller handles deletion of a category by its ID.
     * It validates the request body and calls the service to remove the category.
     *
     * @param {Request} req - Express request object containing `categoryId`.
     * @param {Response} res - Express response object used to return the result.
     *
     * @returns {Promise<Response>} API response confirming category deletion.
     *
     * Notes:
     * - Uses `VALIDATE_DELETE_CATEGORY` Zod schema for validation
     * - Throws `ApiError` with BAD_REQUEST if validation fails
     * - Calls `categoryServices.DeleteCategory` to delete the category
     */
    public HandleDeleteCategory = async (req:Request,res:Response) => {
        const result = VALIDATE_DELETE_CATEGORY.safeParse(req.body);
        if(!result.success){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG)
        }
        /** Note: Delete Category payload. */
        const deleteCategoryPayload = result.data.categoryId;
        await this.categoryServices.DeleteCategory(deleteCategoryPayload);
        return res.status(STATUS_CODES.ACCEPTED).json(
            new ApiResponse([],SUCCESS_MESSAGES.CATEGORY.DELETED,true,STATUS_CODES.ACCEPTED)
        )
    };
    
    /**
     * Note: Handle Get Categories
     *
     * Purpose:
     * Retrieves all category documents from the database.
     *
     * @param {Request} req - Express request object (no body needed).
     * @param {Response} res - Express response object used to return the result.
     *
     * @returns {Promise<Response>} API response containing all categories.
     *
     * Notes:
     * - Calls `categoryServices.GetAllCategories` to fetch category documents
     * - Returns categories wrapped in a standardized `ApiResponse`
     */
    public HandleGetCategories = async (req:Request,res:Response) => {
        const categoryDocuments = await this.categoryServices.GetAllCategories();
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(categoryDocuments,SUCCESS_MESSAGES.CATEGORY.FETCH,true,STATUS_CODES.OK)
        )
    };
}

export default CategoryControllers