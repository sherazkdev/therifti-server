/** Response Constants */
import {ERROR_MESSAGES, STATUS_CODES, SUCCESS_MESSAGES} from "../constants/responseConstants.js";
import ApiError from "../utils/ApiError.js";

/** Note: imports types */
import type {Request,Response} from "express";
import {VALIDATE_CREATE_PRODUCT,VALIDATE_GET_FEATURED_PRODUCTS,VALIDATE_GET_SINGLE_PRODUCT,VALIDATE_GET_SUGESSTIONS,VALIDATE_SEARCH_PRODUCT,VALIDATE_UPDATE_PRODUCT} from "../validaters/product.validater.js";

/** Services*/
import type ProductServices from "../services/product.services.js";
import ApiResponse from "../utils/ApiResponse.js";
import type { UserDocument } from "../interfaces/user.interfaces.js";

class ProductControllers {
    private productServices: ProductServices;

    constructor(productServices:ProductServices){
        this.productServices = productServices;
    }

    /**
     * Note: Handle Get Product Suggestions
     *
     * Purpose:
     * This controller handles fetching product suggestions based on
     * the provided request parameters. It validates the incoming params
     * using Zod, then retrieves matching suggestions from the database
     * via the product service.
     *
     * @param {Request} req - Express request object containing params used for suggestions query.
     * @param {Response} res - Express response object used to return the result.
     *
     * @returns {Promise<Response>} API response containing the list of suggested products.
     *
     * Notes:
     * - Uses `VALIDATE_GET_SUGESSTIONS` Zod schema for params validation
     * - Throws `ApiError` with BAD_REQUEST if validation fails
     * - Calls `productServices.GetSuggestions` to fetch suggestions
     * - Returns suggestions wrapped in a standardized `ApiResponse`
    */   
    public HandleGetSuggestions = async (req:Request,res:Response):Promise<Response> =>  {
        const result = VALIDATE_GET_SUGESSTIONS.parse(req.params);
        /** Note: Suggestions Payload */
        const suggestionPayload = result;
        const suggestions = await this.productServices.GetSuggestions(suggestionPayload);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(suggestions,SUCCESS_MESSAGES.PRODUCT.FETCH,true,STATUS_CODES.OK)
        )
    };

    /**
     * Note: Handle Create New Product
     *
     * Purpose:
     * This controller handles the creation of a new product document.
     * It validates the incoming request data using Zod, and then
     * persists the product information to the database via the
     * product service.
     *
     * @param {Request} req - Express request object containing the product creation payload.
     * @param {Response} res - Express response object used to return the result.
     *
     * @returns {Promise<Response>} API response containing the newly created product document.
     *
     * Notes:
     * - Uses `VALIDATE_CREATE_PRODUCT` Zod schema for request validation
     * - Throws `ApiError` with BAD_REQUEST if validation fails
     * - Calls `productServices.CreateProduct` to persist the product
     * - Returns the newly created product wrapped in a standardized `ApiResponse`
    */
    public HandleCreateProduct = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_CREATE_PRODUCT.parse(req.body);
        // Note: Create Product payload.
        const createProductPayload = {...result,owner:(req.user as UserDocument)._id.toString()};
        await this.productServices.CreateProduct(createProductPayload);
        return res.status(STATUS_CODES.CREATED).json(
            new ApiResponse([],SUCCESS_MESSAGES.PRODUCT.CREATE,true,STATUS_CODES.CREATED)
        )
    };

    /**
     * Note: Handle Search Product by Query and Filters
     *
     * Purpose:
     * This controller handles searching for products based on query,
     * category, and optional filters such as price range, materials,
     * conditions, brands, and sizes. It validates the incoming request
     * using Zod, passes the payload to the service, and returns
     * filtered product documents.
     *
     * @param {Request} req - Express request object containing search payload.
     * @param {Response} res - Express response object used to return the result.
     *
     * @returns {Promise<Response>} Filtered product documents in API response format.
     *
     * Notes:
     * - Uses `VALIDATE_SEARCH_PRODUCT` Zod schema for request validation
     * - Throws `ApiError` with BAD_REQUEST if validation fails
     * - Calls `productServices.SearchProduct` to fetch filtered products
     * - Returns results in standardized `ApiResponse` format
    */
    public HandleSearchProduct = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_SEARCH_PRODUCT.parse(req.body);

        // Note: Search product payload.
        const searchProductPayload = {...result,userId:(req.user as UserDocument)?._id.toString()};
        const searchResultDocuments = await this.productServices.SearchProduct(searchProductPayload);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(searchResultDocuments,SUCCESS_MESSAGES.PRODUCT.FETCH,true,STATUS_CODES.OK)
        )
    };
    
    /**
     * Note: Handle Update Product
     *
     * Purpose:
     * This controller handles updating an existing product document.
     * It validates the incoming request using Zod, passes the payload
     * to the product service, and returns a standardized API response.
     *
     * @param {Request} req - Express request object containing update payload.
     * @param {Response} res - Express response object used to return the result.
     *
     * @returns {Promise<Response>} API response confirming the update.
     *
     * Notes:
     * - Uses `VALIDATE_UPDATE_PRODUCT` Zod schema for request validation
     * - Throws `ApiError` with BAD_REQUEST if validation fails
     * - Calls `productServices.UpdateProduct` to update the product
     * - Returns empty array with SUCCESS message after update
    */
    public HandleUpdateProduct = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_UPDATE_PRODUCT.parse(req.body);

        // Note: Update product payload.
        const UpdateProductPayload = result;
        await this.productServices.UpdateProduct(UpdateProductPayload);
        return res.status(STATUS_CODES.ACCEPTED).json(
            new ApiResponse([],SUCCESS_MESSAGES.PRODUCT.UPDATE,true,STATUS_CODES.ACCEPTED)
        )
    };

    /**
     * Note: Handle Get Featured Products
     *
     * Purpose:
     * This controller handles retrieving featured products with optional filters.
     * It validates the request payload, fetches featured products from the service,
     * and returns them in a standardized API response.
     *
     * @param {Request} req - Express request object containing filter payload.
     * @param {Response} res - Express response object used to return the result.
     *
     * @returns {Promise<Response>} API response containing an array of featured product documents.
     *
     * Notes:
     * - Uses `VALIDATE_GET_FEATURED_PRODUCTS` Zod schema for request validation
     * - Throws `ApiError` with BAD_REQUEST if validation fails
     * - Calls `productServices.GetFeaturedProducts` to fetch products
     * - Returns products in standardized `ApiResponse` format
    */
    public HandleGetFeaturedProducts = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_GET_FEATURED_PRODUCTS.parse(req.body);

        // Note: Featured product payload.
        const featuredProductPayload = {...result,userId:(req.user as UserDocument)?._id.toString()};
        const featuredProductsDocuments = await this.productServices.GetFeaturedProducts(featuredProductPayload);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(featuredProductsDocuments,SUCCESS_MESSAGES.PRODUCT.FETCH,true,STATUS_CODES.OK)
        )
    };
    
    /**
     * Note: Handle Get Single Product By Id
     *
     * Purpose:
     * This controller handles retrieving a single product by its ID.
     * It validates the incoming request, fetches the product from the service,
     * and returns the product in a standardized API response.
     *
     * @param {Request} req - Express request object containing product ID payload.
     * @param {Response} res - Express response object used to return the result.
     *
     * @returns {Promise<Response>} API response containing the single product document.
     *
     * Notes:
     * - Uses `VALIDATE_GET_SINGLE_PRODUCT` Zod schema for request validation
     * - Throws `ApiError` with BAD_REQUEST if validation fails
     * - Calls `productServices.GetSingleProductById` to fetch the product
     * - Returns product in standardized `ApiResponse` format
    */
    public HandleGetSingleProductById = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_GET_SINGLE_PRODUCT.parse(req.query);

        // Note: Single Product payload.
        const singleProductPayload = {...result,userId:(req.user as UserDocument)?._id?.toString() || null};
        const singleProductDocument = await this.productServices.GetSingleProductById(singleProductPayload);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(singleProductDocument,SUCCESS_MESSAGES.PRODUCT.FETCH,true,STATUS_CODES.OK)
        )
    };
}

export default ProductControllers;