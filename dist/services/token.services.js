import mongoose from "mongoose";
import TokenModel from "../models/token.model.js";
/** Note: UserModel Services */
import ApiError from "../utils/ApiError.js";
/** Response Constants */
import { ERROR_MESSAGES, STATUS_CODES } from "../constants/responseConstants.js";
import crypto from "crypto";
import { TokenTypes } from "../interfaces/token.interfaces.js";
class TokenServices {
    /**
     * Note: Generating raw and hashed token.
     * @param null.
     * @returns ResetTokenResultInterface.
    */
    async GenerateResetToken() {
        const rawToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256")
            .update(rawToken)
            .digest("hex");
        return { rawToken, hashedToken };
    }
    /**
     *
     * @param resetTokenObject - hashedToken.
     * @param resetTokenObject - rawToken.
     * @returns Boolean.
    */
    async VerifyResetToken(resetTokenObject) {
        const { rawToken, userId, type } = resetTokenObject;
        /** Note: Check token is exist and if is not used token. */
        const token = await TokenModel.findOne({
            userId: new mongoose.Types.ObjectId(userId),
            type: type
        });
        if (!token) {
            throw new ApiError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.AUTH.TOKEN_NOT_FOUND);
        }
        if (token.isUsed) {
            throw new ApiError(STATUS_CODES.BAD_REQUEST, ERROR_MESSAGES.AUTH.TOKEN_IS_USED);
        }
        const now = Date.now();
        if (token.expiresAt.getTime() < now) {
            throw new ApiError(STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGES.AUTH.TOKEN_EXPIRED);
        }
        /** Sha256 Algorithem */
        const compareToken = crypto.createHash("sha256")
            .update(rawToken)
            .digest("hex");
        /** Comparing */
        if (token.token !== compareToken) {
            throw new ApiError(STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGES.AUTH.TOKEN_INVALID);
        }
        /** Note: Update token document field isUsed true. */
        token.isUsed = true;
        await token.save();
        return true;
    }
    /**
     * Note: Create token for verification.
     * @param userObject - userId.
     * @param userObject - type.
     * @returns CreatedToken.
    */
    async CreateToken(userObject) {
        const { userId, type } = userObject;
        /** Create Token */
        const { rawToken, hashedToken } = await this.GenerateResetToken();
        const now = Date.now();
        /** Note: Save token in model. */
        const token = await TokenModel.create({
            userId: new mongoose.Types.ObjectId(userId),
            token: hashedToken,
            type: type,
            isUsed: false,
            expiresAt: new Date(now + (10 * 60 * 1000))
        });
        return { rawToken: rawToken };
    }
    /**
     * Note: Token finder using userId and type.
     * @param tokenObject - userId.
     * @param tokenObject - type.
     * @returns tokenDocument.
    */
    async FindValidToken(tokenObject) {
        const { type, userId } = tokenObject;
        const token = await TokenModel.findOne({
            userId: new mongoose.Types.ObjectId(userId),
            type: type
        });
        /** if not token exist throw error */
        if (!token) {
            throw new ApiError(STATUS_CODES.OK, ERROR_MESSAGES.AUTH.TOKEN_INVALID);
        }
        return token;
    }
}
export default TokenServices;
//# sourceMappingURL=token.services.js.map