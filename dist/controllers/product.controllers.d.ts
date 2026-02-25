/** Note: imports types */
import type { Request, Response } from "express";
declare class ProductControllers {
    private productServices;
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
    HandleCreateProduct: (req: Request, res: Response) => Promise<Response>;
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
    HandleSearchProduct: (req: Request, res: Response) => Promise<Response>;
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
    HandleUpdateProduct: (req: Request, res: Response) => Promise<Response>;
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
    HandleGetFeaturedProducts: (req: Request, res: Response) => Promise<Response>;
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
    HandleGetSingleProductById: (req: Request, res: Response) => Promise<Response>;
}
export default ProductControllers;
//# sourceMappingURL=product.controllers.d.ts.map