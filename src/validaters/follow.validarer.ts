import * as z from "zod";

/** Note: Validate Follow Seller */
export const VALIDATE_FOLLOW_SELLER = z.object({
    followingId:z.string().min(24,"Error: Object id at least 24 character"),
});

/** Note: Validate Unfollow Seller */
export const VALIDATE_UNFOLLOW_SELLER = z.object({
    followingId:z.string().min(24,"Error: Object id at least 24 character"),
});

/** Note: Validate Get Followers. */
export const VALIDATE_GET_FOLLOWERS = z.object({
    userId:z.string().min(24,"Error: Object id at least 24 character")
})
/** Note: Validate Get Followings. */
export const VALIDATE_GET_FOLLOWINGS = z.object({
    userId:z.string().min(24,"Error: Object id at least 24 character")
})