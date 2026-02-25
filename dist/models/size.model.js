import mongoose from "mongoose";
/** Note: Size Schema */
const SizeSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    international: {
        type: String,
        required: true
    },
    EU: {
        type: String,
        default: null
    },
    US: {
        type: String,
        default: null
    },
    UK: {
        type: String,
        default: null
    },
    waist: {
        type: String,
        default: null
    }
}, { timestamps: true });
/** Note: Size Model */
const SizeModel = mongoose.model("Size", SizeSchema);
export default SizeModel;
//# sourceMappingURL=size.model.js.map