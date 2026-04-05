import ProductModel from "../models/product.model.js";
import CategoryModel from "../models/category.model.js";
/** Note: UserModel Services */
import ApiError from "../utils/ApiError.js";
/** Response Constants */
import {ERROR_CODES, ERROR_MESSAGES, STATUS_CODES} from "../constants/responseConstants.js";
import type { CreateProductInterface, FeaturedProductsInterface, GetSingleProductInterface, ProductDocument, SearchProductInterface, UpdateProductInterface } from "../interfaces/product.interfaces.js";
import mongoose from "mongoose";
class ProductServices {
        
    /**
     * Note: Get Product Suggestions Service
     *
     * Purpose:
     * This service is responsible for fetching product suggestions based on
     * a search query. It performs a case-insensitive search on product titles
     * and returns a limited list of matching products.
     *
     * @param {Object} suggestionPayload - Payload containing search query.
     * @param {string} suggestionPayload.q - Search query string to match product titles.
     *
     * @returns {Promise<{ title: string }[]>} Array of product objects containing only the title.
     *
     * Notes:
     * - Performs a regex search for partial and case-insensitive matching
     * - Limits the number of returned suggestions to 10 for performance
     * - Returns an empty array if the query is empty or invalid
    */
    public async GetSuggestions(suggestionPayload:any):Promise<ProductDocument[]> {
        const {q} = suggestionPayload;
        const suggestedProducts = await ProductModel.find({ title: { $regex: q, $options: "i" }}).select("title").limit(10);
        return suggestedProducts;
    };
    
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
    public async CreateProduct(productDetails:CreateProductInterface):Promise<ProductDocument> {
        const {brand,categoryId,colors,condition,coverImage,description,materials,owner,price,sizes,title,status,images,parcelSize} = productDetails;
        /** Note: Check Selected category is exist. */
        const category = await CategoryModel.findById(new mongoose.Types.ObjectId(categoryId));
        if(!category){
            throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_CODES.CATEGORY.NOT_FOUND,[{field:"categoryId",message:ERROR_MESSAGES.CATEGORY.NOT_FOUND}]);
        }
        /** Note: Create Product Document */
        const ProductDocument = await ProductModel.create({
            categoryId:new mongoose.Types.ObjectId(categoryId),
            owner:new mongoose.Types.ObjectId(owner),
            sizes:sizes.map( (s) => new mongoose.Types.ObjectId(s)),
            title:title,
            description:description,
            brand:new mongoose.Types.ObjectId(brand),
            colors:colors,
            parcelSize:parcelSize,
            images:images,
            condition:condition,
            coverImage:coverImage,
            materials:materials.map(id => new mongoose.Types.ObjectId(id)),
            price:price,
            status:status
        });
        return ProductDocument;
    };

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
    public async SearchProduct(searchDetails:SearchProductInterface):Promise<ProductDocument[]> {
        const {conditions,materials,page,categoryId,price,q,limit,brands,sizes,userId,sort,colors} = searchDetails;
        let searchProductQuery:any = {};
        /** Note: Pagination */
        const pageNumber = page;
        let productSort:Record<any, 1 | -1> = {createdAt:-1};
        const limitNumber = limit;
        /** Note: Skip SearchProducts */
        const skipNumber = (pageNumber - 1) * limitNumber;
        
        if(price){
            /** Sort min price */
            searchProductQuery.price = {};
            if(price.min) searchProductQuery.price.$gte = Number(price.min);
            
            /** Sort min price */
            if(price.max) searchProductQuery.price.$lte = Number(price.max);
        }
        if(Array.isArray(colors) && colors.length > 0) searchProductQuery.colors = { $in : colors};
        let isLikedField:any;   
        if (userId) {
            isLikedField = {
                $in: [new mongoose.Types.ObjectId(userId), "$likes.owner"]
            };
        }
        if(categoryId) {
            const ids = await this.getAllSubCategoryId(categoryId);
            searchProductQuery.categoryId = { $in : ids.map( (id) => new mongoose.Types.ObjectId(id))};
        };
        if(conditions && conditions.length > 0) searchProductQuery.condition = { $in : conditions};
        if(sizes && sizes.length > 0) searchProductQuery.sizes = { $in : sizes.map(id => new mongoose.Types.ObjectId(id))};
        if(materials && materials.length > 0) searchProductQuery.materials = { $in : materials.map(id => new mongoose.Types.ObjectId(id))};
        if(brands && brands.length > 0) searchProductQuery.brand = { $in : brands.map(id => new mongoose.Types.ObjectId(id))};
        if(q) searchProductQuery.title = {$regex:q,$options: "i"};
        if(sort){
            if(sort === "PRICE_LOW_TO_HIGH") productSort = {price:1};
            if(sort === "PRICE_HIGH_TO_LOW") productSort = {price:-1};
            if(sort === "NEWEST_FIRST") productSort = {createdAt:-1};
            if(sort === "RELEVANCE") productSort = {createdAt:1};
        }
        const searchProducts = await ProductModel.aggregate([
            {
                $match : searchProductQuery
            },
            {
                $lookup : {
                    from:"wishlists",
                    localField:"_id",            
                    foreignField: "productId",
                    as: "likes"
                }
            },            
            {
                $lookup : {
                    from: "brands",
                    localField:"brand",
                    foreignField:"_id",
                    as:"brand"
                }
            },
            {
                $addFields : {
                    isLiked: isLikedField,
                    totalLikes: {
                        $size : "$likes"
                    },
                    brand:{
                        $first:"$brand"
                    }
                }
            },

            {
                $sort: productSort
            },
            {
                $skip: skipNumber
            },
            {
                $limit: limitNumber
            },
            {
                $project : {
                    _id:1,
                    title:1,
                    brand:"$brand.brand",
                    coverImage:1,
                    totalLikes:1,
                    isLiked:1,
                    price:1,
                    parcelSize:1,
                    condition:1
                }
            }
        ]);
        return searchProducts;
    }

    public async getAllSubCategoryId(categoryId:string):Promise<string[]> {
        let result:any = [];

        const subCategories = await CategoryModel.find({ parent: new mongoose.Types.ObjectId(categoryId) }).select("_id");

        if(subCategories.length > 0 ) {
            
            for (const sub of subCategories) {
                result.push(sub._id.toString());

                const children = await this.getAllSubCategoryId(sub._id.toString());
                result = result.concat(children);
            }
        }else {
            result.push(categoryId);
        }

        return result;
    };

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
    public async GetProductById(productId:string):Promise<ProductDocument> {
        const product = await ProductModel.findById(new mongoose.Types.ObjectId(productId));
        if(!product) throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.PRODUCT.NOT_FOUND);
        return product;
    };

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
    public async UpdateProduct(updateProduct:UpdateProductInterface):Promise<ProductDocument> {
        const {brand,categoryId,colors,condition,coverImage,description,materials,parcelSize,price,productId,sizes,status,title} = updateProduct;
        const product = await this.GetProductById(productId);
        /** Note: Assign the product updateProductObject value to Product document. */
        product.categoryId = new mongoose.Types.ObjectId(categoryId);
        product.title = title;
        product.coverImage = coverImage;
        product.colors = colors;
        product.materials = materials.map(id => new mongoose.Types.ObjectId(id));
        product.parcelSize = parcelSize;
        product.description = description;
        product.condition = condition;
        product.sizes = sizes.map(id => new mongoose.Types.ObjectId(id));
        product.brand = new mongoose.Types.ObjectId(brand);
        product.status = status;
        product.price = price;
        await product.save();

        return product;
    };

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
    public async GetFeaturedProducts(object:FeaturedProductsInterface):Promise<ProductDocument[]> {
        const {limit,page,sizes,sort,categoryId,price,userId} = object;
        
        /** Note: FeaturedProduct query. */
        const featuredProductsQuery:any = {};
        let productSort:Record<any, 1 | -1> = {createdAt:-1};
        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        /** Note: Skip products for infinint pagination. */
        const skipNumber = ( pageNumber - 1 ) * limitNumber;
        if(price){
            /** Sort min price */
            if(price.min) featuredProductsQuery.price.$gte = Number(price.min);
            /** Sort min price */
            if(price.max) featuredProductsQuery.price.$lte = Number(price.max);
        }
        if(sort){
            if(sort === "PRICE_LOW_TO_HIGH") productSort = {price:1};
            if(sort === "PRICE_HIGH_TO_LOW") productSort = {price:-1};
        }
        if(categoryId) featuredProductsQuery.categoryId = new mongoose.Types.ObjectId(categoryId);
        if(sizes) featuredProductsQuery.sizes = { $in : sizes.map( (id) => new mongoose.Types.ObjectId(id)) };
        const products = await ProductModel.aggregate([
            {
                $match: featuredProductsQuery
            },
            {
                $lookup : {
                    from:"wishlists",
                    localField:"_id",            
                    foreignField: "productId",
                    as: "likes"
                }
            },
            {
                $lookup : {
                    from:"brands",
                    localField:"brand",
                    foreignField:"_id",
                    as:"brand"
                }
            },
            {
                $addFields : {
                    isLiked: {
                        $in: [new mongoose.Types.ObjectId(userId),"$likes.owner"]
                    },
                    brand: {
                        $first: "$brand"
                    },
                    totalLikes: {
                        $size : "$likes"
                    }
                }
            },
            {
                $sort: productSort
            },
            {
                $skip:skipNumber
            },
            {
                $limit:limitNumber
            },
            {
                $project : {
                    _id:1,  
                    coverImage:1,
                    totalLikes:1,
                    brand: "$brand.brand",
                    title:1,
                    isLiked:1,
                    price:1,    
                    parcelSize:1,
                    condition:1
                }
            }
        ]);

        return products;
    };

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
    public async GetSingleProductById(singleDataObject:GetSingleProductInterface):Promise<ProductDocument> {
        const {productId,userId} = singleDataObject;
        const product = await ProductModel.aggregate([
            {
                $match : {
                    $expr : {
                        $eq : ["$_id",new mongoose.Types.ObjectId(productId)]
                    }
                }
            },
            {
                $lookup : {
                    from:"products",
                    let:{owner:"$owner",productId:"$_id"},
                    pipeline:[
                        {
                            $match : {
                                $expr : {
                                    $and : [    
                                        {$eq : ["$owner","$$owner"]},
                                        {$ne : ["$_id","$$productId"]}
                                    ]
                                }
                            }
                        },
                        {
                            $limit : 8
                        },
                        {
                            $lookup : {
                                from:"brands",
                                localField:"brand",
                                foreignField:"_id",
                                as:"brand"
                            }
                        },
                        {
                            $unwind : "$brand"
                        },
                        {
                            $lookup : {
                                from:"wishlists",
                                localField:"_id",
                                foreignField:"productId",
                                as:"likes"
                            }
                        }
                    ],
                    as:"ownerProducts"
                }
            },
            {
                $lookup: {
                  from: "categories",
                  localField: "categoryId",
                  foreignField: "_id",
                  as: "category",
                },
            },
            {
                $graphLookup: {
                  from: "categories",
                  startWith: "$category.parent",
                  connectFromField: "parent",
                  connectToField: "_id",
                  as: "parents",
                }
            },
            {
                $lookup : {
                    from:"products",
                    let:{categoryId:"$categoryId",productId:"$_id"},
                    pipeline:[
                        {
                            $match : {
                                $expr : {
                                    $and : [
                                        { $eq : ["$categoryId","$$categoryId"] },
                                        { $ne : ["$_id","$$productId"] }
                                    ]
                                }
                            }
                        },
                        {
                            $limit : 20
                        },
                        {
                            $lookup : {
                                from:"brands",
                                localField:"brand",
                                foreignField:"_id",
                                as:"brand"
                            }
                        },
                        {
                            $unwind : "$brand"
                        },
                        {
                            $lookup : {
                                from:"wishlists",
                                localField:"_id",
                                foreignField:"productId",
                                as:"likes"
                            }
                        }
                    ],
                    as:"similarProducts"
                }
            },
            {
                $lookup : {
                    from:"addresses",
                    localField:"owner",
                    foreignField:"userId",
                    as:"address"
                }
            },
            {
                $lookup : {
                    from:"follows",
                    let:{userId:new mongoose.Types.ObjectId(userId as string),owner:"$owner"},
                    pipeline:[
                        {
                            $match : {
                                $expr : {
                                    $and : [
                                        {$eq : ["$followerId","$$userId"]},
                                        {$eq : ["$followingId","$$owner"]}
                                    ]
                                }
                            }
                        }
                    ],
                    as:"isFollowed"
                }
            },
            {
                $lookup : {
                    from:"users",
                    localField:"owner",
                    foreignField:"_id",
                    as:"owner"
                }
            },
            {
                $lookup : {
                    from: "sizes",
                    let:{sizeIds:"$sizes"},
                    pipeline: [
                        {
                            $match: {
                                $expr : {
                                    $in: ["$_id","$$sizeIds"]
                                }
                            }
                        }
                    ],
                    as:"sizes",
                }
            },
            {
                $lookup : {
                    from:"wishlists",
                    localField:"_id",            
                    foreignField: "productId",
                    as: "likes"
                }
            },
            {
                $lookup : {
                    from:"brands",
                    localField:"brand",
                    foreignField:"_id",
                    as:"brand"
                }
            },
            {
                $addFields : {
                    isLiked: {
                        $in: [new mongoose.Types.ObjectId(userId as string),"$likes.owner"]
                    },
                    totalLikes: {
                        $size : "$likes"
                    },
                    owner: {
                        $first : "$owner"
                    },
                    size: {
                        $first : "$size"
                    },
                    brand: {
                        $first : "$brand"
                    },
                    isFollowed: {
                        $gt: [{ $size: "$isFollowed" }, 0]
                    },
                    address:{
                        $first : "$address"
                    },
                    categoryTree:{
                        $map:{
                            input:{
                                $concatArrays:["$parents","$category"]
                            },
                            as:"ctree",
                            in:{
                                _id:"$$ctree._id",
                                title:"$$ctree.title",
                            }
                        }
                    },
                    similarProducts:{
                        $map : {
                            input:"$similarProducts",
                            as:"s",
                            in:{
                                _id:"$$s._id",
                                coverImage:"$$s.coverImage",
                                title:"$$s.title",
                                brand:"$$s.brand.brand",
                                condition:"$$s.condition",
                                parcelSize:"$$s.parcelSize",
                                price:"$$s.price",
                                totalLikes:{$size:"$$s.likes"},
                                isLiked:{$in:[new mongoose.Types.ObjectId(userId as string),"$$s.likes.owner"]}
                            }
                        }
                    },
                    ownerProducts:{
                        $map : {
                            input:"$ownerProducts",
                            as:"o",
                            in:{
                                _id:"$$o._id",
                                coverImage:"$$o.coverImage",
                                title:"$$o.title",
                                brand:"$$o.brand.brand",
                                condition:"$$o.condition",
                                parcelSize:"$$o.parcelSize",
                                price:"$$o.price",
                                totalLikes:{$size:"$$o.likes"},
                                isLiked:{$in:[new mongoose.Types.ObjectId(userId as string),"$$o.likes.owner"]}
                            }
                        }
                    }
                }
            },
            {
                $project : {
                    _id:1,
                    title:1,
                    description:1,
                    coverImage:1,
                    sizes:1,
                    brand:"$brand.brand",
                    condition:1,
                    material:1,
                    colors:1,
                    price:1,
                    images:1,
                    parcelSize:1,
                    status:1,
                    "owner._id":1,
                    "owner.avatar":1,
                    "owner.fullname":1,
                    "owner.lastSeen":1,
                    "owner.username":1,
                    "address.city":1,
                    "address.country":1,
                    similarProducts:1,
                    ownerProducts:1,
                    categoryTree:1,
                    createdAt:1,
                    isLiked:1,
                    totalLikes:1,
                    isFollowed:1,
                }
            }
        ]);
        return product[0];
    };
}

export default ProductServices;