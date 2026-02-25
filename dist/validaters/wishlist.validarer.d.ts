import * as z from "zod";
/** Note: Validate Add To Wishlist. */
export declare const VALIDATE_ADD_TO_WISHLIST: z.ZodObject<{
    productId: z.ZodString;
    owner: z.ZodString;
}, z.core.$strip>;
/** Note: Validate Remove To Wishlist. */
export declare const VALIDATE_REMOVE_TO_WISHLIST: z.ZodObject<{
    wishlistId: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=wishlist.validarer.d.ts.map