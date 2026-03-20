import mongoose from "mongoose";

/** Note: Token Interfaces */
import { type TokenDocument,TokenPlatform,TokenTypes} from "../interfaces/token.interfaces.js";

/** Note: Token Schema */
const TokenSchema = new mongoose.Schema<TokenDocument>({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    hashedToken:{
        type: String,
        required: true
    },
    expiresAt:{
        type: Date,
        required: true
    },
    type:{
        type: String,
        enum: Object.values(TokenTypes),
        required: true
    },
    platform:{
        type: String,
        enum: Object.values(TokenPlatform),
        default: null
    }
}, {timestamps:true});
/** Note: Token Model */
const TokenModel = mongoose.model<TokenDocument>("Token",TokenSchema);
export default TokenModel;