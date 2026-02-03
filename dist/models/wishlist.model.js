import mongoose from "mongoose";
/** Note: importing types || interfaces */
import {} from "../interfaces/wishlist.interfaces.js";
/** Wishlist Schema */
const WishlistSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
}, { timestamps: true });
/** Wishlist Model */
const WishlistModel = mongoose.model("Wishlist", WishlistSchema);
export default WishlistModel;
//# sourceMappingURL=wishlist.model.js.map