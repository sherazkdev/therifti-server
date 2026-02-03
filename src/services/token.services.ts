import mongoose from "mongoose";
import TokenModel from "../models/token.model.js";

/** Note: UserModel Services */
import ApiError from "../utils/ApiError.js";
/** Response Constants */
import {ERROR_MESSAGES, STATUS_CODES} from "../constants/responseConstants.js";
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
    public async VerifyResetToken(resetTokenObject:VerifyResetTokenInterface):Promise<Boolean> {
        const {rawToken,userId,type} = resetTokenObject;
        /** Note: find token */
        const token = await TokenModel.findOne({
            type:type,
            userId:userId
        });
        /** Note: Current date miliseconds. */
        const now = Date.now();
        if(!token) throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.AUTH.TOKEN_NOT_FOUND);
        if(token.isUsed) throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.AUTH.TOKEN_IS_USED);
        if(token.expiresAt.getTime() < now) throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.AUTH.TOKEN_EXPIRED);
        /** Note: Compare hashed token. */
        const hashedInput = crypto.createHash("sha256").update(rawToken).digest();
        const tokenBuffer = Buffer.from(token.token,"hex");
        /** Note: Token Compare */
        if(!crypto.timingSafeEqual(hashedInput,tokenBuffer)){
            throw new ApiError(STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGES.AUTH.TOKEN_INVALID);
        }
        /** Note: mark is used */
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