import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/** Note: Response Constants. */
import {STATUS_CODES, SUCCESS_MESSAGES} from "../constants/responseConstants.js";

/** Note: imports types */
import type {CookieOptions, NextFunction, Request,Response} from "express";

/** Zod Validaters  */
import {VALIDATE_FORGOT_ACCOUNT_PASSWORD, VALIDATE_LOGIN_USER_ACCOUNT, VALIDATE_REGISTER_USER_ACCOUNT,VALIDATE_RESET_PASSWORD,VALIDATE_VERIFY_FORGOT_ACCOUNT_OTP,VALIDATE_VERIFY_REGISTERATION_OTP,VALIDATE_REFRESH_ACCESSTOKEN} from "../validaters/user.validaters.js";
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
        const result = VALIDATE_REGISTER_USER_ACCOUNT.parse(req.body);

        /** Note: Register User Payload. */
        const {email,fullname,password,username,postalCode} = result;
        const registerUserPayload:RegisterUserAccountMenuallyInterface = result;
        const registerdUser = await this.authServices.RegisterUserAccount(registerUserPayload);
        return res.status(200).json(
            new ApiResponse(registerdUser,SUCCESS_MESSAGES.AUTH.REGISTER + ", And verify otp.",true,200)
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
        const result = VALIDATE_VERIFY_REGISTERATION_OTP.parse(req.body);

        const {otp,userId} = result;
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
        console.log(user,tokens);
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
        const result = VALIDATE_LOGIN_USER_ACCOUNT.parse(req.body);

        /** Note: verifyUser credinals payload. */
        const verifyUserPayload = result;
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
        const result = VALIDATE_FORGOT_ACCOUNT_PASSWORD.parse(req.body);

        const {email} = result;
        /** Note: Forgot password payload.*/
        const forgotPasswordPayload = {
            email:email
        };
        const userDocumentId = await this.authServices.ForgotAccount(forgotPasswordPayload);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(userDocumentId,SUCCESS_MESSAGES.USER.OTP_SUCCESSFULLY_SENDED,true,STATUS_CODES.OK)
        )
    };

    /**
     * Note: Verify Forgot account otp.
     * @param req.
     * @param res.
     * @returns null.
    */
    public HandleVerifyForgotAccountOtp = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_VERIFY_FORGOT_ACCOUNT_OTP.parse(req.body);

        const {userId,otp} = result;
        /** Note: Verify forgot account otp. */
        const verifyForgotAccountOtpPayload:VerifyForgotAccountOtpInterface = {
            userId:userId,
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
        const result = VALIDATE_RESET_PASSWORD.parse(req.body);
        /** Note: Reset password payload. */
        const resetPasswordPayload:resetPasswordWithTokenInterface = result;

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
            type:TokenTypes.REFRESH_TOKEN,
            userId:user._id.toString(),
            platform:null
        };
        const {token} = await this.tokenServices.CreateToken(createTokenPayload);
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
        .cookie("refreshToken",token,cookieOptions)
        .redirect(`${env.CLIENT_URL}/login?accessToken=${accessToken}&refreshToken=${token}&provider=GOOGLE`);
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
            type:TokenTypes.REFRESH_TOKEN,
            userId:user._id.toString(),
            platform:null
        };
        const {token} = await this.tokenServices.CreateToken(createTokenPayload);
        /** Note: Cookies Options. */
        const cookieOptions:CookieOptions = {
            httpOnly:true,
            sameSite:"lax",
            secure:true
        };
        
        return res.status(STATUS_CODES.OK)
        .cookie("accessToken",accessToken,cookieOptions)
        .cookie("refreshToken",token,cookieOptions)
        .redirect(`${env.CLIENT_URL}/login?accessToken=${accessToken}&refreshToken=${token}&provider=FACEBOOK`);
    };
    
    /**
     * Note: Handle Get Current LoggedIn User. 
     * 
     * This service using for get logged in user Document using auth middleware.
     * and return userDocument with a client.
     * 
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * 
     * @returns {Promise<Response>} - LoggedIn userdocument.
    */
    public HandleGetCurrentLoggedInUser = async (req:Request,res:Response):Promise<Response> => {
        const userDocument = await this.authServices.GetLoggedInUser((req.user as UserDocument)._id.toString());
        return res.status(STATUS_CODES.OK).json(new ApiResponse(userDocument,SUCCESS_MESSAGES.USER.FETCH,true,STATUS_CODES.OK));
    }

    public HandleRefreshAccessToken = async (req:Request,res:Response):Promise<Response> => {
        console.log(req.body,req.headers.referer)
        const result = VALIDATE_REFRESH_ACCESSTOKEN.parse(req.body)
        /** Note: Refresh Token Payload */
        const refreshTokenPayload = result.refreshToken;
        const {accessToken,refreshToken} = await this.authServices.RefreshAccessToken(refreshTokenPayload);

        /** Note: Cookies Options. */
        const cookieOptions:CookieOptions = {
            httpOnly:true,
            sameSite:"lax",
            secure:true
        };
        
        return res.status(STATUS_CODES.OK)
        .cookie("accessToken",accessToken,cookieOptions)
        .cookie("refreshToken",refreshToken,cookieOptions)
        .json(new ApiResponse({refreshToken,accessToken},SUCCESS_MESSAGES.AUTH.TOKEN_REFRESH,true,STATUS_CODES.OK));
    };

}

export default AuthControllers;