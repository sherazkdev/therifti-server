import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/** Note: Response Constants. */
import {ERROR_MESSAGES, STATUS_CODES, SUCCESS_MESSAGES} from "../constants/responseConstants.js";

/** Note: imports types */
import type {Request,Response} from "express";

/** Services */
import SizeServices from "../services/size.services.js";
import { VALIDATE_CREATE_SIZE_DOCUMENT, VALIDATE_GET_SIZES_BY_CATEGORY, VALIDATE_UPDATE_SIZE_DOCUMENT,VALIDATE_DELETE_SIZE_DOCUMENT } from "../validaters/size.validater.js";

class SizeControllers {
    private sizeServices = new SizeServices();

    /**
     * Note: Note: Handle Create Size Document.
     * @param {Request} req - Request Object.
     * @param {Response} res - Response Object. 
     * 
     * @returns {Promise<ApiResponse>} Created Size document.
    */
    public HandleCreateSize = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_CREATE_SIZE_DOCUMENT.safeParse(req.body);
        /** Note: Check If any error in validation. */
        if(!result.success){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG)
        }
        /** @note Create size document. */
        const createSizePayload = result.data;
        const sizeDocument = await this.sizeServices.CreateSize(createSizePayload);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(sizeDocument,SUCCESS_MESSAGES.SIZE.CREATED,true,STATUS_CODES.OK)
        )
    };

    /**
     * Note: Handle Get Size By Category.
     * @param {Request} req - Request Object. 
     * @param {Response} res - Response Object. 
     * 
     * @returns {Promise<ApiResponse>} Matched Sizes.
    */
    public HandleGetSizeByCategory = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_GET_SIZES_BY_CATEGORY.safeParse(req.params);
        /** Note: Check If any error in validation. */
        if(!result.success){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG)
        }
        const sizes = await this.sizeServices.GetSizedsByCategory(result.data.categoryId);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(sizes,SUCCESS_MESSAGES.SIZE.FETCHED,true,STATUS_CODES.OK)
        )
    };

    /**
     * Note: Handle Update Size Document.
     * @param {Request} req - Request Object to get values.
     * @param {Response} res - Response Object sendeing respond.
     * 
     * @returns {Promise<ApiResponse>} Updated Size Document.
     * @throws {ApiError} If Size document does not exist.
    */
    public HandleUpdateSize = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_UPDATE_SIZE_DOCUMENT.safeParse(req.body);        
        /** Note: Check If any error in validation. */
        if(!result.success){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG)
        }
        /** Note Update size payload. */
        const updateSizePayload = result.data;
        const updatedDocument = await this.sizeServices.UpdateSize(updateSizePayload);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(updatedDocument,SUCCESS_MESSAGES.SIZE.UPDATED,true,STATUS_CODES.OK)
        )
    };

    /**
     * Note Handle Delete size Docuemnt.
     * @param {Request} req - Request Object to get values.
     * @param {Response} res - Response Object sendeing respond.
     * @throws {ApiError} If Size document does not exist.
    */
    public HandleDeleteSize = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_DELETE_SIZE_DOCUMENT.safeParse(req.params);
        if(!result.success){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG)
        }
        const deleteSizeResponse = await this.sizeServices.DeleteSize(result.data.sizeId);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(null,SUCCESS_MESSAGES.SIZE.DELETED,true,STATUS_CODES.OK)
        )
    };
}

export default SizeControllers;
