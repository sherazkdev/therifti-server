import mongoose from "mongoose";
/** Note: Imports types and interfaces */
import { OTP_PURPOSE } from "../interfaces/otp.interfaces.js";
/** Note: Otp Schema. */
const OtpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    otpExpiry: {
        type: Date,
        required: true
    },
    purpose: {
        type: String,
        enum: Object.values(OTP_PURPOSE)
    }
}, { timestamps: true });
/** Note: Otp Model */
const OtpModel = mongoose.model("Otp", OtpSchema);
export default OtpModel;
//# sourceMappingURL=otp.model.js.map