import ProductModel from "../models/product.model.js";
import CategoryModel from "../models/category.model.js";
/** Note: UserModel Services */
import ApiError from "../utils/ApiError.js";
/** Response Constants */
import {ERROR_MESSAGES, STATUS_CODES} from "../constants/responseConstants.js";
import type { CreateProductInterface, ProductDocument, SearchProductInterface } from "../interfaces/product.interfaces.js";
import mongoose from "mongoose";

class ProductServices {

    /**
     * Note: Create Product
     * @constructor
     * @param {string} title - Product name
     * @param {string} userId - Owner user ID
     * @param {string} categoryId - Category ID
     * @param {number} price - Product price
     * @param {string} brand - Brand ID
     * @param {string[]} images - Array of image URLs
     * @param {string} coverImage - Main cover image
     * @param {string} material - Product material
     * @param {string} condition - Product condition
     * @param {string} size - Product size
     * @returns {Promise<ProductDocument>} Newly created product
    */
    public async CreateProduct(productDetails:CreateProductInterface):Promise<ProductDocument> {
        const {brand,categoryId,colors,condition,coverImage,description,material,owner,price,size,title} = productDetails;
        /** Note: Check Selected category is exist. */
        const category = await CategoryModel.findById(new mongoose.Types.ObjectId(categoryId));
        if(!category){
            throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.CATEGORY.NOT_FOUND);
        }
        /** Note: Create Product Document */
        const ProductDocument = await ProductModel.create({
            categoryId:new mongoose.Types.ObjectId(category),
            owner:new mongoose.Types.ObjectId(owner),
            title:title,
            description:description,
            brand:new mongoose.Types.ObjectId(brand),
            colors:colors,
            condition:condition,
            coverImage:coverImage,
            material
        })
    };

    /**
     * Note: Search Product in these fields title,brand,description
     * @constructor
     * @param {string} query - Title query
     * @param {number} page - Pagination number
     * @param {string} size - Size product
     * @param {string} brand
     * @param {string} condition
     * @param {string[]} colors
     * @param {number} price
     * @param {string[]} meterial
     * @param {string} sort
     * @param {string} categoryId
     * @returns {Promise<[]>} - Searched product
    */
    public async SearchProduct(searchDetails:SearchProductInterface):Promise<ProductDocument[]> {

    }

    /**
     * Note: Get Product By Id
     * @constructor
     * @param {string} - ProductId
     * @throws {ApiError} - If throw error product does not exist
     * @returns {Promise<ProductDocument>} - Product 
    */
    public async GetProductById(productId:string):Promise<ProductDocument> {};

    /**
     * Note: Update Product by productId
     * @constructor
     * @param {string} productId - Product identification id
     * @param {string} title - Product title
     * @param {string} description - Product description
     * @param {string} categoryId - Product category id
     * @param {string} brand - Product brand
     * @param {string} size - Product size
     * @param {string} condition - Product condition
     * @param {string[]} colors - Product Colors
     * @param {string} meterial - Product merterial
     * @returns {Promise<ProductDocument>} Updated product newaly ducument
    */
    public async UpdateProduct(updateProduct:any):Promise<ProductDocument> {};

    /**
     * Note: Get Featured products
     * @constructer
     * @param {string} categoryId - Sort by category
     * @param {number} price - Sory by price
     * @param {string} sortType - Sorting methods
     * @returns {Promise<ProductDocument[]>}
     * List of latest products.
    */
    public async GetFeaturedProducts():Promise<ProductDocument[]> {};

    /**
     * 
    */
}

export default ProductServices;