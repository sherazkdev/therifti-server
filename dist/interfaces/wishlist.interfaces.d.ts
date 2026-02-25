import type { Types, Document } from "mongoose";
/** Wishlist Interface */
export interface WishlistInterface {
    productId: Types.ObjectId;
    owner: Types.ObjectId;
}
export interface WishlistDocument extends WishlistInterface, Document {
}
/** Note: Add To wishlist interface. */
export interface AddToWishlistInterface {
    productId: string;
    owner: string;
}
/** Note: Remove to wishlist interface */
export interface RemoveToWishlistInterface {
    wishlistId: string;
}
//# sourceMappingURL=wishlist.interfaces.d.ts.map