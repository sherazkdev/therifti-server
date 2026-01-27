import mongoose from "mongoose";
/** Types || Interfaces */
import { ReviewStatus, ReviewType } from "../interfaces/review.interfaces.js";
/** Note: Review Schema */
const ReviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    targetUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    type: {
        type: String,
        enum: Object.values(ReviewType),
        required: true
    },
    status: {
        type: String,
        enum: Object.values(ReviewStatus),
        default: ReviewStatus.ENABLED
    }
}, { timestamps: true });
/** Review Model */
const ReviewModel = mongoose.model("Review", ReviewSchema);
export default ReviewModel;
//# sourceMappingURL=review.model.js.map