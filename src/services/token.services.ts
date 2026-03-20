import mongoose from "mongoose";
import TokenModel from "../models/token.model.js";

/** Note: UserModel Services */
import ApiError from "../utils/ApiError.js";
/** Response Constants */
import {ERROR_CODES, ERROR_MESSAGES, STATUS_CODES} from "../constants/responseConstants.js";
import crypto from "crypto";
import { TokenTypes, type CreateTokenInterface, type CreateTokenResponseInterface, type FindValidTokenInterface, type GenerateTokenResultInterface, type GetTokenByTokenInterface, type TokenDocument, type VerifyResetTokenInterface } from "../interfaces/token.interfaces.js";
import env from "../constants/loadEnv.js";

class TokenServices {

    /**
     * Note: Generating raw and hashed token.
     * @param null.
     * @returns ResetTokenResultInterface.
    */
    private async GenerateToken():Promise<GenerateTokenResultInterface> {
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
    public async VerifyToken(resetTokenObject:VerifyResetTokenInterface): Promise<boolean> {
        const {token,type,userId} = resetTokenObject;
        
        // Note:  Hash input token
        const hashedInput = crypto.createHash(env.TOKEN_HASH_ALGORITHM).update(token).digest("hex");

        // Note: Check Token document is Exist.
        const tokenDocument = await TokenModel.findOne({
            userId: new mongoose.Types.ObjectId(userId),
            type,
            hashedToken: hashedInput,
        });
        
        /** Note: If tokenDocument not found. */
        if(!tokenDocument){
            throw new ApiError(STATUS_CODES.UNAUTHORIZED,ERROR_CODES.AUTH.TOKEN_INVALID);
        }

        // Note: If tokenDocument is exipred throw new error.
        if (tokenDocument.expiresAt.getTime() < Date.now()) {
            throw new ApiError(
                STATUS_CODES.UNAUTHORIZED,
                ERROR_CODES.AUTH.TOKEN_EXPIRED
            );
        }
        /** Note: If Token Is used -> delete hard tokenDocument. */
        await tokenDocument.deleteOne();

        return true;
    }

    /**
     * Note: Create token for verification.
     * @param userObject - userId.
     * @param userObject - type.
     * @returns CreatedToken.
    */
    public async CreateToken(userObject:CreateTokenInterface):Promise<CreateTokenResponseInterface> {
        const { userId, type, platform} = userObject;
        /** Note: Create Encrypted Token */
        const { rawToken , hashedToken } = await this.GenerateToken();
        const now = Date.now();
        const expiresAt = type === "REFRESH_TOKEN" ? new Date( now + ( 7 * 24 * 60 * 60  *  1000 )) : new Date( now + ( 10 * 60 * 1000 ));
        /** Note: Save token in model. */
        const token = await TokenModel.create({
            userId: new mongoose.Types.ObjectId(userId),
            hashedToken: hashedToken,
            type: type,
            platform:platform || null,
            expiresAt
        });
        return {token:rawToken};
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

        const tokenDocument = await TokenModel.findOne({
            userId: new mongoose.Types.ObjectId(userId),
            type: type,
            hashedToken: hashedToken
        });
        /** if not token exist throw error */
        if(!tokenDocument){
            throw new ApiError(STATUS_CODES.OK,ERROR_MESSAGES.AUTH.TOKEN_INVALID);
        }
        return tokenDocument;
    }

    /**
     * Note: Get Token By Token Service.
     * 
     * This service using for get token using raw token and with type to find and return tokenDocument.
     * 
     * @param {GetTokenByTokenInterface} tokenObject - Token object indetifier fields.
     * @param {string} [tokenObject.type] - Token type for tokenDocument. 
     * @param {string} [tokenObject.token] - Unique token identifer hexa token.
     * 
     * @return {Promise<TokenDocument>} - Fetched tokenDocument returned.
     * 
     * @throws {Promise<ApiError>} - If token documnet no exist.
    */
    public async GetTokenByToken(tokenObject:GetTokenByTokenInterface):Promise<TokenDocument> {
        const {type,token} = tokenObject;
        /** Note: Create Encrypted Hashed token. */
        const hashedToken = crypto.createHash(env.TOKEN_HASH_ALGORITHM).update(token).digest("hex");

        const tokenDocument = await TokenModel.findOne({
            type:type,
            hashedToken:hashedToken
        });

        /** Note: if not token exist throw error */
        if(!tokenDocument){
            throw new ApiError(STATUS_CODES.OK,ERROR_MESSAGES.AUTH.TOKEN_INVALID);
        }
        return tokenDocument;
    }
}

export default TokenServices;