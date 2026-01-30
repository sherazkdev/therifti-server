import type {Document,Types} from "mongoose";

/** Note: Send otp Purpose */
export const OTP_PURPOSE = [
  "CHANGE_PASSWORD",
  "CHANGE_EMAIL",
  "REGISTER_ACCOUNT",
  "FORGOT_ACCOUNT",
] as const;

export type OtpPurpose = typeof OTP_PURPOSE[number];

/** Send Otp Inteface */
export interface SendOtpInterface {
    purpose: OtpPurpose,
    userId:string,
    email:string 
}
/** Note: Otp email content. */
export interface OtpEmaiLContentInterface {
    title:string,
    description:string,
}
/** Note: Email sending content. */
export const OTP_EMAIL_CONTENT:Record<OtpPurpose,OtpEmaiLContentInterface> = {
    CHANGE_EMAIL : {    
        title: 'Verify Your Email',
        description: 'email verification for your account',
    },
    CHANGE_PASSWORD : {
        title: 'Change Password Confirmation',
        description: 'password change verification',
    },
    FORGOT_ACCOUNT : {
        title: 'Reset Your Password',
        description: 'password reset request',
    },
    REGISTER_ACCOUNT : {
        description : "register account request",
        title : "Register Your Account"
    }
}

/** Note: OtpInterface */
export interface OtpInterface {
    userId:Types.ObjectId,
    otp:string,
    otpExpiry:Date,
    purpose:OtpPurpose
}

/** VerifyOtp */
export interface VerifyOtpInterface {
    otp:string,
    purpose:OtpPurpose,
    userId:string
}
/** Note: OtpDocument */
export interface OtpDocument extends OtpInterface, Document {};