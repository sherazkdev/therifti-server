import type { Types, Document } from "mongoose";
/** Review Type */
export declare enum ReviewType {
    BUYER_TO_SELLER = "BUYER_TO_SELLER",
    SELLER_TO_BUYER = "SELLER_TO_BUYER"
}
/** Review Status */
export declare enum ReviewStatus {
    DELETED = "DELETED",
    EDITED = "EDITED",
    ENABLED = "ENABLED"
}
/** Review Interface */
export interface ReviewInterface {
    orderId: Types.ObjectId;
    productId: Types.ObjectId;
    reviewerId: Types.ObjectId;
    targetUserId: Types.ObjectId;
    review: string;
    rate: number;
    type: ReviewType;
    status: ReviewStatus;
}
/** Review Docuemnt */
export interface ReviewDocument extends ReviewInterface, Document {
}
//# sourceMappingURL=review.interfaces.d.ts.map