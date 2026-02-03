/** Note: Send otp Purpose */
export const OTP_PURPOSE = [
    "CHANGE_PASSWORD",
    "CHANGE_EMAIL",
    "REGISTER_ACCOUNT",
    "FORGOT_ACCOUNT",
];
/** Note: Email sending content. */
export const OTP_EMAIL_CONTENT = {
    CHANGE_EMAIL: {
        title: 'Verify Your Email',
        description: 'email verification for your account',
    },
    CHANGE_PASSWORD: {
        title: 'Change Password Confirmation',
        description: 'password change verification',
    },
    FORGOT_ACCOUNT: {
        title: 'Reset Your Password',
        description: 'password reset request',
    },
    REGISTER_ACCOUNT: {
        description: "register account request",
        title: "Register Your Account"
    }
};
;
//# sourceMappingURL=otp.interfaces.js.map