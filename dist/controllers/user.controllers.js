import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
/** Note: Response Constants. */
import { ERROR_MESSAGES, STATUS_CODES, SUCCESS_MESSAGES } from "../constants/responseConstants.js";
/** Note: imported UserServices. */
import UserServices from "../services/user.services.js";
/** Note: Validate Handler using zod. */
import { VALIDATE_CHANGE_EMAIL, VALIDATE_FORGOT_PASSWORD, VALIDATE_GET_USER_PROFILE, VALIDATE_LOGIN_USER_ACCOUNT, VALIDATE_REGISTER_USER_ACCOUNT, VALIDATE_VERIFY_OTP_AND_CHANGE_EMAIL, VALIDATE_VERIFY_REGISTERATION_OTP } from "../validaters/user.validaters.js";
import {} from "../interfaces/user.interfaces.js";
/**
 * Note: User Controllers.
 * 01: HandleGetUserProfile
 * 02: HandleGetCurrentUser
 * 03: HandleUpdateUserProfile
 * 04: HandleRegisterUser
 * 05: HandleLoginUser
 * 06: HandleForgotUserPassword
 * 07: HandleChangeUserPassword
 * 09: HandleChangeUserEmail
 * 10: HandleVerifyOtp
*/
class UserControllers {
    userServices = new UserServices();
    HandleRegisterUserAccount = async (req, res) => {
        /** Note: Validate User Details. */
        const result = await VALIDATE_REGISTER_USER_ACCOUNT.safeParse(req.body);
        if (!result.success) {
            throw new ApiError(STATUS_CODES.BAD_REQUEST, result?.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        /** Note: Register User Payload. */
        const { email, fullname, password, username, zipCode } = result.data;
        const registerUserPayload = result.data;
        const registerUser = await this.userServices.RegisterUserAccount(registerUserPayload);
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
        const { tokens, user } = await this.userServices.VerifyRegistrationOtp(otpObject);
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
        const { user, tokens } = await this.userServices.LoginUserAccount(verifyUserPayload);
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
     * Note: Change email and send otp.
     * @param req.
     * @param res.
     * @returns Null.
    */
    HandleChangeEmail = async (req, res) => {
        const result = VALIDATE_CHANGE_EMAIL.safeParse(req.body);
        if (!result.success) {
            throw new ApiError(STATUS_CODES.NOT_FOUND, result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        const { email } = result.data;
        /** Note: Chnage emai payload. */
        const changeEmailPayload = {
            email: email,
            userId: req.user._id
        };
        /** Note: send verification code. */
        const sendVerificationStatus = await this.userServices.ChangeAccountEmail(changeEmailPayload);
        return res.status(STATUS_CODES.OK).json(new ApiResponse([], SUCCESS_MESSAGES.USER.OTP_SUCCESSFULLY_SENDED, true, STATUS_CODES.OK));
    };
    /**
     * Note: Verify otp and change email.
     * @param req.
     * @param res.
     * @returns userDocument.
    */
    HandleVerifyOtpAndChangeEmail = async (req, res) => {
        const result = VALIDATE_VERIFY_OTP_AND_CHANGE_EMAIL.safeParse(req.body);
        if (!result.success) {
            throw new ApiError(STATUS_CODES.NOT_FOUND, result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        const { email, otp } = result.data;
        /** Note: verify email otp payload. */
        const verifyOtpPayload = {
            email: email,
            otp: otp,
            userId: req.user._id
        };
        const verifyOtpProccess = await this.userServices.VerifyOtpAndChangeEmail(verifyOtpPayload);
        return res.status(STATUS_CODES.OK).json(new ApiResponse(verifyOtpProccess, SUCCESS_MESSAGES.USER.UPDATE, true, STATUS_CODES.OK));
    };
}
export default new UserControllers;
//# sourceMappingURL=user.controllers.js.map