import UserModel from "../models/user.model.js";
/** Note: UserModel Services */
import ApiError from "../utils/ApiError.js";
/** Response Constants */
import {ERROR_MESSAGES, STATUS_CODES} from "../constants/responseConstants.js";
import {UserStatusEnum, type AuthResponseInterface, type ChangeAccountEmailInterface, type ChangeAccountEmailVerifyOtpInterface, type ChangeAccountPasswordInterface, type GetUserProfileInterface, type LoginUserAccountInterface, type RefreshAndAccessTokenGeneraterInterface, type RegisterUserAccountMenuallyInterface, type UpdateUserPasswordInterface, type UpdateUserProfileInterface, type UserDocument, type UserInterface, type VeriftUpdateEmailOtpInterface, type VerifyForgotAccountOtpInterface } from "../interfaces/user.interfaces.js";
import mongoose from "mongoose";
import bcrypt, { genSalt } from "bcrypt";
import Mailer from "../configs/nodemailer/mailer.js";
import ProductModel from "../models/product.model.js";
import OtpServices from "./otp.services.js";
import type { SendOtpInterface, VerifyOtpInterface } from "../interfaces/otp.interfaces.js";
import { object } from "zod";

/**
 * Note: Service Methods.
 * 01: GetUserById
 * 02: UpdateUserProfileById
 * 03: UpdateUserAccountPassword
 * 04: RegisterUserAccountAndSendOtp
 * 05: GenerateOtp
 * 06: GenerateRefreshAndAccessToken
 * 07: VerifyOtp
 * 08: LoginUserAccount
 * 09: ForgotAccount
 * 10: ChangeAccountPassword
 * 11: ChangeAccountEmail
 * 12: ChangeAccountEmailVerifyOtp
 * 13: GetUserAccountProfile
 * 14: GetUserOrders
 * 15: DeactivateUserAccount
 * 16: ActivateUserAccount
 * 17: LogoutUserAccount
 * 18: ForgotAccountVerifyOtp
 * 19: GetUserReviews
 * 
*/

class UserServices {
    private otpServices = new OtpServices();

    /**
     * Note: Retrieves user details by user ID.
     * @param  userId - ObjectId.
     * @returns User Object.
     * @throw if not exist user throw error. 
    */
    public async GetUserById(userId:string):Promise<UserDocument> {
        const user = await UserModel.findById(new mongoose.Types.ObjectId(userId));
        if(!user){
            throw new ApiError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
        }
        return user;
    }
    
    /**
     * Note: Update user details by userId .
     * @param userObject - User object containing the required userId and updated fields.
     * @update  User object.
     * @returns The updated user object.
    */
    public async UpdateUserProfileById(userId:string, userObject:UpdateUserProfileInterface):Promise<UserDocument> {
        const {} = userObject;
        const updateUserProfile = await UserModel.findByIdAndUpdate(new mongoose.Types.ObjectId(userId), userObject,{new:true});
        if(!updateUserProfile){
            throw new ApiError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
        }
        return updateUserProfile;
    }

    /**
     * Note: Update user account password.
     * @param userObject - User object containing the required userId and password and updated fields.
     * @update only updating password.
     * @returns NULL
    */
    public async UpdateUserAccountPassword(userObject:UpdateUserPasswordInterface):Promise<void> {
        const {password, userId} = userObject;
        const user = await this.GetUserById(userId);
        user.password = password;
        await user.save();
        return;
    }

    /**
     * Note: Register User account.
     * @param userObject - required fields is email, password, zipCode is optionl, userName, 
     * @throw if emails exist.
    */
    public async RegisterUserAccount(userObject:RegisterUserAccountMenuallyInterface):Promise<UserDocument> {
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
            return checkUserAccountEmailExist;
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
        return created_user;
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
        const user = await this.GetUserById(userId);
    
        /** Note: Generate access and refresh token. */
        const {accessToken,refreshToken} = await this.GenerateRefreshAndAccessToken(userId);
        
        /** Note: Update user document and asign the refreshToken etc.*/
        user.refreshToken = refreshToken;
        user.lastSeen = new Date();
        user.isVerfied = true;
        console.log(user)
        await user.save();

        user.toObject();
        delete user.password;
        delete user.refreshToken;

        return {
            user:user,
            tokens:{
                accessToken:accessToken,
                refreshToken:refreshToken
            }
        };
    }

    /**
     * Note: Account access and refresh token generater.
     * @param userDocument - with Document.
     * @update userDocument.refreshToken.
     * @returns access_token and refresh_token. 
    */
    protected async GenerateRefreshAndAccessToken(userId:string):Promise<RefreshAndAccessTokenGeneraterInterface> {
        const user = await this.GetUserById(userId);
        const accessToken = await user.GenerateAccessToken();
        const refreshToken = await user.GenerateRefreshToken();
        /** Note: asign the user.refreshToken to refrshtoken and return access and refresh */
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:false});
        return {accessToken,refreshToken};
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
        const {accessToken,refreshToken} = await this.GenerateRefreshAndAccessToken(user._id.toString());
        /** Note: Update user document and asign the refreshToken etc.*/
        user.refreshToken = refreshToken;
        user.lastSeen = new Date();
        await user.save();
        user.toObject();
        delete user.password;
        delete user.refreshToken;

        return {
            user,
            tokens:{
                refreshToken,
                accessToken
            }
        };
    }

    /**
     * Note: Forgot account password
     * @param forgotAccoutDetails - email is hardly required.
     * @check email is exist.
     * @update user document otp and otp expiry.
     * @returns NULL.
    */
    public async ForgotAccountPassword(forgotAccoutDetails:{email:string}):Promise<void> {
        const {email} = forgotAccoutDetails;
        const user = await UserModel.findOne({email:email,isVerifed:true});
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
        return;
    }

    /**
     * Note: Change Account Password.
     * @param accountDetails - userId and password
     * @check email is exist.
     * @update userDocument update password and lastlogin info.
     * @returns NULL. 
    */
    public async ChangeAccountPassword(accountDetails:ChangeAccountPasswordInterface):Promise<void> {
        const {password,userId} = accountDetails;
        const user = await this.GetUserById(userId);
        /** Note: hash normal password */
        const salt_rounds = 10;
        const get_salt = await bcrypt.genSalt(salt_rounds);
        const hash_password = await bcrypt.hash(password,get_salt);
        /** Note: Assign the userDocument pasword to hashed_password. */
        user.password = hash_password;
        await user.save();
        return;
    }

    /**
     * Note: Change account primary email.
     * @param userObject - userId and email is required.
     * @check email is exist.
     * @update userDocument otp and send otp on email.
     * @returns userDocument.
    */
    public async ChangeAccountEmail(userObject:ChangeAccountEmailInterface):Promise<boolean> {
        const {email,userId} = userObject;
        const user = await this.GetUserById(userId);
        /** Note: if user is not verified send otp. */
        const sendOtpPayload:SendOtpInterface = {
            purpose:"CHANGE_EMAIL",
            email:email,
            userId:userId
        } 
        const sendOtpForRegistration = await this.otpServices.SendOtp(sendOtpPayload);
        return true;
    }

    /**
     * Note: Verify Update email otp.
     * @param userObject - otp.
     * @param userObject - email.
     * @param userObject - userId.
     * @update Document email.
     * @return new Document.
    */
    public async VerifyOtpAndChangeEmail(userObject:VeriftUpdateEmailOtpInterface):Promise<UserDocument> {
        const {email,otp,userId} = userObject;
        const user = await this.GetUserById(userId);
        /** Note: Verify Otp Payload. */
        const verifyOtpPayload:VerifyOtpInterface = {
            otp:otp,
            purpose:"CHANGE_EMAIL",
            userId:userId
        }
        const otpVerificationProccess = await this.otpServices.VerifyOtp(verifyOtpPayload);
        /** If Successfully Verify otp. */
        user.email = email;
        await user.save();
        /** Delete Refresh and password from user document */
        user.toObject();
        delete user.password;
        delete user.refreshToken;
        return user;
    }

    /**
     * Note: Get User Profile with products and followers following list.
     * @param userObject - userId, page, limit.
     * @throw if user not found throw error.
     * @returns userProfileObject.
    */
    public async GetUserAccountProfile(userObject:GetUserProfileInterface):Promise<object> {
        const {userId, limit, page,sort,categoryId} = userObject;
        /** Note: Product Sorting. */
        let productSort:Record<string, -1 | 1> = {createdAt: -1};
        if(sort === "NEWEST_FIRST") productSort = {createdAt: -1};
        if(sort === "PRICE_HIGH_TO_LOW") productSort = {price: -1};
        if(sort === "PRICE_LOW_TO_HIGH") productSort = {price: 1};
        if(sort === "RELEVANCE") productSort = {createdAt: -1};
        /** Note: Pagination and limits. */
        const limitNumber = limit || 10;
        const pageNumber = page || 1;
        
        const skip = (pageNumber - 1) * limitNumber;
        let productQuery:any = {
            $expr : {
                $eq : ["$owner","$$owner"]
            }
        };
        if(categoryId){
            productQuery.$expr = {
                $and : [
                    {$eq : ["$owner","$$owner"]},
                    {$eq : ["$categoryId",new mongoose.Types.ObjectId(categoryId)]}
                ]
            }
        }

        /** Note: Getting user profile using aggregate piplines */
        const userDetails = await UserModel.aggregate([
            {
                $match : {
                    $expr : {
                        $eq : ["$_id", new mongoose.Types.ObjectId(userId)]
                    }
                }
            },
            {
                $lookup : {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "targetUserId",
                    as: "reviews"
                }
            },
            {
                $lookup : {
                    from: "follows",
                    localField: "_id",
                    foreignField: "followerId",
                    as: "following"
                }
            },
            {
                $lookup : {
                    from: "follows",
                    localField: "_id",
                    foreignField: "followingId",
                    as: "followers"
                }
            },
            {
                $lookup : {
                    from: "products",
                    let:{ower:"$_id"},
                    pipeline:[
                        {
                            $match : productQuery
                        },
                        {
                            $sort : productSort
                        },
                        {
                            $limit : limitNumber
                        },
                        {
                            $skip : skip
                        }
                    ],
                    as:"products"
                }
            },
            {
                $addFields : {
                    totalReviewsCount : {
                        $size : "$reviews"
                    },
                    totalProductsCount : {
                        $size : "$products"
                    },
                    totalFollowersCount : {
                        $size : "$followers"
                    },
                    totalFollowingsCount : {
                        $size : "$followings"
                    }
                }
            },
            {
                $project : {
                    username:1,
                    totalReviewsCount:1,
                    totalProductsCount:1,
                    totalFollowersCount:1,
                    totalFollowingsCount:1,
                    location:1,
                    lastSeen:1,
                    avatar:1,
                    fullname:1,
                    _id:1,
                    products:1,
                }
            }
        ]);
        return userDetails[0];
    }

    /**
     * Note: Get User Reviews.
     * @param userObject - userId
     * @throw if user not found throw error.
     * @returns reviewsObject
    */
    public async GetUserReviews(userObject:{userId:string}):Promise<Object> {
        const {userId} = userObject;
        /** Note: GetUserReviews and return. */
        const userReviews = await UserModel.aggregate([
            {
                $match : {
                    $expr : {
                        $eq : ["$targetUserId", new mongoose.Types.ObjectId(userId)]
                    }       
                }
            },
            {
                $lookup : {
                    from : "users",
                    localField : "reviewerId",
                    foreignField : "_id",
                    as : "reviewer"
                }
            },
            {
                $unwind : "$reviewer"
            },
            {
                $project : {
                    _id:1,
                    "reviewer._id":1,
                    "reviewer.fullname":1,
                    "reviewer.avatar":1,
                    "reviewer.isVerifed":1,
                    rate:1,
                    review:1,
                    type:1,
                    status:1
                }
            }
        ]);

        return userReviews[0]
    }

    /**
     * Note: ChangeAccountEmailVerifyOtp.
     * @param userObject - otp and userId is full required.
     * @update userDocument update user primary email.
     * @return updated userDocument.
    */
    public async ChangeAccountEmailVerifyOtp(userObject:ChangeAccountEmailVerifyOtpInterface):Promise<void> {

    }

    /**
     * Note: Logout User Account Remove access and refreshToken.
     * @param userObject - userId.
     * @update userDocument refreshToken.
     * @return null. 
    */
    public async LogoutUserAccount(userObject:{userId:string}):Promise<void> {
        const {userId} = userObject;
        const user = await this.GetUserById(userId);
        /** Note: Assign the user object refreshToken is null. */
        user.refreshToken = null;
        user.lastSeen = new Date();
        await user.save({validateBeforeSave:false});
    }

    /**
     * Note: Deactivate user account.
     * @param userObject - userId
     * @update userDocument status.
     * @return null.
    */
    public async DeactivateUserAccount(userObject:{userId:string}):Promise<void> {
        const {userId} = userObject;
        const user = await this.GetUserById(userId);
        /** Note: First of all currently user products is live, if live do not deactivate account. */
        const check_user_products_exist = await ProductModel.find({
            owner: new mongoose.Types.ObjectId(userId)
        });
        if(check_user_products_exist.length > 0){
            throw new ApiError(STATUS_CODES.METHOD_NOT_ALLOWED,ERROR_MESSAGES.USER.ACCOUNT_DEACTIVATE_LIVE_PRODUCTS);
        }
        /** Note: Deactive UserAccount Status now. */
        user.status = UserStatusEnum.DEACTIVATE;
        user.lastSeen = new Date();
        await user.save();
        return;
    }

    /**
     * Note: Activate user account.
     * @param userObject - userId
     * @update userDocument status.
     * @return null.
    */
    public async ActivateUserAccount(userObject:{userId:string}):Promise<void> {
        const {userId} = userObject;
        const user = await this.GetUserById(userId);
        /** Note: Active UserAccount Status now. */
        user.status = UserStatusEnum.ACTIVATED;
        user.lastSeen = new Date();
        await user.save();
        return;
    }

    /**
     * Note: Verify Forgot account otp.
    */
    public async VerifyForgotAccountOtp(otpObject:VerifyForgotAccountOtpInterface):Promise<void> {
        const {email,otp} = otpObject;
        const user = await UserModel.findOne({
            email: email
        });
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
        const verifyOtp = await this.otpServices.VerifyOtp(OtpVerifyPayload);

        return;
    }
}

export default UserServices;
