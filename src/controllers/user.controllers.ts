import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/** Note: Response Constants. */
import {ERROR_MESSAGES, STATUS_CODES, SUCCESS_MESSAGES} from "../constants/responseConstants.js";
/** Note: imported UserServices. */
import UserServices from "../services/user.services.js";
/** Note: imports types */
import type {Request,Response} from "express";
/** Note: Validate Handler using zod. */
import {VALIDATE_FORGOT_PASSWORD, VALIDATE_GET_USER_PROFILE} from "../validaters/user.validaters.js";
import { OTP_PURPOSE } from "../interfaces/user.interfaces.js";

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
    private userServices:UserServices;

    /** Note: Super call is must. */
    constructor(){
        this.userServices = new UserServices();
    }

    /**
     * Note: HandleGetUserProfile to get all details by userId.
     * @param Request - userId.
     * @param Response.
     * @returns userProfileDocument. 
    */
    public async HandleGetUserProfile(req:Request,res:Response):Promise<Response> {
        const result = VALIDATE_GET_USER_PROFILE.safeParse(req.query);
        /** Note: Check Successfully Handler getted data is valid. */
        if(!result.success){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,result?.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        /** Note: Create a payload for get profile.*/
        const user_payload = result.data;
        const profile = await this.userServices.GetUserAccountProfile(user_payload);
        /** Note: Send Response Object */
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(profile,SUCCESS_MESSAGES.USER.FETCH,true,STATUS_CODES.OK)
        )
    }

    /**
     * Note: HandleGetCurrentUser logged in user details.
     * @param Request - userObject.
     * @param Response.
     * @returns loggedInUserObject
    */
    public async HandleGetCurrentUser(req:Request,res:Response):Promise<Response> {
        const user = req.user;
        /** Note: Return userObject */
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(user,SUCCESS_MESSAGES.USER.FETCH,true,STATUS_CODES.OK)
        )
    }

    /**
     * Note: HandleForgotPassword. 
     * @param Request - userObject.
     * @param Response.
     * @returns null.
    */
    public async HandleForgotPassword(req:Request,res:Response):Promise<Response> {
        /** Note: Validate Forgot account details. */
        const result = VALIDATE_FORGOT_PASSWORD.safeParse(req.body);
        /** Note: Check Successfully Handler getted data is valid. */
        if(!result.success){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,result?.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        /** Note: UserId or email is required only one. */
        if(!result.data.email || !result.data.userId){
            throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.USER.USERID_OR_EMAIL_IS_REQUIRED);
        }else if(!Object.values(OTP_PURPOSE).includes(result.data.purpose)){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,ERROR_MESSAGES.COMMON.FORBIDDEN)
        }
        const forgotPasswordPayload = result.data;
        const otpRespose = await this.userServices.SendOtp(forgotPasswordPayload);
    }
}
