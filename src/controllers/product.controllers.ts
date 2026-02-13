/** Response Constants */
import {ERROR_MESSAGES, STATUS_CODES} from "../constants/responseConstants.js";
import ApiError from "../utils/ApiError.js";

/** Note: imports types */
import type {Request,Response} from "express";
/** Note: Product Services */
import ProductServices from "../services/product.services.js";

class ProductControllers {
    private productServices = new ProductServices();


    /**
     * Note: Handle Create new product document.
     * @param {Request} req - Request parameter object.
     * @param {Response} req - Response parameter object.
     * 
     * @returns {Promise<ProductDocument>} Newly product document.
    */
    public HandleCreateProduct = async (req:Request,res:Response):Promise<Response> => {
        
    };

    /**
     * Note: Handle Search product by query and category with filter methods.
     * @param {Request} req - Request parameter object.
     * @param {Response} req - Response parameter object.
     * 
     * @returns {Promise<ProductDocument[]>} Filterd product documents.
    */
    public HandleSearchProduct = async (req:Request,res:Response):Promise<Response> => {};
    
    /**
     * Note: Handle Update Product.
     * @param {Request} req - Request parameter object.
     * @param {Response} req - Response parameter object.
     * 
     * @returns {Promise<ProductDocument>} Updated product document.
    */
    public HandleUpdateProduct = async (req:Request,res:Response):Promise<Response> => {};

    /**
     * Note: Handle Get Featured products with filter methods.
     * @param {Request} req - Request parameter object.
     * @param {Response} req - Response parameter object.
     * 
     * @returns {Promise<ProductDocument[]>} Featured products document.
    */
    public HandleGetFeaturedProducts = async (req:Request,res:Response):Promise<Response> => {};
    
    /**
     * Note: Handle Get Single product by Id.
     * @param {Request} req - Request parameter object.
     * @param {Response} req - Response parameter object.
     * 
     * @returns {Promise<ProductDocument>} Single products document.
    */
    public HandleGetSingleProductById = async (req:Request,res:Response):Promise<Response> => {};
}

export default ProductControllers;