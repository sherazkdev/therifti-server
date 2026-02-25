/** Interfaces */
import type { FollowDocument, FollowSellerInterface, UnfollowSellerInterface } from "../interfaces/follow.interfaces.js";
declare class FollowServices {
    /**
     * Note: Follow a user or seller.
     *
     * This service method allows the current user to follow another user or seller
     * on the platform. It checks if the user is already following the target,
     * creates a follow record, and triggers a notification asynchronously.
     *
     * @param {object} followObject - Object containing follow information.
     * @param {string} [followObject.followerId] - followerId for user who is following.
     * @param {string} [followObject.followingId] - followingId of the user being followed.
     * @returns {Promise<void>} Return a promise that resolves when follow action is complete.
     * @throws {ApiError} Throws an error if the user is already following or any DB issue occurs.
     * @example
     * await followServices.FollowSeller({
     *      followerId: :followerId,
     *      followingId: :followingId
     * });
    */
    FollowSeller(followObject: FollowSellerInterface): Promise<void>;
    /**
     * Note: Unfollow a user or seller.
     *
     * This service method allows the current user to unfollow another user or seller on the platform.
     * It first checks if a follow record exists, then removes it, and optionally triggers a
     * notification asynchronously to inform the unfollowed user.
     *
     * @param {Object} followObject - Object containing follow information.
     * @param {string} [followObject.followerId] - followerId of the user who is performing the unfollow.
     * @param {string} [followObject.followingId] - followingId of the user or seller being unfollowed.
     * @returns {Promise<void>} Returns a Promise that resolves when the unfollow action is complete.
     * @throws {ApiError} Throws an error if no follow record exists or if a database error occurs.
     * @example
     * await followServices.UnFollowSeller({
     *      followerId: :followerId,
     *      followingId: :followingId
     * });
    */
    UnFollowSeller(followObject: UnfollowSellerInterface): Promise<void>;
    /**
     * Note: Get all followers of a user or seller.
     *
     * This service method retrieves the complete list of followers for a given user or seller.
     * It queries the database and returns an array of follow documents.
     *
     * @param {string} userId - userId of the user or seller whose followers are to be retrieved.
     * @returns {Promise<FollowDocument[]>} A Promise that resolves to an array of follow documents representing the user's followers.
     * @throws {ApiError} Throws an error if the user does not exist in the database or if a database error occurs.
     *
     * @example
     * const followers = await followServices.GetAllFollowers(:userId);
    */
    GetFollowers(userId: string): Promise<FollowDocument[]>;
    /**
     * Note: Get all users or sellers that a given user is following.
     *
     * This service method retrieves the complete list of followings for a given user.
     * It queries the database and returns an array of follow documents representing
     * the users or sellers that the specified user is following.
     *
     * @param {string} userId - userId of the user whose followings are to be retrieved.
     * @returns {Promise<FollowDocument[]>} A Promise that resolves to an array of follow documents representing the users/sellers being followed.
     * @throws {ApiError} Throws an error if the user does not exist in the database or if a database error occurs.
     *
     * @example
     * const followings = await followServices.GetFollowings({ userId: :userId });
    */
    GetFollowings(userId: string): Promise<FollowDocument[]>;
}
export default FollowServices;
//# sourceMappingURL=follow.services.d.ts.map