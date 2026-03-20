import type { Types,Document } from "mongoose";

/** Note: Token types enum.*/
export enum TokenTypes {
    REFRESH_TOKEN = "REFRESH_TOKEN",
    RESET_PASSWORD = "RESET_PASSWORD",
    EMAIL_VERIFY = "EMAIL_VERIFY",
    INVITE = "INVITE"
};

/** Note: Enum Token Platfroms */
export enum TokenPlatform {
    MOBILE = "MOBILE",
    WEB = "WEB"
}

/* Note: Token Interface */
export interface TokenInterface {
    userId:Types.ObjectId,
    hashedToken:string,
    type:TokenTypes,
    expiresAt:Date,
    platform:TokenPlatform | null
};

export interface TokenDocument extends TokenInterface, Document {}

export interface GenerateTokenResultInterface {
    rawToken:string,
    hashedToken:string
}

export interface VerifyResetTokenInterface {
    token:string,
    type:TokenTypes,
    userId:string,

}

export interface CreateTokenInterface {
    userId: string,
    type:TokenTypes,
    platform:string | null
}

export interface CreateTokenResponseInterface {
    token:string
}

export interface FindValidTokenInterface {
    type:TokenTypes,
    userId: string,
    token:string
}

export interface GetTokenByTokenInterface {
    token:string,
    type:TokenTypes
}