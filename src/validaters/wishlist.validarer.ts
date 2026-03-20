import * as z from "zod";

/** Note: Validate Add To Wishlist. */
export const VALIDATE_ADD_TO_WISHLIST = z.object({
    productId:z.string().min(24,"Error: Object id at least 24 character")
})

/** Note: Validate Remove To Wishlist. */
export const VALIDATE_REMOVE_TO_WISHLIST = z.object({
    productId:z.string().min(24,"Error: Object id at least 24 character")
});