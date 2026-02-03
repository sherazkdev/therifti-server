import mongoose from "mongoose";
/** Note: Importing types and interface for schema */
import { type OrderDocument } from "../interfaces/order.interfaces.js";
/** Order Model */
declare const OrderModel: mongoose.Model<OrderDocument, {}, {}, {}, mongoose.Document<unknown, {}, OrderDocument, {}, mongoose.DefaultSchemaOptions> & OrderDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, OrderDocument>;
export default OrderModel;
//# sourceMappingURL=order.model.d.ts.map