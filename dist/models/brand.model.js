import mongoose from "mongoose";
/** Import types and intefaces */
import { BRAND_STATUS } from "../interfaces/brand.interfaces.js";
/** Note: Brand Schema For brands. */
const BrandSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: BRAND_STATUS,
        default: "ENABLED"
    }
}, { timestamps: true });
/** Note: Brand Model for services. */
const BrandModel = mongoose.model("Brand", BrandSchema);
export default BrandModel;
//# sourceMappingURL=brand.model.js.map