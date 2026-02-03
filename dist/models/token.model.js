import mongoose from "mongoose";
/** Note: Token Interfaces */
import { TokenTypes } from "../interfaces/token.interfaces.js";
/** Note: Token Schema */
const TokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    isUsed: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        enum: Object.values(TokenTypes),
        required: true
    }
}, { timestamps: true });
/** Note: Token Model */
const TokenModel = mongoose.model("Token", TokenSchema);
export default TokenModel;
//# sourceMappingURL=token.model.js.map