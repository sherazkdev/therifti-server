import type {Types,Document} from "mongoose";
/** User Gender */
export enum UserGender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}
interface UserMethods {
    GenerateAccessToken():Promise<string>,
    GenerateRefreshToken():Promise<string>,
}
export enum UserStatusEnum {
    ACTIVATED = "ACTIVATED",
    DEACTIVATE = "DEACTIVATE"
}
export enum UserTypesEnum {
    ADMIN = "ADMIN",
    USER = "USER"
}
export interface UserInterface {
    googleId?:string | null,
    facebookeId?:string | null,
    appleId?:string | null,
    fullname?:string | null,
    username?:string | null,
    email:string,
    avatar?:string | null,
    password?:string | null,
    about?:string | null,
    phoneNumber?:{
        countryCode:string | null,
        nationalNumber:string | null
    },
    otp?:string | null,
    otpExpiry?: Date | null
    dob?:Date | null
    gender?:UserGender | null,
    location?:{
        city:string | null,
        country:string | null
    },
    refreshToken?:string | null,
    isVerfied?:Boolean,
    lastSeen?:Date,
    type?:UserTypesEnum
    status?:UserStatusEnum
};
export interface UserDocument extends Document<Types.ObjectId,any,UserInterface>, UserInterface, UserMethods {};

/** Sevices intefaces */
export interface UpdateUserProfileInterface extends Partial<Pick<UserInterface, 
    | "about"
    | "avatar"
    | "dob"
    | "location"
    | "fullname"
    | "gender"
>> {};

/** Update user password */
export interface UpdateUserPasswordInterface {
    userId:string,
    password:string
}
/** Register user account with manually */
export interface RegisterUserAccountMenuallyInterface {
    email:string,
    password:string,
    username:string,
    fullname:string,
    zipCode?:number
}
/** Refresh and accessToken Generate */
export interface RefreshAndAccessTokenGeneraterInterface {
    refreshToken:string,
    accessToken:string
}
/** Send Mail */
export interface SendMailInterface {
    to:string,
    subject:string,
    body:string
}
/** VerifyOtp */
export interface VerifyOtpInterface {
    otp:string,
    userId:string
}
/** Note: LoginUserAccount interface */
export interface LoginUserAccountInterface {
    email:string,
    password:string
}
/** Note: Change account Password. */
export interface ChangeAccountPasswordInterface {
    userId:string,
    password:string
}
/** Note: Change account email. */
export interface ChangeAccountEmailInterface {
    userId:string,
    email:string
}
/** Note: GetUserAccountSort */
export const USER_SORT = [
  "PRICE_HIGH_TO_LOW",
  "PRICE_LOW_TO_HIGH",
  "NEWEST_FIRST",
  "RELEVANCE",
] as const;

export type UserSort = typeof USER_SORT[number];

/** Note: GetUserAccountProfile */
export interface GetUserProfileInterface {
    page?:number | undefined,
    limit?:number | undefined,
    userId:string,
    categoryId?:string | undefined,
    sort?:UserSort | undefined,
}
/** ChangeAccountEmailVerifyOtpInterface */
export interface ChangeAccountEmailVerifyOtpInterface {
    userId:string,
    email:string
}
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
    userId?:string | undefined,
    email?:string | undefined
}
/** Note: Otp email content. */
export interface OtpEmaiLContentInterface {
    title:string,
    description:string,
}

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
