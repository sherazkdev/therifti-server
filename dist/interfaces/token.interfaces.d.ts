import type { Types, Document } from "mongoose";
/** Note: Token types enum.*/
export declare enum TokenTypes {
    REFRESH = "REFRESH",
    RESET_PASSWORD = "RESET_PASSWORD",
    EMAIL_VERIFY = "EMAIL_VERIFY",
    INVITE = "INVITE"
}
export interface TokenInterface {
    userId: Types.ObjectId;
    token: string;
    expiresAt: Date;
    isUsed: boolean;
    type: TokenTypes;
}
export interface TokenDocument extends TokenInterface, Document {
}
export interface GenerateTokenResultInterface {
    rawToken: string;
    hashedToken: string;
}
export interface VerifyResetTokenInterface {
    rawToken: string;
    type: TokenTypes;
    userId: string;
}
export interface CreateTokenInterface {
    userId: string;
    type: TokenTypes;
}
export interface CreateTokenResponseInterface {
    rawToken: string;
}
export interface FindValidTokenInterface {
    userId: string;
    type: TokenTypes;
    token: string;
}
//# sourceMappingURL=token.interfaces.d.ts.map