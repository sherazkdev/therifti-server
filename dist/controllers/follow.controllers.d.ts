/** Note: imports types */
import type { Request, Response } from "express";
declare class FollowControllers {
    private followServices;
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
    HandleFollowSeller: (req: Request, res: Response) => Promise<Response>;
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
    HandleUnfollow: (req: Request, res: Response) => Promise<Response>;
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
    HandleGetFollowers: (req: Request, res: Response) => Promise<Response>;
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
    HandleGetFollowings: (req: Request, res: Response) => Promise<Response>;
}
export default FollowControllers;
//# sourceMappingURL=follow.controllers.d.ts.map