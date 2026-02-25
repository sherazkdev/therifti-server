import type { Types, Document } from "mongoose";
/** Follow Interface */
export interface FollowInterface {
    followerId: Types.ObjectId;
    followingId: Types.ObjectId;
}
/** Follow Document */
export interface FollowDocument extends FollowInterface, Document {
}
/** Note: Follow Seller interface. */
export interface FollowSellerInterface {
    followerId: string;
    followingId: string;
}
/** Note: Unfollow Seller interface. */
export interface UnfollowSellerInterface {
    followerId: string;
    followingId: string;
}
//# sourceMappingURL=follow.interfaces.d.ts.map