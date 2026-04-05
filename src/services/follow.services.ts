import FollowModel from "../models/follow.model.js";
/** Note: Response Constants. */
import { ERROR_MESSAGES,STATUS_CODES } from "../constants/responseConstants.js";
import ApiError from "../utils/ApiError.js";
import mongoose from "mongoose";

/** Interfaces */
import type { FollowDocument,FollowSellerInterface,UnfollowSellerInterface } from "../interfaces/follow.interfaces.js";

class FollowServices {
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
    public async FollowSeller(followObject:FollowSellerInterface):Promise<void> {
        const {followerId,followingId} = followObject;
        /** Note: if the user is already following. */
        const follower_exist = await FollowModel.findOne({
            followerId:new mongoose.Types.ObjectId(followerId),
            followingId:new mongoose.Types.ObjectId(followingId)
        });
        if(follower_exist) throw new ApiError(STATUS_CODES.BAD_REQUEST,ERROR_MESSAGES.FOLLOW.ALREADY_EXIST);
        const followDocument = await FollowModel.create({
            followerId:new mongoose.Types.ObjectId(followerId),
            followingId:new mongoose.Types.ObjectId(followingId),
        });
        /** Note: Trigger Notification seller is followed. */
        return;
    };
    
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
    public async UnFollowSeller(followObject:UnfollowSellerInterface):Promise<void> {
        const {followerId,followingId} = followObject;
        /** Note: Check if no follow record exists. */
        const followDocument = await FollowModel.findOne({
            followerId:new mongoose.Types.ObjectId(followerId),
            followingId:new mongoose.Types.ObjectId(followingId)
        });
        if(!followDocument) throw new ApiError(STATUS_CODES.BAD_REQUEST,ERROR_MESSAGES.FOLLOW.NOT_FOUND);
        await followDocument.deleteOne();
        /** Note: After unFollow user trigger notification. */
        return;
    };

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
    public async GetFollowers(userId:string):Promise<FollowDocument[]> {
        const followers:FollowDocument[] = await FollowModel.aggregate([
            {
                $match : {
                    $expr : {
                        $eq : ["$followingId",new mongoose.Types.ObjectId(userId)]
                    }
                }
            },
            {
                $lookup : {
                    from:"users",
                    localField:"followerId",
                    foreignField:"_id",
                    as:'followers'
                }
            },
            {
                $addFields : {
                    follower:{
                        $map : {
                            input:"$followers",
                            as:"f",
                            in:{
                                _id:"f._id",
                                avatar:"f.avatar",
                                fullname:"f.fullname",
                            }
                        }
                    }
                }
            },
            {
                $project : {
                    _id:1,
                    follower:1,
                    followingId:1,
                    createdAt:1,
                }
            }
        ]);

        return followers;
    };
    
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
    public async GetFollowings(userId: string): Promise<FollowDocument[]> {
        const followings:FollowDocument[] = await FollowModel.aggregate([
            {
                $match : {
                    $expr : {
                        $eq : ["$followerId",new mongoose.Types.ObjectId(userId)]
                    }
                }
            },
            {
                $lookup : {
                    from:"users",
                    localField:"followingId",
                    foreignField:"_id",
                    as:'followings'
                }
            },
            {
                $addFields : {
                    followings:{
                        $map : {
                            input:"$followings",
                            as:"f",
                            in:{
                                _id:"f._id",
                                avatar:"f.avatar",
                                fullname:"f.fullname",
                            }
                        }
                    }
                }
            },
            {
                $project : {
                    _id:1,
                    followings:1,
                    followingId:1,
                    createdAt:1,
                }
            }
        ]);

        return followings;
    }

}

export default FollowServices;