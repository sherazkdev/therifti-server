import mongoose from "mongoose";
import TokenModel from "../models/token.model.js";

/** Note: UserModel Services */
import ApiError from "../utils/ApiError.js";
/** Response Constants */
import {ERROR_CODES, ERROR_MESSAGES, STATUS_CODES} from "../constants/responseConstants.js";
import crypto from "crypto";
import { TokenTypes, type CreateTokenInterface, type CreateTokenResponseInterface, type FindValidTokenInterface, type GenerateTokenResultInterface, type TokenDocument, type VerifyResetTokenInterface } from "../interfaces/token.interfaces.js";

class TokenServices {

    /**
     * Note: Generating raw and hashed token.
     * @param null.
     * @returns ResetTokenResultInterface.
    */
    private async GenerateResetToken():Promise<GenerateTokenResultInterface> {
        const rawToken = crypto.randomBytes(48).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
        return {rawToken,hashedToken};
    }

    /**
     * Note: Token verifier and mark isUsed.
     * @param resetTokenObject - hashedToken. 
     * @param resetTokenObject - rawToken. 
     * @returns Boolean. 
    */
    public async VerifyResetToken(resetTokenObject:VerifyResetTokenInterface): Promise<boolean> {
        const {rawToken,type,userId} = resetTokenObject;
        
        // Hash input token
        const hashedInput = crypto.createHash("sha256").update(rawToken).digest("hex");

        // Find token by userId and type (ignore isUsed and expiresAt for now)
        const token = await TokenModel.findOne({
            userId: new mongoose.Types.ObjectId(userId),
            type,
            token: hashedInput
        });

        if (!token) {
            // Token does not exist → invalid
            throw new ApiError(
                STATUS_CODES.UNAUTHORIZED,
                ERROR_MESSAGES.AUTH.TOKEN_INVALID,
                ERROR_CODES.AUTH.TOKEN_INVALID
            );
        }

        // Check if token already used
        if (token.isUsed) {
            throw new ApiError(
                STATUS_CODES.NOT_FOUND,
                ERROR_MESSAGES.AUTH.TOKEN_IS_USED,
                ERROR_CODES.AUTH.TOKEN_IS_USED
            );
        }

        // Check if token expired
        if (token.expiresAt.getTime() < Date.now()) {
            throw new ApiError(
                STATUS_CODES.UNAUTHORIZED,
                ERROR_MESSAGES.AUTH.TOKEN_EXPIRED,
                ERROR_CODES.AUTH.TOKEN_EXPIRED
            );
        }

        // Mark token as used
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
    public async CreateToken(userObject:CreateTokenInterface):Promise<CreateTokenResponseInterface> {
        const {userId,type} = userObject;
        /** Create Token */
        const {rawToken,hashedToken} = await this.GenerateResetToken();
        const now = Date.now();
        const expiresAt = new Date( now + ( 10 * 60 * 1000 ));
        /** Note: Save token in model. */
        const token = await TokenModel.create({
            userId: new mongoose.Types.ObjectId(userId),
            token: hashedToken,
            type: type,
            isUsed: false,
            expiresAt
        });
        return {rawToken:rawToken};
    }

    /**
     * Note: Token finder using userId and type.
     * @param tokenObject - userId. 
     * @param tokenObject - type. 
     * @returns tokenDocument. 
    */
    public async FindValidToken(tokenObject:FindValidTokenInterface):Promise<TokenDocument> {
        const {type,userId,token} = tokenObject;
        /** Note: Sha256 Algorithem*/
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const checkToken = await TokenModel.findOne({
            userId: new mongoose.Types.ObjectId(userId),
            type: type,
            token: hashedToken
        });
        /** if not token exist throw error */
        if(!checkToken){
            throw new ApiError(STATUS_CODES.OK,ERROR_MESSAGES.AUTH.TOKEN_INVALID);
        }
        return checkToken;
    }
}

export default TokenServices;