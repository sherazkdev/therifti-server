import type { Types, Document } from "mongoose";
/** User Gender */
export declare enum UserGender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}
interface UserMethods {
    GenerateAccessToken(): Promise<string>;
    GenerateRefreshToken(): Promise<string>;
}
export declare enum UserStatusEnum {
    ACTIVATED = "ACTIVATED",
    DEACTIVATE = "DEACTIVATE"
}
export declare enum UserTypesEnum {
    ADMIN = "ADMIN",
    USER = "USER"
}
export interface UserInterface {
    googleId?: string | null;
    facebookeId?: string | null;
    appleId?: string | null;
    fullname?: string | null;
    username?: string | null;
    email: string;
    avatar?: string | null;
    password?: string | null;
    about?: string | null;
    phoneNumber?: {
        countryCode: string | null;
        nationalNumber: string | null;
    };
    dob?: Date | null;
    gender?: UserGender | null;
    refreshToken?: string | null;
    isVerfied?: Boolean;
    lastSeen?: Date;
    type?: UserTypesEnum;
    status?: UserStatusEnum;
}
export interface UserDocument extends Document<Types.ObjectId, any, UserInterface>, UserInterface, UserMethods {
}
/** Note: Update User Profiel.*/
export interface UpdateUserProfileInterface {
    about?: string | null | undefined;
    avatar?: string | null | undefined;
    fullname?: string | null | undefined;
    dob?: Date | null | undefined;
    username?: string | null | undefined;
    gender?: string | null | undefined;
    location?: {
        city?: string | null | undefined;
        country?: string | null | undefined;
    } | null | undefined;
}
/** Update user password */
export interface UpdateUserPasswordInterface {
    userId: string;
    password: string;
}
/** Register user account with manually */
export interface RegisterUserAccountMenuallyInterface {
    email: string;
    password: string;
    username: string;
    fullname: string;
    zipCode?: number | undefined;
}
/** Refresh and accessToken Generate */
export interface RefreshAndAccessTokenGeneraterInterface {
    refreshToken: string;
    accessToken: string;
}
/** Send Mail */
export interface SendMailInterface {
    to: string;
    subject: string;
    body: string;
}
/** Note: LoginUserAccount interface */
export interface LoginUserAccountInterface {
    email: string;
    password: string;
}
/** Note: Change account Password. */
export interface ChangeAccountPasswordInterface {
    userId: string;
    password: string;
}
/** Note: Change account email. */
export interface ChangeAccountEmailInterface {
    userId: string;
    email: string;
}
/** Note: GetUserAccountSort */
export declare const USER_SORT: readonly ["PRICE_HIGH_TO_LOW", "PRICE_LOW_TO_HIGH", "NEWEST_FIRST", "RELEVANCE"];
export type UserSort = typeof USER_SORT[number];
export interface ChangeAccountEmailResponseInterface {
    resetToken: string;
}
/** Note: GetUserAccountProfile */
export interface GetUserProfileInterface {
    page?: number | undefined;
    limit?: number | undefined;
    userId: string;
    categoryId?: string | undefined;
    sort?: UserSort | undefined;
}
/** ChangeAccountEmailVerifyOtpInterface */
export interface ChangeAccountEmailVerifyOtpInterface {
    userId: string;
    email: string;
    resetToken: string;
}
export interface AuthResponseInterface {
    user: UserInterface;
    tokens: {
        refreshToken: string;
        accessToken: string;
    };
}
export interface VerifyUpdateEmailOtpInterface {
    userId: string;
    resetToken: string;
    email: string;
    otp: string;
}
export interface VerifyForgotAccountOtpInterface {
    email: string;
    otp: string;
}
export interface resetPasswordWithTokenInterface {
    resetToken: string;
    email: string;
    password: string;
}
export {};
//# sourceMappingURL=user.interfaces.d.ts.map