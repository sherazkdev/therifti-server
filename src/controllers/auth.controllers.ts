import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/** Note: Response Constants. */
import {ERROR_MESSAGES, STATUS_CODES, SUCCESS_MESSAGES} from "../constants/responseConstants.js";

/** Note: imports types */
import type {CookieOptions, NextFunction, Request,Response} from "express";

/** Zod Validaters  */
import {VALIDATE_FORGOT_ACCOUNT_PASSWORD, VALIDATE_LOGIN_USER_ACCOUNT, VALIDATE_REGISTER_USER_ACCOUNT,VALIDATE_RESET_PASSWORD,VALIDATE_VERIFY_FORGOT_ACCOUNT_OTP,VALIDATE_VERIFY_REGISTERATION_OTP} from "../validaters/user.validaters.js";
import type { LogoutUserAccountInterface, RegisterUserAccountMenuallyInterface, resetPasswordWithTokenInterface, UserDocument, VerifyForgotAccountOtpInterface } from "../interfaces/user.interfaces.js";
import type { VerifyOtpInterface } from "../interfaces/otp.interfaces.js";
import {TokenTypes, type CreateTokenInterface} from "../interfaces/token.interfaces.js";

import type UserServices from "../services/user.services.js";
import type AuthServices from "../services/auth.services.js";
import type TokenServices from "../services/token.services.js";
import env from "../constants/loadEnv.js";

class AuthControllers {
    private tokenServices: TokenServices;
    private userServices: UserServices;
    private authServices: AuthServices;

    constructor(tokenServices:TokenServices,userServices:UserServices,authServices:AuthServices){
        this.tokenServices = tokenServices;
        this.userServices = userServices;
        this.authServices = authServices
    }

    /**
     * Note: Register User account.
     * @param req.
     * @param res.
     * @returns userDocument.
    */
    public HandleRegisterUserAccount = async (req:Request,res:Response):Promise<Response> => {
        /** Note: Validate User Details. */
        const result = await VALIDATE_REGISTER_USER_ACCOUNT.safeParse(req.body);
        if(!result.success){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,result?.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        /** Note: Register User Payload. */
        const {email,fullname,password,username,zipCode} = result.data;
        const registerUserPayload:RegisterUserAccountMenuallyInterface = result.data;
        const registerUser = await this.authServices.RegisterUserAccount(registerUserPayload);
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
        const {tokens,user} = await this.authServices.VerifyRegistrationOtp(otpObject);

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

    /**
     * Note: Login user account.
     * @param req.
     * @param res.
     * @returns userDocument.
    */
    public HandleLoginUserAccount = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_LOGIN_USER_ACCOUNT.safeParse(req.body);
        if(!result.success){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,result.error.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        /** Note: verifyUser credinals payload. */
        const verifyUserPayload = result.data;
        const {user,tokens} = await this.authServices.LoginUserAccount(verifyUserPayload);
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

        /**
     * Note: Forgot account password.
     * @param req.
     * @param res.
     * @returns null. 
    */
    public HandleForgotAccountPassword = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_FORGOT_ACCOUNT_PASSWORD.safeParse(req.body);
        if(!result.success){
            throw new ApiError(STATUS_CODES.NOT_FOUND,result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        const {email} = result.data;
        /** Note: Forgot password payload.*/
        const forgotPasswordPayload = {
            email:email
        };
        const sendOtpProccessing = await this.authServices.ForgotAccount(forgotPasswordPayload);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse([],SUCCESS_MESSAGES.USER.OTP_SUCCESSFULLY_SENDED,true,STATUS_CODES.OK)
        )
    };

    /**
     * Note: Verify Forgot account otp.
     * @param req.
     * @param res.
     * @returns null.
    */
    public HandleVerifyForgotAccountOtp = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_VERIFY_FORGOT_ACCOUNT_OTP.safeParse(req.body);
        if(!result.success){
            throw new ApiError(STATUS_CODES.NOT_FOUND,result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        const {email,otp} = result.data;
        /** Note: Verify forgot account otp. */
        const verifyForgotAccountOtpPayload:VerifyForgotAccountOtpInterface = {
            email:email,
            otp:otp
        };
        const {resetToken} = await this.authServices.VerifyForgotAccountOtp(verifyForgotAccountOtpPayload);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse({resetToken},SUCCESS_MESSAGES.USER.OTP_SUCCESSFULLY_SENDED,true,STATUS_CODES.OK)
        )
    };

    /**
     * Note: Change password with resetToken.
     * @param req.
     * @param res.
     * @returns Response. 
    */
    public HandleResetPassword = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_RESET_PASSWORD.safeParse(req.body);
        /** Note: Check if any error in result. */
        if(!result.success){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        /** Note: Reset password payload. */
        const resetPasswordPayload:resetPasswordWithTokenInterface = result.data;

        const resetPasswordService = await this.authServices.resetPasswordWithToken(resetPasswordPayload);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse([],SUCCESS_MESSAGES.USER.UPDATE,true,STATUS_CODES.OK)
        )
    };

    /**
     * Note: Logout user account.
     * @param req.
     * @param res.
     * @returns Response.
    */
    public HandleLogoutUserAccount = async (req:Request,res:Response):Promise<Response> => {
        const refreshToken = req.cookies?.refreshToken;
        /** Note: Logout account payload. */
        const logoutAccountPayload:LogoutUserAccountInterface = {
            refreshToken:refreshToken,
            userId:(req.user as UserDocument)._id.toString()
        };

        const logoutAccount = await this.authServices.LogoutUserAccount(logoutAccountPayload);
        /** Note: clear access and refersh token from cookies */
        /** Note: Cookies Options. */
        const cookieOptions:CookieOptions = {
            httpOnly:true,
            sameSite:"lax",
            secure:true
        };
        
        return res.status(STATUS_CODES.OK)
        .clearCookie("refreshToken",cookieOptions)
        .clearCookie("accessToken",cookieOptions)
        .json(
            new ApiResponse([],SUCCESS_MESSAGES.AUTH.LOGOUT,true,STATUS_CODES.OK)
        )
    };

    /**
     * Note: Google auth callback handler.
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @param {NextFunction} next - Express next middleware function.
     * @returns {Promise<void>}
    */
    public HandleGoogleAuthCallback = async (req:Request,res:Response,next:NextFunction):Promise<void> => {
        const user = await this.userServices.GetUserById((req.user as UserDocument)._id.toString());
        /** Note: Generate AccessToken */
        const {accessToken} = await this.authServices.GenerateRefreshAndAccessToken(user._id.toString());
        /** Create Token Payload */
        const createTokenPayload:CreateTokenInterface = {
            type:TokenTypes.REFRESH,
            userId:user._id.toString()
        };
        const {rawToken} = await this.tokenServices.CreateToken(createTokenPayload);
        /** Note: Cookies Options. */
        const cookieOptions:CookieOptions = {
            httpOnly:true,
            sameSite:"lax",
            secure:true
        };
        /** Remove Password field for the UserDocument. */
        // const userObject = user.toObject();
        // delete userObject.password;

        
        return res.status(STATUS_CODES.OK)
        .cookie("accessToken",accessToken,cookieOptions)
        .cookie("refreshToken",rawToken,cookieOptions)
        .redirect(env.CLIENT_URL);
    };
    
    /**
     * Note: Facebook auth callback handler.
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @param {NextFunction} next - Express next middleware function.
     * @returns {Promise<void>}
    */
    public HandleFacebookAuthCallback = async (req:Request,res:Response,next:NextFunction):Promise<void> => {
        const user = await this.userServices.GetUserById((req.user as UserDocument)._id.toString());
        /** Note: Generate AccessToken */
        const {accessToken} = await this.authServices.GenerateRefreshAndAccessToken(user._id.toString());
        /** Create Token Payload */
        const createTokenPayload:CreateTokenInterface = {
            type:TokenTypes.REFRESH,
            userId:user._id.toString()
        };
        const {rawToken} = await this.tokenServices.CreateToken(createTokenPayload);
        /** Note: Cookies Options. */
        const cookieOptions:CookieOptions = {
            httpOnly:true,
            sameSite:"lax",
            secure:true
        };
        /** Remove Password field for the UserDocument. */
        // const userObject = user.toObject();
        // delete userObject.password;

        
        return res.status(STATUS_CODES.OK)
        .cookie("accessToken",accessToken,cookieOptions)
        .cookie("refreshToken",rawToken,cookieOptions)
        .redirect(env.CLIENT_URL);
    };
    

}

export default AuthControllers;