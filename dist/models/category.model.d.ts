import mongoose from "mongoose";
/** Interfaces */
import type { CategoryDocument } from "../interfaces/category.interfaces.js";
/** CategoryModel */
declare const CategoryModel: mongoose.Model<CategoryDocument, {}, {}, {}, mongoose.Document<unknown, {}, CategoryDocument, {}, mongoose.DefaultSchemaOptions> & CategoryDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, CategoryDocument>;
export default CategoryModel;
//# sourceMappingURL=category.model.d.ts.map