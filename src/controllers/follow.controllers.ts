/** Response Constants */
import {ERROR_MESSAGES, STATUS_CODES, SUCCESS_MESSAGES} from "../constants/responseConstants.js";
import ApiError from "../utils/ApiError.js";

/** Note: imports types */
import type {Request,Response} from "express";
import {VALIDATE_FOLLOW_SELLER,VALIDATE_GET_FOLLOWERS,VALIDATE_GET_FOLLOWINGS,VALIDATE_UNFOLLOW_SELLER} from "../validaters/follow.validarer.js";

/** Services*/
import FollowServices from "../services/follow.services.js";
import ApiResponse from "../utils/ApiResponse.js";
import type { UserDocument } from "../interfaces/user.interfaces.js";

class FollowControllers {
    private followServices: FollowServices;
    
    constructor(followServices:FollowServices){
        this.followServices = followServices;
    }

    /**
     * Note: Follow a Seller
     *
     * Purpose:
     * This controller handles the action of following a seller.
     * It validates the incoming request data and delegates the
     * follow action to the FollowService.
     *
     * @param {Request} req - Express request object containing the payload.
     * @param {Response} res - Express response object.
     * 
     * @returns {Promise<Response>} API response containing the newly created product document.
     *
     * Use cases:
     * - User clicks "Follow" on a seller profile
     * - Keep the follow relationships updated in the database
     *
     * Notes:
     * - Validation is performed using Zod
     * - Returns only success response, does not return the follow document
     */
    public HandleFollowSeller = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_FOLLOW_SELLER.parse(req.body);

        /** Note: FolLow seller payload. */
        const followSellerPayload = {...result,followingId:(req.user as UserDocument)._id.toString()};
        await this.followServices.FollowSeller(followSellerPayload);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse([],SUCCESS_MESSAGES.FOLLOW.FOLLOWED,true,STATUS_CODES.OK)
        )
    }

    /**
     * Note: Unfollow a Seller
     *
     * Purpose:
     * This controller handles the action of unfollowing a seller.
     * It validates the incoming request data and delegates the
     * unfollow action to the FollowService.
     *
     * @param {Request} req - Express request object containing the payload.
     * @param {Response} res - Express response object.
     * 
     * @returns {Promise<Response>} API response containing the newly created product document.
     *
     * Use cases:
     * - User clicks "Unfollow" on a seller profile
     * - Remove the follow relationship from the database
     *
     * Notes:
     * - Validation is performed using Zod
     * - Returns only success response, does not return the unfollow document
     */
    public HandleUnfollow = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_UNFOLLOW_SELLER.parse(req.params);

        /** Note: unFollow seller payload. */
        const unFollowSellerPayload = {...result,followingId:(req.user as UserDocument)._id.toString()};
        await this.followServices.UnFollowSeller(unFollowSellerPayload);
        return res.status(STATUS_CODES.ACCEPTED).json(
            new ApiResponse([],SUCCESS_MESSAGES.FOLLOW.UNFOLLOWED,true,STATUS_CODES.ACCEPTED)
        )
    }
    
    /**
     * Note: Get Followers of a User
     *
     * Purpose:
     * This controller retrieves all users who are following
     * a specific user (seller). The user ID is validated and
     * the FollowService fetches the followers.
     *
     * @param {Request} req - Express request object containing userId.
     * @param {Response} res - Express response object.
     * 
     * @returns {Promise<Response>} API response containing the newly created product document.
     *
     * Use cases:
     * - Display the list of followers on user profile
     * - Sync follower count on client side
     *
     * Notes:
     * - Validation is performed using Zod
     * - Returns an array of follower documents
     */
    public HandleGetFollowers = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_GET_FOLLOWERS.parse(req.body);

        const followerDocuments = await this.followServices.GetFollowers(result.userId);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(followerDocuments,SUCCESS_MESSAGES.FOLLOW.FOLLOWERS_FETCHED,true,STATUS_CODES.OK)
        )
    }
    
    /**
     * Note: Get Followings of a User
     *
     * Purpose:
     * This controller retrieves all users that a specific user
     * is following. It validates the incoming user ID and
     * delegates to FollowService to fetch the followings.
     *
     * @param {Request} req - Express request object containing userId.
     * @param {Response} res - Express response object.
     *
     * @returns {Promise<Response>} API response containing the newly created product document.
     * Use cases:
     * - Display the list of users the current user is following
     * - Sync following count on client side
     *
     * Notes:
     * - Validation is performed using Zod
     * - Returns an array of following documents
     */
    public HandleGetFollowings = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_GET_FOLLOWINGS.parse(req.body);

        const followingDocuments = await this.followServices.GetFollowings(result.userId);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(followingDocuments,SUCCESS_MESSAGES.FOLLOW.FOLLOWINGS_FETCHED,true,STATUS_CODES.OK)
        )
    }
}

export default FollowControllers;