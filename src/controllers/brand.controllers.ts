import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/** Note: Response Constants. */
import {ERROR_MESSAGES, STATUS_CODES, SUCCESS_MESSAGES} from "../constants/responseConstants.js";

/** Note: imports types */
import type {Request,Response} from "express";

/** Services */
import type BrandServices from "../services/brand.services.js";
import { VALIDATE_CREATE_BRAND_DOCUMENT, VALIDATE_GET_BRAND_BY_CATEGORY } from "../validaters/brand.validater.js";

class BrandControllers {
    private brandServices: BrandServices;

    constructor(brandServices:BrandServices){
        this.brandServices = brandServices;
    }
    
    /**
     * Note: Create Brand Document.
     * @param {Request} req - Request Object. 
     * @param {Response} res - Response Object. 
     * 
     * @returns {Promise<Response>} Created brand document.
    */
    public HandleCreateBrand = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_CREATE_BRAND_DOCUMENT.parse(req.body);
        /** Note: Check If any error in validation. */
        /** @note Create size document. */
        const createSizePayload = result;
        const brandDocument = await this.brandServices.CreateBrand(createSizePayload);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(brandDocument,SUCCESS_MESSAGES.BRAND.CREATED,true,STATUS_CODES.OK)
        )
    };

    /**
     * Note: Get Brand By Category.
     * @param {Request} req - Request Object. 
     * @param {Response} res - Response Object. 
     * 
     * @returns {Promise<Response>} Matched Brands.
    */
    public HandleGetBrandByCategory = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_GET_BRAND_BY_CATEGORY.parse(req.params);
        /** Note: Check If any error in validation. */

        const brands = await this.brandServices.GetBrandByCategory(result.categoryId);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(brands,SUCCESS_MESSAGES.BRAND.FETCHED,true,STATUS_CODES.OK)
        )
    };
}

export default BrandControllers;