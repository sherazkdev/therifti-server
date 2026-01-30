import type { Types,Document } from "mongoose";

/** Note: Token types enum.*/
export interface TokenTypes {
    REFRESH : "REFRESH",
    RESET_PASSWORD : "RESET_PASSWORD",
    EMAIL_VERIFY : "EMAIL_VERIFY",
    INVITE : "INVITE"
};

export interface TokenInterface {
    userId:Types.ObjectId,
    token:string,
    expiresAt:Date;
    isUsed:boolean;
    type:TokenInterface
};

export interface TokenDocument extends TokenInterface, Document {}