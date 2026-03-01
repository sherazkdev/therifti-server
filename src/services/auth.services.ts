import UserModel from "../models/user.model.js";
/** Note: UserModel Services */
import ApiError from "../utils/ApiError.js";
/** Response Constants */
import {ERROR_MESSAGES, STATUS_CODES} from "../constants/responseConstants.js";
import bcrypt from "bcrypt";

import type { Profile as GoogleProfile, Profile } from "passport-google-oauth20";
import type { Profile as FacebookProfile } from "passport-facebook";
import type { ForgotResponseInterface, RefreshAndAccessTokenGeneraterInterface, UserDocument } from "../interfaces/user.interfaces.js";

/** Interfaces */
import type {AuthResponseInterface,RegisterUserAccountMenuallyInterface,LoginUserAccountInterface,UserInterface,resetPasswordWithTokenInterface,VerifyForgotAccountOtpInterface,LogoutUserAccountInterface
} from "../interfaces/user.interfaces.js";
import { TokenTypes, type CreateTokenInterface, type FindValidTokenInterface, type VerifyResetTokenInterface } from "../interfaces/token.interfaces.js";
import type {SendOtpInterface, VerifyOtpInterface} from "../interfaces/otp.interfaces.js";

import TokenServices from "./token.services.js";
import UserServices from "./user.services.js";
import OtpServices from "./otp.services.js";
import type { AuthApiResponse } from "../interfaces/auth.interfaces.js";
import mongoose from "mongoose";

class AuthServices {
    private userServices = new UserServices();
    private otpServices = new OtpServices();
    private tokenServices = new TokenServices(); 

    /**
     * Note: Auth Login with google.
     * @param {GoogleProfile} profile - Logged in user profile.
     * @returns {UserDocument}.
    */
    public async LoginWithGoogle(profile:GoogleProfile):Promise<UserDocument> {
        const {name,emails,photos,id} = profile;
        const email = profile.emails && profile.emails[0]?.value;
        let user;
        if(email){
            /** note: Check user is exist. */
            user = await UserModel.findOne({
                $or : [
                    {
                        email:email,
                    },
                    {
                        googleId:id
                    }
                ]
            });

            if(!user){
                const removeNullFileds:Partial<Record<any,any>> = {
                    googleId:id,
                    email:email,
                    avatar:(photos && photos[0]?.value) ? photos[0]?.value : null,
                    fullname:(name?.givenName && name?.familyName) ? name.givenName + " " + name.familyName : null,
                    username: email.split("@")[0],
                    isVerfied:true
                };
                /** Note: Filter User */
                const filterdUser = await this.userServices.RemoveNullAndUndefinedValues(removeNullFileds);
                /** Note: Create new account */
                user = await UserModel.create(filterdUser);
            }else if(!user.googleId){   
                /** Assign the google auth id user Document id. */
                user.googleId = id;
                await user.save();
            }
        }else {
            throw new ApiError(STATUS_CODES.BAD_REQUEST,ERROR_MESSAGES.AUTH.OAUTH_EMAIL_NOT_PROVIDED)
        }
        return user;
    };
    
    /**
     * Note: Auth Login with facebook.
     * @param {FacebookProfile} profile - Logged in user profile.
     * @returns {UserDocument}.
    */
    public async LoginWithFacebook(profile:FacebookProfile):Promise<UserDocument> {
        const {birthday,name,photos,emails,id,gender,} = profile;
        /** Note: Check User exist using facebookId. */
        let user = await UserModel.findOne({
            facebookeId:id
        });
        if(!user){
            let emailsSafe = emails || [];
            let photosSafe = photos || [];

            /** Note: this object creating for remove a nulleble fields. */
            const removeNullFields:Partial<Record<any,any>> = {
                email:emailsSafe[0]?.value ?? null,
                facebookId:id,
                avatar:photosSafe[0]?.value ?? null,
                dob:birthday ? new Date(birthday) : null,
                fullname:(name?.givenName && name?.givenName) ? `${name?.givenName} ${name?.familyName}` : null,
                username:emailsSafe[0]?.value?.split("@")[0] ?? null,
                gender:gender ?? null,
                isVerfied:true
            };
            /** Note: Removinf nulleble fields. */
            const filterdUser = await this.userServices.RemoveNullAndUndefinedValues(removeNullFields);
            /** Note: Create Document in Mongodb */
            user = await UserModel.create(filterdUser);
        }
        return user;
    }

    /**
     * Note: Register User account.
     * @param userObject - required fields is email, password, zipCode is optionl, userName, 
     * @throw if emails exist.
    */
    public async RegisterUserAccount(userObject:RegisterUserAccountMenuallyInterface):Promise<AuthApiResponse> {
        const {email, fullname, password, username, zipCode} = userObject;
        const checkUserAccountEmailExist = await UserModel.findOne({
            $or : [
                {email:email},
                {username:username}
            ]
        });
        if(checkUserAccountEmailExist?.email === email){
            if(checkUserAccountEmailExist.isVerfied === true){
                throw new ApiError(STATUS_CODES.UNAUTHORIZED,ERROR_MESSAGES.AUTH.EMAIL_EXISTS);
            }
            /** Note: if user is not verified send otp. */
            const sendOtpPayload:SendOtpInterface = {
                purpose:"REGISTER_ACCOUNT",
                email:email,
                userId:checkUserAccountEmailExist._id.toString()
            } 
            const sendOtpForRegistration = await this.otpServices.SendOtp(sendOtpPayload);
            /** Send response */
            const apiResponseObj = {
                userId:checkUserAccountEmailExist._id.toString()
            };
            return apiResponseObj;
        } if(checkUserAccountEmailExist?.username === username){
            throw new ApiError(STATUS_CODES.UNAUTHORIZED,ERROR_MESSAGES.AUTH.USERNAME_EXISTS)
        }
        /** Note: end otp hashing section. */
        const UserDocument:UserInterface = {
            email:email,
            fullname:fullname,
            password:password,
            username:username,
            isVerfied:false
        };

        const created_user = await UserModel.create(UserDocument);
        /** Note: Generate new otp for email verification. */
        const sendOtpPayload:SendOtpInterface = {
            purpose:"REGISTER_ACCOUNT",
            email:email,
            userId:created_user._id.toString()
        };
        const sendOtpForRegistration = await this.otpServices.SendOtp(sendOtpPayload);        
        
        /** Send response */
        const apiResponseObj = {
            userId:created_user._id.toString()
        };

        return apiResponseObj;
    }

    /**
     * Note: Sended verification otp verifier.
     * @param otpObject - userId.
     * @param otpObject - otp.
     * @update userDocument update isVerified status.
     * @returns Boolean. 
    */
    public async VerifyRegistrationOtp(otpObject:VerifyOtpInterface):Promise<AuthResponseInterface> {
        const {userId} = otpObject;
        /** Verify Registration Otp */
        const verifyOtp:Boolean = await this.otpServices.VerifyOtp(otpObject);
        const user = await this.userServices.GetUserById(userId);
    
        /** Note: Generate access and refresh token. */
        const {accessToken} = await this.GenerateRefreshAndAccessToken(userId);
        
        /** Note: Update user document and asign the refreshToken etc.*/
        /** Note: Create a token for a refreshToken etc.*/
        const createTokenPayload:CreateTokenInterface = {
            type:TokenTypes.REFRESH,
            userId:user._id.toString()
        }
        const {rawToken} = await this.tokenServices.CreateToken(createTokenPayload);

        const returnedUser = user.toObject();
        delete returnedUser.password;

        return {
            user:returnedUser,
            tokens:{
                accessToken:accessToken,
                refreshToken:rawToken
            }
        };
    }

    /**
     * Note: Login user with email and password
     * @param userObject - email and password is required fields.
     * @check email is exit.
     * @update userDocument refreshToken and lastSeen.
     * @returns access and refresh token. 
    */
    public async LoginUserAccount(userObject:LoginUserAccountInterface):Promise<AuthResponseInterface> {
        const {email, password} = userObject;
        const user = await UserModel.findOne({email:email,isVerfied:true});
        if(!user){
            throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.AUTH.EMAIL_NOT_FOUND);
        }
        /** Match Password. */
        if(!user.password){
            throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
        }
        const hashed_password = user.password;
        /** Note: Compare normal password to hashpassword. */
        const compare_password = await bcrypt.compare(password,hashed_password);
        if(!compare_password){
            throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
        }
        /** Note: Generate access and refresh token. */
        const {accessToken} = await this.GenerateRefreshAndAccessToken(user._id.toString());
        /** Note: Create a token for a refreshToken etc.*/
        const createTokenPayload:CreateTokenInterface = {
            type:TokenTypes.REFRESH,
            userId:user._id.toString()
        }
        const {rawToken} = await this.tokenServices.CreateToken(createTokenPayload);
        const returnedUser = user.toObject();
        delete returnedUser.password;

        return {
            user:returnedUser,
            tokens:{
                refreshToken:rawToken,
                accessToken
            }
        };
    }

    /**
     * Note: Verify Forgot account otp.
     * @param otpObject - email.
     * @param otpObject - otp.
     * @returns null.
    */
    public async VerifyForgotAccountOtp(otpObject:VerifyForgotAccountOtpInterface):Promise<{resetToken:string}> {
        const {userId,otp} = otpObject;
        const user = await UserModel.findById(new mongoose.Types.ObjectId(userId));
        /** Note: Check email is exist. */
        if(!user){
            throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.USER.NOT_FOUND);
        }
        /** Note: otp verify payload. */
        const OtpVerifyPayload:VerifyOtpInterface = {
            otp:otp,
            purpose:"FORGOT_ACCOUNT",
            userId: user._id.toString()
        };
        const {} = await this.otpServices.VerifyOtp(OtpVerifyPayload);
        /** Note: Create Reset token. for non authenticated. */
        const resetTokenPayload:CreateTokenInterface = {
            type:TokenTypes.RESET_PASSWORD,
            userId:user._id.toString(),
        };
        const { rawToken } = await this.tokenServices.CreateToken(resetTokenPayload);

        return { resetToken:rawToken };
    }
    
    /**
     * Note: Reset password with resetToken based verification is only for un authencticated. 
     * @param resetObject - resetToken.
     * @param resetObject - email.
     * @update userDocument - password.
     * @return null.
    */
    public async resetPasswordWithToken(resetObject:resetPasswordWithTokenInterface):Promise<void> {
        const {userId,resetToken,password} = resetObject;
        /** Note: Check user exist. */
        const user = await UserModel.findById(new mongoose.Types.ObjectId(userId));
        if(!user){
            throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.USER.NOT_FOUND);
        }
        /** Note: verify reset token now. */
        const verifyResetTokenPayload:VerifyResetTokenInterface = {
            rawToken:resetToken,
            type:TokenTypes.RESET_PASSWORD,
            userId:user._id.toString()
        };
        const tokenVerification = await this.tokenServices.VerifyResetToken(verifyResetTokenPayload);
        /** Note: after reset token verification assign the user document password to password and automatecly saved in db hashed password. */
        user.password = password;
        await user.save();
        return;
    };


    /**
     * Logs out the user by removing the refresh token from their account.
     *
     * @param {string} userId - Unique identifier of the user.
     * @param {string} refreshToken - The refresh token to be invalidated.
     * @returns {Promise<Boolean>} - Resolves when the token has been removed.
     * @throws {ApiError} If the user is not found or token removal fails.
     * @note Delete the user's `refreshToken` in the database.
    */
    public async LogoutUserAccount(userObject:LogoutUserAccountInterface):Promise<Boolean> {
        const {userId,refreshToken} = userObject;
        const user = await this.userServices.GetUserById(userId);
        /** Note: Delete RefreshToken */
        const findRefreshTokenPayload:FindValidTokenInterface = {
            token:refreshToken,
            type:TokenTypes.REFRESH,
            userId:userId
        } 
        const token = await this.tokenServices.FindValidToken(findRefreshTokenPayload);
        await token.deleteOne();
        return true;
    }


    /**
     * Note: Forgot account and send otp.
     * 
     * @param {string} email - Unique identifier of the user.
     * @returns {Promise<void>} send otp on email.
     * @throws {ApiError} If the user is not found.
     * 
     * @note Sended otp on user email and otp hashed save in database.
    */
    public async ForgotAccount(forgotAccoutDetails:{email:string}):Promise<ForgotResponseInterface> {
        const {email} = forgotAccoutDetails;
        const user = await UserModel.findOne({email:email,isVerfied:true});
        if(!user){
            throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.USER.NOT_FOUND);
        }
        /** Note: if account is exist generate a new otp and with email. */
        /** Note: Send otp on email using with nodemailer */
        const sendOtpPayload:SendOtpInterface = {
            userId:user._id.toString(),
            purpose:"FORGOT_ACCOUNT",
            email:email
        }
        const sendOtp = await this.otpServices.SendOtp(sendOtpPayload);
        return {userId:user._id.toString()};
    }

    /**
     * Note: Generates a new access token for the given user.
     * @param {string} userId - Unique identifier of the user.
     * @returns {Promise<RefreshAndAccessTokenGeneraterInterface>} 
     * An object containing the generated access token.
     *
     * @throws {ApiError} If the user is not found.
    */
    public async GenerateRefreshAndAccessToken(userId:string):Promise<RefreshAndAccessTokenGeneraterInterface> {
        const user = await this.userServices.GetUserById(userId);
        const accessToken = await user.GenerateAccessToken();

        return {accessToken};
    }
};

export default AuthServices;