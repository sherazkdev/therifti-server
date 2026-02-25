import type { CreateProductInterface, FeaturedProductsInterface, GetSingleProductInterface, ProductDocument, SearchProductInterface, UpdateProductInterface } from "../interfaces/product.interfaces.js";
declare class ProductServices {
    /**
     * Note: Create Product Service
     *
     * Purpose:
     * This service is responsible for creating a new product document.
     * It validates related entities (such as category existence) and
     * persists the product data to the database.
     *
     * @param {CreateProductInterface} productDetails - Product creation payload.
     * @param {string} productDetails.title - Product title or name.
     * @param {string} productDetails.owner - Owner user ID.
     * @param {string} productDetails.categoryId - Category ID.
     * @param {string} productDetails.brand - Brand ID.
     * @param {string[]} productDetails.colors - Available product colors.
     * @param {string} productDetails.condition - Product condition.
     * @param {string} productDetails.coverImage - Main cover image URL.
     * @param {string} productDetails.description - Product description.
     * @param {string} productDetails.material - Product material.
     * @param {string} productDetails.size - Product size ID.
     * @param {number} productDetails.price - Product price.
     * @param {string} productDetails.status - Product status.
     *
     * @returns {Promise<ProductDocument>} Newly created product document.
     *
     * Notes:
     * - Validates that the selected category exists before creation
     * - Automatically converts string IDs to MongoDB ObjectIds
     * - Business logic is handled at the service layer
    */
    CreateProduct(productDetails: CreateProductInterface): Promise<ProductDocument>;
    /**
     * Note: Search Product in these fields: title, brand, description
     *
     * Purpose:
     * This service handles searching products using query, category,
     * and optional filters including price, materials, conditions,
     * brands, sizes, and userId for like status.
     *
     * @param {SearchProductInterface} searchDetails - Object containing search filters and pagination.
     *
     * @returns {Promise<ProductDocument[]>} Filtered and paginated product documents.
     *
     * Notes:
     * - Supports pagination via page and limit
     * - Filters products using categoryId, conditions, sizes, materials, brands, and price range
     * - Performs regex search on title (`q`)
     * - Adds `isLiked` and `totalLikes` fields using aggregation and lookup on wishlists
     * - Returns only selected fields in the final projection
    */
    SearchProduct(searchDetails: SearchProductInterface): Promise<ProductDocument[]>;
    /**
     * Note: Get Product By Id
     *
     * Purpose:
     * Fetch a single product document by its unique identifier.
     *
     * @param {string} productId - Unique identifier of the product.
     *
     * @throws {ApiError} Throws NOT_FOUND if product does not exist
     *
     * @returns {Promise<ProductDocument>} Product document.
     */
    GetProductById(productId: string): Promise<ProductDocument>;
    /**
     * Note: Update Product by productId
     *
     * Purpose:
     * Updates an existing product document with new values provided
     * in the payload.
     *
     * @param {UpdateProductInterface} updateProduct - Object containing productId and updated fields.
     *
     * @returns {Promise<ProductDocument>} Updated product document.
     *
     * Notes:
     * - Fetches the existing product using GetProductById
     * - Assigns new values to product fields and saves the document
     */
    UpdateProduct(updateProduct: UpdateProductInterface): Promise<ProductDocument>;
    /**
     * Note: Get Featured Products
     *
     * Purpose:
     * Retrieves featured products with optional category, price filters,
     * and sorting. Supports pagination and adds like status for the user.
     *
     * @param {FeaturedProductsInterface} object - Object containing filters, pagination, and userId.
     *
     * @returns {Promise<ProductDocument[]>} Array of featured product documents.
     *
     * Notes:
     * - Performs aggregation with `$lookup` to include likes
     * - Adds `isLiked` and `totalLikes` fields
     * - Supports sorting by price or creation date
     * - Supports infinite scroll via skip & limit
     */
    GetFeaturedProducts(object: FeaturedProductsInterface): Promise<ProductDocument[]>;
    /**
     * Note: Get Single Product By Id
     *
     * Purpose:
     * Retrieves a single product document with its owner info, similar
     * products, category hierarchy, likes, and follow status.
     *
     * @param {GetSingleProductInterface} singleDataObject - Object containing `productId` and `userId`.
     *
     * @throws {ApiError} Throws error if product does not exist
     *
     * @returns {Promise<ProductDocument>} Full product document with relational data.
     *
     * Notes:
     * - Uses aggregation to fetch owner info, similar products, category hierarchy, size, brand, address, likes, and follow status
     * - Adds `isLiked`, `totalLikes`, and `isFollowed` flags for user
     * - Returns a single product object
     */
    GetSingleProductById(singleDataObject: GetSingleProductInterface): Promise<ProductDocument>;
}
export default ProductServices;
//# sourceMappingURL=product.services.d.ts.map