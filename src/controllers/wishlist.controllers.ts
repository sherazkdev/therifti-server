/** Response Constants */
import {ERROR_MESSAGES, STATUS_CODES, SUCCESS_MESSAGES} from "../constants/responseConstants.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
/** Note: imports types */
import type {Request,Response} from "express";
import {VALIDATE_ADD_TO_WISHLIST,VALIDATE_REMOVE_TO_WISHLIST} from "../validaters/wishlist.validarer.js";

/** Services*/
import WishlistServices from "../services/wishlist.services.js";
import type { UserDocument } from "../interfaces/user.interfaces.js";

class WishlistControllers {
    private wishlistServices = new WishlistServices();
    /**
     * Note: Add Product to Wishlist
     *
     * Purpose:
     * This controller handles adding a product to the user's wishlist.
     * It validates the incoming request data and delegates the
     * addition to the WishlistService.
     *
     * @param {Request} req - Express request object containing payload.
     * @param {Response} res - Express response object.
     * 
     * @returns {Promise<Response>} API response containing the newly created product document
     *
     * Use cases:
     * - User clicks "Add to Wishlist" on a product
     * - Persist the product in the user's wishlist in the database
     *
     * Notes:
     * - Validation is performed using Zod
     * - Returns only success response, does not return the wishlist document
     */
    public HandleAddToWishlist = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_ADD_TO_WISHLIST.safeParse(req.body);
        if(!result.success){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG)
        }
        /** Note: Wishlist payload. */
        const addToWishlistPayload = result.data;
        await this.wishlistServices.AddToWishlist(addToWishlistPayload);
        return res.status(STATUS_CODES.ACCEPTED).json(
            new ApiResponse([],SUCCESS_MESSAGES.WISHLIST.ADDED,true,STATUS_CODES.ACCEPTED)
        )
    };
    
    /**
     * Note: Remove Product from Wishlist
     *
     * Purpose:
     * This controller handles removing a product from the user's wishlist.
     * It validates the incoming request data and delegates the
     * removal to the WishlistService.
     *
     * @param {Request} req - Express request object containing payload.
     * @param {Response} res - Express response object.
     * 
     * @returns {Promise<Response>} API response containing the newly created product document
     *
     * Use cases:
     * - User clicks "Remove from Wishlist" on a product
     * - Delete the product from the user's wishlist in the database
     *
     * Notes:
     * - Validation is performed using Zod
     * - Returns only success response, does not return the removed document
     */
    public HandleRemoveToWishlist = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_REMOVE_TO_WISHLIST.safeParse(req.body);
        if(!result.success){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG)
        }
        /** Note: Wishlist payload. */
        const removeToWishlistPayload = result.data;
        await this.wishlistServices.RemoveFromWishlist(removeToWishlistPayload);
        return res.status(STATUS_CODES.ACCEPTED).json(
            new ApiResponse([],SUCCESS_MESSAGES.WISHLIST.REMOVED,true,STATUS_CODES.ACCEPTED)
        )
    };
    /**
     * Note: Get User Wishlists
     *
     * Purpose:
     * This controller retrieves all wishlist items for a specific user.
     * It fetches the wishlist documents using WishlistService.
     *
     * @param {Request} req - Express request object containing authenticated user.
     * @param {Response} res - Express response object.
     * 
     * @returns {Promise<Response>} API response containing the newly created product document
     *
     * Use cases:
     * - Display the user's wishlist on the frontend
     * - Keep the client in sync with the server
     *
     * Notes:
     * - The user ID is obtained from the authenticated request (req.user)
     * - Returns an array of wishlist product documents
     */
    public HandleGetWishlists = async (req:Request,res:Response):Promise<Response> => {
        const wishlistDocuments = await this.wishlistServices.GetWishlists((req.user as UserDocument)._id.toString());
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(wishlistDocuments,SUCCESS_MESSAGES.WISHLIST.FETCHED,true,STATUS_CODES.OK)
        )
    };
}

export default WishlistControllers;