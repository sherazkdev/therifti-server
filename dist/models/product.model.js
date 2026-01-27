import mongoose from "mongoose";
import { ProductColor, ProductCondition, ProductMaterial, ProductSize, ProductStatus } from "../interfaces/product.interfaces.js";
const ProductSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        index: true,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        index: true,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        index: true,
        enum: Object.values(ProductCondition),
        required: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        index: true,
        required: true
    },
    material: {
        type: String,
        enum: Object.values(ProductMaterial),
        required: true
    },
    colors: {
        type: [String],
        enum: Object.values(ProductColor),
        validate: {
            validator: (v) => v.length <= 2,
            message: `Error: maximum 2 colors allowed.`
        },
        index: true,
    },
    price: {
        type: Number,
        index: true,
        required: true,
    },
    size: {
        type: String,
        enum: Object.values(ProductSize),
        default: ProductSize.MEDIUM
    },
    status: {
        type: String,
        enum: Object.values(ProductStatus),
        default: ProductStatus.PUBLISHED
    }
}, { timestamps: true });
/* ProductModel **/
const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
//# sourceMappingURL=product.model.js.map