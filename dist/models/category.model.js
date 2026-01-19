import mongoose from "mongoose";
import { CategoryStatus } from "../interfaces/category.interfaces.js";
/** CategorySchema */
const CategorySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    title: {
        type: String,
        minLength: 3,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(CategoryStatus),
        default: CategoryStatus.ENABLED
    }
}, { timestamps: true });
/** CategoryModel */
const CategoryModel = mongoose.model("Category", CategorySchema);
export default CategoryModel;
//# sourceMappingURL=category.model.js.map