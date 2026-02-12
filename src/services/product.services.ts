import ProductModel from "../models/product.model.js";
import CategoryModel from "../models/category.model.js";
/** Note: UserModel Services */
import ApiError from "../utils/ApiError.js";
/** Response Constants */
import {ERROR_MESSAGES, STATUS_CODES} from "../constants/responseConstants.js";
import type { CreateProductInterface, FeaturedProductsInterface, GetSingleProductInterface, ProductDocument, SearchProductInterface, UpdateProductInterface } from "../interfaces/product.interfaces.js";
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
     * @param {string} status - Product status
     * @returns {Promise<ProductDocument>} Newly created product
    */
    public async CreateProduct(productDetails:CreateProductInterface):Promise<ProductDocument> {
        const {brand,categoryId,colors,condition,coverImage,description,material,owner,price,size,title,status} = productDetails;
        /** Note: Check Selected category is exist. */
        const category = await CategoryModel.findById(new mongoose.Types.ObjectId(categoryId));
        if(!category){
            throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.CATEGORY.NOT_FOUND);
        }
        /** Note: Create Product Document */
        const ProductDocument = await ProductModel.create({
            categoryId:new mongoose.Types.ObjectId(categoryId),
            owner:new mongoose.Types.ObjectId(owner),
            size:new mongoose.Types.ObjectId(size),
            title:title,
            description:description,
            brand:new mongoose.Types.ObjectId(brand),
            colors:colors,
            condition:condition,
            coverImage:coverImage,
            material:material,
            price:price,
            status:status
        });
        return ProductDocument;
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
        const {conditions,meterials,page,categoryId,price,q,limit,brands,sizes,userId} = searchDetails;
        let searchProductQuery:any = {
            
        };
        /** Note: Pagination */
        const pageNumber = page;
        const limitNumber = limit;
        /** Note: Skip SearchProducts */
        const skipNumber = (pageNumber - 1) * limitNumber;
        
        if(price){
            /** Sort min price */
            if(price.min) searchProductQuery.price.$gte = Number(price.min);
            
            /** Sort min price */
            if(price.max) searchProductQuery.price.$lte = Number(price.max);
        }
        if(categoryId) searchProductQuery.categoryId = new mongoose.Types.ObjectId(categoryId);
        if(conditions && conditions.length > 0) searchProductQuery.condition = { $in : conditions};
        if(sizes && sizes.length > 0) searchProductQuery.size = { $in : sizes};
        if(meterials && meterials.length > 0) searchProductQuery.meterial = { $in : meterials};
        if(brands && brands.length > 0) searchProductQuery.brand = { $in : brands};
        if(q) searchProductQuery.title = {$regex:q,$options: "i"};

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
                $addFields : {
                    isLiked: {
                        $in: [new mongoose.Types.ObjectId(userId),"$likes.owner"]
                    },
                    totalLikes: {
                        $size : "$likes"
                    }
                }
            },
            {
                $skip: skipNumber
            },
            {
                $project : {
                    _id:1,
                    title:1,
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

    /**
     * Note: Get Product By Id
     * @constructor
     * @param {string} productId - Unique identifier for productDocument.
     * @throws {ApiError} - If throw error product does not exist
     * @returns {Promise<ProductDocument>} - Product 
    */
    public async GetProductById(productId:string):Promise<ProductDocument> {
        const product = await ProductModel.findById(new mongoose.Types.ObjectId(productId));
        if(!product) throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.PRODUCT.NOT_FOUND);
        return product;
    };

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
    public async UpdateProduct(updateProduct:UpdateProductInterface):Promise<ProductDocument> {
        const {brand,categoryId,colors,condition,coverImage,description,material,parcelSize,price,productId,size,status,title} = updateProduct;
        const product = await this.GetProductById(productId);
        /** Note: Assign the product updateProductObject value to Product document. */
        product.categoryId = new mongoose.Types.ObjectId(categoryId);
        product.title = title;
        product.coverImage = coverImage;
        product.colors = colors;
        product.material = material;
        product.parcelSize = parcelSize;
        product.description = description;
        product.condition = condition;
        product.size = new mongoose.Types.Object(size);
        product.brand = new mongoose.Types.ObjectId(brand);
        product.status = status;
        product.price = price;
        await product.save();

        return product;
    };

    /**
     * Note: Get Featured products
     * @constructer
     * @param {string} categoryId - Sort by category
     * @param {number} price - Sory by price
     * @param {string} sortType - Sorting methods
     * @returns {Promise<ProductDocument[]>}
     * List of latest products.
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
        if(categoryId) featuredProductsQuery.size = { $in : sizes };
        if(categoryId) featuredProductsQuery.categoryId = new mongoose.Types.ObjectId(categoryId);

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
                $addFields : {
                    isLiked: {
                        $in: [new mongoose.Types.ObjectId(userId),"$likes.owner"]
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
                $project : {
                    _id:1,
                    title:1,
                    coverImage:1,
                    totalLikes:1,
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
     * Note: Get Single Product by id.
     * @param {object} singleDataObject - Object containing fields to update.
     * @param {string} [singleDataObject.productId] - ProductDocument unique identifier.
     * @param {string} [singleDataObject.userId] - UserDocument unique identifier.
     * @throws {ApiError} If product not exist.
     * @returns {Promise<ProductDocument>} Finded product document.
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
                        }
                    ],
                    as:"ownerProducts"
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
                    let:{userId:new mongoose.Types.ObjectId(userId),owner:"$owner"},
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
                    from:"wishlists",
                    localField:"_id",            
                    foreignField: "productId",
                    as: "likes"
                }
            },
            {
                $graphLookup : {
                    from:"categories",
                    startWith: "$categoryId",
                    connectFromField: "parentId",
                    connectToField: "_id",
                    as:"categoryHierarchy"
                }
            },
            {
                $lookup : {
                    from:"sizes",
                    localField:"size",
                    foreignField:"_id",
                    as:"size"
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
                    }
                }
            },
            {
                $project : {
                    _id:1,
                    title:1,
                    description:1,
                    coverImage:1,
                    size:1,
                    brand:1,
                    condition:1,
                    material:1,
                    colors:1,
                    price:1,
                    parcelSize:1,
                    status:1,
                    "owner._id":1,
                    "owner.avatar":1,
                    "owner.fullname":1,
                    "owner.lastSeen":1,
                    "address.city":1,
                    "address.country":1,
                    isLiked:1,
                    totalLikes:1,
                    isFollowed:1,
                    categoryHierarchy:1,
                }
            }
        ]);

        return product[0];
    };


    /**
     * Note: Get Product By Category 
    */
}

export default ProductServices;