import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
/** Note: Response Constants. */
import { ERROR_MESSAGES, STATUS_CODES, SUCCESS_MESSAGES } from "../constants/responseConstants.js";
/** Zod Validaters  */
import { VALIDATE_FORGOT_ACCOUNT_PASSWORD, VALIDATE_LOGIN_USER_ACCOUNT, VALIDATE_REGISTER_USER_ACCOUNT, VALIDATE_RESET_PASSWORD, VALIDATE_VERIFY_FORGOT_ACCOUNT_OTP, VALIDATE_VERIFY_REGISTERATION_OTP } from "../validaters/user.validaters.js";
import UserServices from "../services/user.services.js";
import AuthServices from "../services/auth.services.js";
class AuthControllers {
    userServices = new UserServices();
    authServices = new AuthServices();
    /**
     * Note: Register User account.
     * @param req.
     * @param res.
     * @returns userDocument.
    */
    HandleRegisterUserAccount = async (req, res) => {
        /** Note: Validate User Details. */
        const result = await VALIDATE_REGISTER_USER_ACCOUNT.safeParse(req.body);
        if (!result.success) {
            throw new ApiError(STATUS_CODES.BAD_REQUEST, result?.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        /** Note: Register User Payload. */
        const { email, fullname, password, username, zipCode } = result.data;
        const registerUserPayload = result.data;
        const registerUser = await this.authServices.RegisterUserAccount(registerUserPayload);
        return res.status(200).json(new ApiResponse(registerUser, SUCCESS_MESSAGES.AUTH.REGISTER + ", And verify otp.", true, 200));
    };
    /**
     * Note: Registration Otp Verifier.
     * @param otpObject - userId.
     * @param otpObject - otp.
     * @update userDocument isVerified and refreshToken.
     * @returns UserDocument.
    */
    HandleRegisterationOtpVerifier = async (req, res) => {
        const result = VALIDATE_VERIFY_REGISTERATION_OTP.safeParse(req.body);
        if (!result.success) {
            throw new ApiError(STATUS_CODES.BAD_REQUEST, result?.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        const { otp, userId } = result.data;
        const otpObject = {
            otp: otp,
            userId: userId,
            purpose: "REGISTER_ACCOUNT"
        };
        const { tokens, user } = await this.authServices.VerifyRegistrationOtp(otpObject);
        /** Note: Cookies Options. */
        const cookieOptions = {
            httpOnly: true,
            sameSite: "lax",
            secure: true
        };
        return res.status(STATUS_CODES.OK)
            .cookie("accessToken", tokens.accessToken, cookieOptions)
            .cookie("refreshToken", tokens.refreshToken, cookieOptions)
            .json(new ApiResponse(user, "User logged in successfully.", true, 200));
    };
    /**
     * Note: Login user account.
     * @param req.
     * @param res.
     * @returns userDocument.
    */
    HandleLoginUserAccount = async (req, res) => {
        const result = VALIDATE_LOGIN_USER_ACCOUNT.safeParse(req.body);
        if (!result.success) {
            throw new ApiError(STATUS_CODES.BAD_REQUEST, result.error.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        /** Note: verifyUser credinals payload. */
        const verifyUserPayload = result.data;
        const { user, tokens } = await this.authServices.LoginUserAccount(verifyUserPayload);
        /** Note: Cookies Options. */
        const cookieOptions = {
            httpOnly: true,
            sameSite: "lax",
            secure: true
        };
        return res.status(STATUS_CODES.OK)
            .cookie("accessToken", tokens.accessToken, cookieOptions)
            .cookie("refreshToken", tokens.refreshToken, cookieOptions)
            .json(new ApiResponse(user, "User logged in successfully.", true, 200));
    };
    /**
 * Note: Forgot account password.
 * @param req.
 * @param res.
 * @returns null.
*/
    HandleForgotAccountPassword = async (req, res) => {
        const result = VALIDATE_FORGOT_ACCOUNT_PASSWORD.safeParse(req.body);
        if (!result.success) {
            throw new ApiError(STATUS_CODES.NOT_FOUND, result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        const { email } = result.data;
        /** Note: Forgot password payload.*/
        const forgotPasswordPayload = {
            email: email
        };
        const sendOtpProccessing = await this.authServices.ForgotAccount(forgotPasswordPayload);
        return res.status(STATUS_CODES.OK).json(new ApiResponse([], SUCCESS_MESSAGES.USER.OTP_SUCCESSFULLY_SENDED, true, STATUS_CODES.OK));
    };
    /**
     * Note: Verify Forgot account otp.
     * @param req.
     * @param res.
     * @returns null.
    */
    HandleVerifyForgotAccountOtp = async (req, res) => {
        const result = VALIDATE_VERIFY_FORGOT_ACCOUNT_OTP.safeParse(req.body);
        if (!result.success) {
            throw new ApiError(STATUS_CODES.NOT_FOUND, result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        const { email, otp } = result.data;
        /** Note: Verify forgot account otp. */
        const verifyForgotAccountOtpPayload = {
            email: email,
            otp: otp
        };
        const { resetToken } = await this.authServices.VerifyForgotAccountOtp(verifyForgotAccountOtpPayload);
        return res.status(STATUS_CODES.OK).json(new ApiResponse({ resetToken }, SUCCESS_MESSAGES.USER.OTP_SUCCESSFULLY_SENDED, true, STATUS_CODES.OK));
    };
    /**
     * Note: Change password with resetToken.
     * @param req.
     * @param res.
     * @returns Response.
    */
    HandleResetPassword = async (req, res) => {
        const result = VALIDATE_RESET_PASSWORD.safeParse(req.body);
        /** Note: Check if any error in result. */
        if (!result.success) {
            throw new ApiError(STATUS_CODES.BAD_REQUEST, result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        /** Note: Reset password payload. */
        const resetPasswordPayload = result.data;
        const resetPasswordService = await this.authServices.resetPasswordWithToken(resetPasswordPayload);
        return res.status(STATUS_CODES.OK).json(new ApiResponse([], SUCCESS_MESSAGES.USER.UPDATE, true, STATUS_CODES.OK));
    };
    /**
     * Note: Logout user account.
     * @param req.
     * @param res.
     * @returns Response.
    */
    HandleLogoutUserAccount = async (req, res) => {
        const refreshToken = req.cookies?.refreshToken;
        /** Note: Logout account payload. */
        const logoutAccountPayload = {
            refreshToken: refreshToken,
            userId: req.user._id.toString()
        };
        const logoutAccount = await this.authServices.LogoutUserAccount(logoutAccountPayload);
        /** Note: clear access and refersh token from cookies */
        /** Note: Cookies Options. */
        const cookieOptions = {
            httpOnly: true,
            sameSite: "lax",
            secure: true
        };
        return res.status(STATUS_CODES.OK)
            .clearCookie("refreshToken", cookieOptions)
            .clearCookie("accessToken", cookieOptions)
            .json(new ApiResponse([], SUCCESS_MESSAGES.AUTH.LOGOUT, true, STATUS_CODES.OK));
    };
    /**
     * Note: Google auth callback handler.
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @param {NextFunction} next - Express next middleware function.
     * @returns {Promise<void>}
    */
    HandleGoogleAuthCallback = async (req, res, next) => {
        console.log(req.user);
    };
    /**
     * Note: Facebook auth callback handler.
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @param {NextFunction} next - Express next middleware function.
     * @returns {Promise<void>}
    */
    HandleFacebookAuthCallback = async (req, res, next) => { };
}
export default AuthControllers;
//# sourceMappingURL=auth.controllers.js.map