import * as z from "zod";
/** Note: Validate Follow Seller */
export declare const VALIDATE_FOLLOW_SELLER: z.ZodObject<{
    followerId: z.ZodString;
}, z.core.$strip>;
/** Note: Validate Unfollow Seller */
export declare const VALIDATE_UNFOLLOW_SELLER: z.ZodObject<{
    followerId: z.ZodString;
}, z.core.$strip>;
/** Note: Validate Get Followers. */
export declare const VALIDATE_GET_FOLLOWERS: z.ZodObject<{
    userId: z.ZodString;
}, z.core.$strip>;
/** Note: Validate Get Followings. */
export declare const VALIDATE_GET_FOLLOWINGS: z.ZodObject<{
    userId: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=follow.validarer.d.ts.map