import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
/** Note: Response Constants. */
import { ERROR_MESSAGES, STATUS_CODES, SUCCESS_MESSAGES } from "../constants/responseConstants.js";
/** Note: imported UserServices. */
import UserServices from "../services/user.services.js";
/** Note: Validate Handler using zod. */
import { VALIDATE_CHANGE_EMAIL, VALIDATE_GET_USER_PROFILE, VALIDATE_GET_USER_REVIEWS, VALIDATE_UPDATE_USER_PROFILE, VALIDATE_VERIFY_OTP_AND_CHANGE_EMAIL } from "../validaters/user.validaters.js";
class UserControllers {
    userServices = new UserServices();
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
            userId: req.user._id.toString()
        };
        /** Note: send verification code. */
        const { resetToken } = await this.userServices.ChangeAccountEmail(changeEmailPayload);
        return res.status(STATUS_CODES.OK).json(new ApiResponse({ resetToken }, SUCCESS_MESSAGES.USER.OTP_SUCCESSFULLY_SENDED, true, STATUS_CODES.OK));
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
        const { email, otp, resetToken } = result.data;
        /** Note: verify email otp payload. */
        const verifyOtpPayload = {
            email: email,
            otp: otp,
            resetToken: resetToken,
            userId: req.user._id.toString()
        };
        const verifyOtpProccess = await this.userServices.VerifyOtpAndChangeEmail(verifyOtpPayload);
        return res.status(STATUS_CODES.OK).json(new ApiResponse(verifyOtpProccess, SUCCESS_MESSAGES.USER.UPDATE, true, STATUS_CODES.OK));
    };
    /**
     * Note: Update user profile.
     * @param req.
     * @param res.
     * @return Response.
    */
    HandleUpdateProfile = async (req, res) => {
        const result = VALIDATE_UPDATE_USER_PROFILE.safeParse(req.body);
        /** Note: Check if any error in result. */
        if (!result.success) {
            throw new ApiError(STATUS_CODES.BAD_REQUEST, result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        /** Note: Update user profile payload. */
        const updateProfilePayload = result.data;
        const updatedProfile = await this.userServices.UpdateUserProfileById(req.user._id.toString(), updateProfilePayload);
        return res.status(STATUS_CODES.OK).json(new ApiResponse(updatedProfile, SUCCESS_MESSAGES.USER.UPDATE, true, STATUS_CODES.OK));
    };
    /**
     * Note: Get User Profile.
     * @param req.
     * @param res.
     * @returns Response.
    */
    HandleGetUserProfile = async (req, res) => {
        const result = VALIDATE_GET_USER_PROFILE.safeParse(req.query);
        if (!result.success) {
            throw new ApiError(STATUS_CODES.BAD_REQUEST, result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        /** Note: Get user profile payload. */
        const userProfilePayload = result.data;
        const userProfile = await this.userServices.GetUserAccountProfile(userProfilePayload);
        /** Return Response. */
        return res.status(STATUS_CODES.OK).json(new ApiResponse(userProfile, SUCCESS_MESSAGES.USER.FETCH, true, STATUS_CODES.OK));
    };
    /**
     * Note: Get user reviews.
     * @param req.
     * @param res.
     * @returns Response.
    */
    HandleGetUserReviews = async (req, res) => {
        const result = VALIDATE_GET_USER_REVIEWS.safeParse(req.query);
        if (!result.success) {
            throw new ApiError(STATUS_CODES.BAD_REQUEST, result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        /** Note: User reviews payload. */
        const userReviewsPayload = result.data;
        const userReviews = await this.userServices.GetUserReviews(userReviewsPayload);
        return res.status(STATUS_CODES.OK).json(new ApiResponse(userReviews, SUCCESS_MESSAGES.REVIEW.REVIEWS_FETCHED, true, STATUS_CODES.OK));
    };
}
export default UserControllers;
//# sourceMappingURL=user.controllers.js.map