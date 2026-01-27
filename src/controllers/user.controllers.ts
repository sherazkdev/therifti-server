import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/** Note: Response Constants. */
import {ERROR_MESSAGES, STATUS_CODES, SUCCESS_MESSAGES} from "../constants/responseConstants.js";
/** Note: imported UserServices. */
import UserServices from "../services/user.services.js";
/** Note: imports types */
import type {CookieOptions, Request,Response} from "express";
/** Note: Validate Handler using zod. */
import {VALIDATE_FORGOT_PASSWORD, VALIDATE_GET_USER_PROFILE, VALIDATE_REGISTER_USER_ACCOUNT, VALIDATE_VERIFY_REGISTERATION_OTP} from "../validaters/user.validaters.js";
import { type RegisterUserAccountMenuallyInterface } from "../interfaces/user.interfaces.js";
import type { VerifyOtpInterface } from "../interfaces/otp.interfaces.js";

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
    private userServices = new UserServices();

    public HandleRegisterUserAccount = async (req:Request,res:Response):Promise<Response> => {
        /** Note: Validate User Details. */
        console.log(req.body)
        const result = await VALIDATE_REGISTER_USER_ACCOUNT.safeParse(req.body);
        if(!result.success){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,result?.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        /** Note: Register User Payload. */
        const {email,fullname,password,username,zipCode} = result.data;
        const registerUserPayload:RegisterUserAccountMenuallyInterface = result.data;
        const registerUser = await this.userServices.RegisterUserAccount(registerUserPayload);
        return res.status(200).json(
            new ApiResponse(registerUser,SUCCESS_MESSAGES.AUTH.REGISTER + ", And verify otp.",true,200)
        )
    }

    /**
     * Note: Registration Otp Verifier.
     * @param otpObject - userId.
     * @param otpObject - otp.
     * @update userDocument isVerified and refreshToken.
     * @returns UserDocument.
    */
    public HandleRegisterationOtpVerifier = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_VERIFY_REGISTERATION_OTP.safeParse(req.body);
        if(!result.success){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,result?.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        const {otp,userId} = result.data;
        const otpObject:VerifyOtpInterface = {
            otp:otp,
            userId:userId,
            purpose:"REGISTER_ACCOUNT"
        };
        const {tokens,user} = await this.userServices.VerifyRegistrationOtp(otpObject);

        /** Note: Cookies Options. */
        const cookieOptions:CookieOptions = {
            httpOnly:true,
            sameSite:"lax",
            secure:true
        };
        
        return res.status(STATUS_CODES.OK)
        .cookie("accessToken",tokens.accessToken,cookieOptions)
        .cookie("refreshToken",tokens.refreshToken,cookieOptions)
        .json(
            new ApiResponse(user,"User logged in successfully.",true,200)
        )
    }
}

export default new UserControllers;