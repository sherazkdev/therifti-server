import mongoose from "mongoose";
/** Import types and intefaces */
import { type BrandDocument } from "../interfaces/brand.interfaces.js";
/** Note: Brand Model for services. */
declare const BrandModel: mongoose.Model<BrandDocument, {}, {}, {}, mongoose.Document<unknown, {}, BrandDocument, {}, mongoose.DefaultSchemaOptions> & BrandDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, BrandDocument>;
export default BrandModel;
//# sourceMappingURL=brand.model.d.ts.map