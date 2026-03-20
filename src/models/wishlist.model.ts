import mongoose from "mongoose";
/** Note: importing types || interfaces */
import {type WishlistDocument,} from "../interfaces/wishlist.interfaces.js";

/** Wishlist Schema */
const WishlistSchema = new mongoose.Schema<WishlistDocument>({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
}, {timestamps:true});

/** Wishlist Model */
const WishlistModel = mongoose.model<WishlistDocument>("Wishlist", WishlistSchema);
export default WishlistModel;