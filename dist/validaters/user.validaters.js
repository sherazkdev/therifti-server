import * as z from "zod";
/** Note: Validate Register User Account. */
export const VALIDATE_REGISTER_USER_ACCOUNT = z.object({
    email: z.email(),
    fullname: z.string().min(3, "Error: fullname at least 3 character"),
    username: z.string().min(3, "Error: username at least 3 character"),
    password: z.string().min(8, "Error: password at least 9 character"),
    zipCode: z.number().optional()
});
/** Note: Validate Login User Account. */
export const VALIDATE_LOGIN_USER_ACCOUNT = z.object({
    email: z.email(),
    password: z.string().min(8, "Error: password at least 9 character")
});
/** Note: Validate Get User Profile */
export const VALIDATE_GET_USER_PROFILE = z.object({
    userId: z.string().length(24, "Error: Object id at least 24 character"),
    page: z.number().optional(),
    limit: z.number().optional()
});
/** Note: Validate Update User Profile */
export const VALIDATE_UPDATE_USER_PROFILE = z.object({
    about: z.string().optional().nullable(),
    avatar: z.string().optional().nullable(),
    fullname: z.string().optional().nullable(),
    dob: z.date().optional().nullable(),
    username: z.string().optional().nullable(),
    location: z.object({
        city: z.string().optional().nullable(),
        country: z.string().optional().nullable()
    }).optional().nullable(),
    gender: z.string().optional().nullable()
});
/** Note: Validate Forgot password */
export const VALIDATE_FORGOT_PASSWORD = z.object({
    email: z.email().optional(),
    userId: z.string().optional()
});
/** Note: Validate Verify Registeration Otp. */
export const VALIDATE_VERIFY_REGISTERATION_OTP = z.object({
    userId: z.string().length(24, "Error: Object id at least 24 character"),
    otp: z.string().min(4, "Min or max otp required 4 character.")
});
/** Note: Validate Change Email. */
export const VALIDATE_CHANGE_EMAIL = z.object({
    email: z.email()
});
/** Note: Validate Verify Otp and Change email. */
export const VALIDATE_VERIFY_OTP_AND_CHANGE_EMAIL = z.object({
    email: z.email(),
    otp: z.string(),
    resetToken: z.string()
});
/** Note: Validate Forgot Account Password. */
export const VALIDATE_FORGOT_ACCOUNT_PASSWORD = z.object({
    email: z.email()
});
/** Note: Validate Verify Sended Forgot account otp. */
export const VALIDATE_VERIFY_FORGOT_ACCOUNT_OTP = z.object({
    email: z.email(),
    otp: z.string()
});
/** Note: Validate Reset Password. */
export const VALIDATE_RESET_PASSWORD = z.object({
    password: z.string().min(8, "Error: password at least 9 character"),
    email: z.email(),
    resetToken: z.string()
});
//# sourceMappingURL=user.validaters.js.map