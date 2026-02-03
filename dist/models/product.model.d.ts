import mongoose from "mongoose";
/** Import Types */
import type { ProductDocument } from "../interfaces/product.interfaces.js";
declare const ProductModel: mongoose.Model<ProductDocument, {}, {}, {}, mongoose.Document<unknown, {}, ProductDocument, {}, mongoose.DefaultSchemaOptions> & ProductDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ProductDocument>;
export default ProductModel;
//# sourceMappingURL=product.model.d.ts.map