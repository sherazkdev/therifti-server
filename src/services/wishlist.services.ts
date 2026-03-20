import WishlistModel from "../models/wishlist.model.js";
/** Note: Response Constants. */
import { ERROR_MESSAGES,STATUS_CODES } from "../constants/responseConstants.js";
import ApiError from "../utils/ApiError.js";
import mongoose from "mongoose";
import type { AddToWishlistInterface, RemoveToWishlistInterface } from "../interfaces/wishlist.interfaces.js";

/** Interface */

class WishlistServices {

    /**
     * Note: Add a product to the wishlist.
     * 
     * This service method adds a specified product to the user's wishlist.
     * It first checks whether the product already exists in the user's wishlist.
     * If the product is not already present, a new wishlist document is created.
     * 
     * @param {AddToWishlistInterface} wishlistObject - The wishlist data object.
     * @param {string} wishlistObject.productId - The ID of the product to be added to the wishlist.
     * @param {string} wishlistObject.owner - The ID of the user who owns the wishlist.
     * @returns {Promise<boolean>} A Promise that resolves to `true` if the product
     * is successfully added to the wishlist.
     * @throws {ApiError} Throws an error if the product already exists in the wishlist,
     * or if a database error occurs.
    */
    public async AddToWishlist(wishlistObject:AddToWishlistInterface):Promise<boolean> {
        const {owner,productId} = wishlistObject;
        /** Note: Check Product is exist into wishlist. */
        const check_wishlist = await WishlistModel.findOne({
            owner:new mongoose.Types.ObjectId(owner),
            productId:new mongoose.Types.ObjectId(productId)
        });
        if(check_wishlist) throw new ApiError(STATUS_CODES.BAD_REQUEST,ERROR_MESSAGES.WISHLIST.ALREADY_EXIST);
        const wishlistDocumentn = await WishlistModel.create({
            owner:new mongoose.Types.ObjectId(owner),
            productId:new mongoose.Types.ObjectId(productId)
        });
        return true;
    };

    /**
     * Note: Remove a product from the wishlist.
     * 
     * This service method removes a specified product from the user's wishlist.
     * It searches for the wishlist entry using the provided wishlist ID
     * and deletes the corresponding document from the database.
     * 
     * @param {Object} wishlistObject - The wishlist data object.
     * @param {string} wishlistObject.wishlistId - The ID of the wishlist document to be removed.
     * @returns {Promise<boolean>} A Promise that resolves to `true` if the wishlist
     * item is successfully removed, or `false` if no matching record is found.
     * @throws {ApiError} Throws an error if the wishlist entry does not exist
     * or if a database error occurs.
    */
    public async RemoveFromWishlist(wishlistObject:RemoveToWishlistInterface):Promise<boolean> {
        const {productId} = wishlistObject;
        /** Note: Check Product is exist into wishlist. */
        const check_wishlist = await WishlistModel.findOne({productId:new mongoose.Types.ObjectId(productId)});
        if(!check_wishlist) throw new ApiError(STATUS_CODES.BAD_REQUEST,ERROR_MESSAGES.WISHLIST.NOT_FOUND);
        await check_wishlist.deleteOne();
        return true;
    };

    /**
     * Note: Get all wishlist items of a user.
     * 
     * This service method retrieves all wishlist entries associated with
     * a specific user. It queries the wishlist collection and returns
     * an array of wishlist documents belonging to the provided user ID.
     * 
     * @param {string} userId - The ID of the user whose wishlist items are to be retrieved.
     * @returns {Promise<WishlistDocument[]>} A Promise that resolves to an array of wishlist documents.
     * @throws {ApiError} Throws an error if the user does not exist or if a database error occurs.
    */
    public async GetWishlists(userId:string):Promise<any> {
        const wishlists = await WishlistModel.aggregate([
            {
                $match : {
                    $expr : {
                        $eq : ["$owner",new mongoose.Types.ObjectId(userId)]
                    }
                }
            },
            {
                $lookup : {
                    from:"wishlists",
                    localField:"productId",
                    foreignField:"productId",
                    as:"likes"
                }
            },
            {
                $lookup : {
                    from:"products",
                    localField:"productId",
                    foreignField:"_id",
                    as:"product"
                }
            },
            {
                $addFields : {
                    product : {
                        $first : "$product"
                    },
                    totalLikes:{
                        $size:"$likes"
                    },
                    isLiked:{
                        $in  : [new mongoose.Types.ObjectId(userId),"$likes.owner"]
                    }
                }
            },
            {
                $project : {
                    _id:1,
                    "product._id":1,
                    "product.coverImage":1,
                    "product.title":1,
                    "product.condition":1,
                    "product.price":1,
                    totalLikes:1,
                    isLiked:1,
                }
            }
        ]);
        
        return wishlists;
    };
}

export default WishlistServices;