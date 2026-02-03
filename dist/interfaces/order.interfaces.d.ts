import type { Types, Document } from "mongoose";
/** Order Status */
export declare enum OrderStatus {
    PAID = "PAID",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CONFIRMED = "CONFIRMED",
    DISPUTED = "DISPUTED",
    COMPLETED = "COMPLETED"
}
/** Order Interface */
export interface OrderInterface {
    productId: Types.ObjectId;
    buyerId: Types.ObjectId;
    sellerId: Types.ObjectId;
    status: OrderStatus;
    deliveredAt?: Date;
    confirmedAt?: Date;
    canBuyerReview: boolean;
    canSellerReview: boolean;
}
/** Order Document */
export interface OrderDocument extends OrderInterface, Document {
}
//# sourceMappingURL=order.interfaces.d.ts.map