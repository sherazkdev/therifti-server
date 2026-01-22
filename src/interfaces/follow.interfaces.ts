import type {Types,Document} from "mongoose";

/** Follow Interface */
export interface FollowInterface {
    followerId:Types.ObjectId,
    followingId:Types.ObjectId
};

/** Follow Document */
export interface FollowDocument extends FollowInterface, Document {}; 