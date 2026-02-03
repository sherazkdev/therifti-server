import mongoose from "mongoose";
/** Note: importing types || interfaces */
import { type WishlistDocument } from "../interfaces/wishlist.interfaces.js";
/** Wishlist Model */
declare const WishlistModel: mongoose.Model<WishlistDocument, {}, {}, {}, mongoose.Document<unknown, {}, WishlistDocument, {}, mongoose.DefaultSchemaOptions> & WishlistDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, WishlistDocument>;
export default WishlistModel;
//# sourceMappingURL=wishlist.model.d.ts.map