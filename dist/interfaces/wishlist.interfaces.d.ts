import type { Types, Document } from "mongoose";
/** Wishlist Interface */
export interface WishlistInterface {
    productId: Types.ObjectId;
    owner: Types.ObjectId;
}
export interface WishlistDocument extends WishlistInterface, Document {
}
//# sourceMappingURL=wishlist.interfaces.d.ts.map