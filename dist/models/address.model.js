import mongoose, { mongo } from "mongoose";
/** Note: Addreess Schema */
const AddressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    country: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    area: {
        type: String,
        default: null
    },
    streetAddress: {
        type: String,
        default: null
    },
    postalCode: {
        type: Number,
        required: true
    },
    isDefault: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
/** Note: Address Model */
const AddressModel = mongoose.model("Address", AddressSchema);
export default AddressModel;
//# sourceMappingURL=address.model.js.map