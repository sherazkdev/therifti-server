import * as z from "zod";
/** Note: Validate Register User Account. */
export declare const VALIDATE_REGISTER_USER_ACCOUNT: z.ZodObject<{
    email: z.ZodEmail;
    fullname: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
    zipCode: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
/** Note: Validate Login User Account. */
export declare const VALIDATE_LOGIN_USER_ACCOUNT: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
/** Note: Validate Get User Profile */
export declare const VALIDATE_GET_USER_PROFILE: z.ZodObject<{
    userId: z.ZodString;
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
/** Note: Validate Update User Profile */
export declare const VALIDATE_UPDATE_USER_PROFILE: z.ZodObject<{
    about: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    avatar: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    fullname: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    dob: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    username: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    location: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        city: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        country: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>>>;
    gender: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
/** Note: Validate Forgot password */
export declare const VALIDATE_FORGOT_PASSWORD: z.ZodObject<{
    email: z.ZodOptional<z.ZodEmail>;
    userId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/** Note: Validate Verify Registeration Otp. */
export declare const VALIDATE_VERIFY_REGISTERATION_OTP: z.ZodObject<{
    userId: z.ZodString;
    otp: z.ZodString;
}, z.core.$strip>;
/** Note: Validate Change Email. */
export declare const VALIDATE_CHANGE_EMAIL: z.ZodObject<{
    email: z.ZodEmail;
}, z.core.$strip>;
/** Note: Validate Verify Otp and Change email. */
export declare const VALIDATE_VERIFY_OTP_AND_CHANGE_EMAIL: z.ZodObject<{
    email: z.ZodEmail;
    otp: z.ZodString;
    resetToken: z.ZodString;
}, z.core.$strip>;
/** Note: Validate Forgot Account Password. */
export declare const VALIDATE_FORGOT_ACCOUNT_PASSWORD: z.ZodObject<{
    email: z.ZodEmail;
}, z.core.$strip>;
/** Note: Validate Verify Sended Forgot account otp. */
export declare const VALIDATE_VERIFY_FORGOT_ACCOUNT_OTP: z.ZodObject<{
    email: z.ZodEmail;
    otp: z.ZodString;
}, z.core.$strip>;
/** Note: Validate Reset Password. */
export declare const VALIDATE_RESET_PASSWORD: z.ZodObject<{
    password: z.ZodString;
    email: z.ZodEmail;
    resetToken: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=user.validaters.d.ts.map