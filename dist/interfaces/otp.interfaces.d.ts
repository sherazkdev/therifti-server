import type { Document, Types } from "mongoose";
/** Note: Send otp Purpose */
export declare const OTP_PURPOSE: readonly ["CHANGE_PASSWORD", "CHANGE_EMAIL", "REGISTER_ACCOUNT", "FORGOT_ACCOUNT"];
export type OtpPurpose = typeof OTP_PURPOSE[number];
/** Send Otp Inteface */
export interface SendOtpInterface {
    purpose: OtpPurpose;
    userId: string;
    email: string;
}
/** Note: Otp email content. */
export interface OtpEmaiLContentInterface {
    title: string;
    description: string;
}
/** Note: Email sending content. */
export declare const OTP_EMAIL_CONTENT: Record<OtpPurpose, OtpEmaiLContentInterface>;
/** Note: OtpInterface */
export interface OtpInterface {
    userId: Types.ObjectId;
    otp: string;
    otpExpiry: Date;
    purpose: OtpPurpose;
}
/** VerifyOtp */
export interface VerifyOtpInterface {
    otp: string;
    purpose: OtpPurpose;
    userId: string;
}
/** Note: OtpDocument */
export interface OtpDocument extends OtpInterface, Document {
}
//# sourceMappingURL=otp.interfaces.d.ts.map