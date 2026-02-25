import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
/** Note: Response Constants. */
import { ERROR_MESSAGES, STATUS_CODES, SUCCESS_MESSAGES } from "../constants/responseConstants.js";
/** Services */
import BrandServices from "../services/brand.services.js";
import { VALIDATE_CREATE_BRAND_DOCUMENT, VALIDATE_GET_BRAND_BY_CATEGORY } from "../validaters/brand.validater.js";
class BrandControllers {
    brandServices = new BrandServices();
    /**
     * Note: Create Brand Document.
     * @param {Request} req - Request Object.
     * @param {Response} res - Response Object.
     *
     * @returns {Promise<Response>} Created brand document.
    */
    HandleCreateBrand = async (req, res) => {
        const result = VALIDATE_CREATE_BRAND_DOCUMENT.safeParse(req.body);
        /** Note: Check If any error in validation. */
        if (!result.success) {
            throw new ApiError(STATUS_CODES.BAD_REQUEST, result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        /** @note Create size document. */
        const createSizePayload = result.data;
        const brandDocument = await this.brandServices.CreateBrand(createSizePayload);
        return res.status(STATUS_CODES.OK).json(new ApiResponse(brandDocument, SUCCESS_MESSAGES.BRAND.CREATED, true, STATUS_CODES.OK));
    };
    /**
     * Note: Get Brand By Category.
     * @param {Request} req - Request Object.
     * @param {Response} res - Response Object.
     *
     * @returns {Promise<Response>} Matched Brands.
    */
    HandleGetBrandByCategory = async (req, res) => {
        const result = VALIDATE_GET_BRAND_BY_CATEGORY.safeParse(req.params);
        /** Note: Check If any error in validation. */
        if (!result.success) {
            throw new ApiError(STATUS_CODES.BAD_REQUEST, result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        const brands = await this.brandServices.GetBrandByCategory(result.data.categoryId);
        return res.status(STATUS_CODES.OK).json(new ApiResponse(brands, SUCCESS_MESSAGES.BRAND.FETCHED, true, STATUS_CODES.OK));
    };
}
export default BrandControllers;
//# sourceMappingURL=brand.controllers.js.map