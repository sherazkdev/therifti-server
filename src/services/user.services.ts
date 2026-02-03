import UserModel from "../models/user.model.js";
/** Note: UserModel Services */
import ApiError from "../utils/ApiError.js";
/** Response Constants */
import {ERROR_MESSAGES, STATUS_CODES} from "../constants/responseConstants.js";
import {UserStatusEnum, type AuthResponseInterface, type ChangeAccountEmailInterface, type ChangeAccountEmailResponseInterface, type ChangeAccountEmailVerifyOtpInterface, type ChangeAccountPasswordInterface, type GetUserProfileInterface, type LoginUserAccountInterface, type RefreshAndAccessTokenGeneraterInterface, type RegisterUserAccountMenuallyInterface, type UpdateUserPasswordInterface, type UpdateUserProfileInterface, type UserDocument, type UserInterface, type VerifyUpdateEmailOtpInterface, type VerifyForgotAccountOtpInterface, type resetPasswordWithTokenInterface, type LogoutUserAccountInterface } from "../interfaces/user.interfaces.js";
import mongoose from "mongoose";
import bcrypt, { genSalt } from "bcrypt";
import ProductModel from "../models/product.model.js";
import OtpServices from "./otp.services.js";
import type { SendOtpInterface, VerifyOtpInterface } from "../interfaces/otp.interfaces.js";
import TokenServices from "./token.services.js";
import { TokenTypes, type CreateTokenInterface, type FindValidTokenInterface, type VerifyResetTokenInterface } from "../interfaces/token.interfaces.js";
import type { Profile as GoogleProfile } from "passport-google-oauth20";
import type { Profile as FacebookProfile } from "passport-facebook";
import { nullable } from "zod";

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
    private tokenServices = new TokenServices();

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
        /** Note: Filtered Product Data. */
        const filteredProduct = await this.RemoveNullAndUndefinedValues(userObject);
        console.log(filteredProduct,userObject)
        const updateUserProfile = await UserModel.findByIdAndUpdate(new mongoose.Types.ObjectId(userId), {$set:filteredProduct},{new:true}).select("-password");
        if(!updateUserProfile){
            throw new ApiError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
        }
        /** Note: Remove Password and refreshToken. */
        return updateUserProfile;
    }

    /**
     * Note: Remove undifind and null values from object
     * @param object
     * @return object 
    */
    public RemoveNullAndUndefinedValues<T extends Record<string, any>>(object:T):Partial<T> {
        return Object.fromEntries(
            Object.entries(object).filter( (_y,item) => item !== undefined && item !== null )
        ) as Partial<T>
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
     * Note: Account access and refresh token generater.
     * @param userDocument - with Document.
     * @update userDocument.refreshToken.
     * @returns access_token and refresh_token. 
    */
    protected async GenerateRefreshAndAccessToken(userId:string):Promise<RefreshAndAccessTokenGeneraterInterface> {
        const user = await this.GetUserById(userId);
        const accessToken = await user.GenerateAccessToken();

        return {accessToken};
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
     * Note: Forgot account password
     * @param forgotAccoutDetails - email is hardly required.
     * @check email is exist.
     * @update user document otp and otp expiry.
     * @returns NULL.
    */
    public async ForgotAccountPassword(forgotAccoutDetails:{email:string}):Promise<void> {
        const {email} = forgotAccoutDetails;
        console.log(forgotAccoutDetails)
        const user = await UserModel.findOne({email:email,isVerfied:true});
        console.log(user);
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
    public async ChangeAccountEmail(userObject:ChangeAccountEmailInterface):Promise<ChangeAccountEmailResponseInterface> {
        const {email,userId} = userObject;
        /**
         * Note: Check Email is already exist in anoterher
         * is exist throw error. 
        */
        const checking_email_is_already_exist = await UserModel.findOne({
            email:email
        });
        if(checking_email_is_already_exist){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,ERROR_MESSAGES.AUTH.EMAIL_EXISTS);
        }
        const user = await this.GetUserById(userId);
        /** Note: if user is not verified send otp. */
        const sendOtpPayload:SendOtpInterface = {
            purpose:"CHANGE_EMAIL",
            email:email,
            userId:userId
        } 
        const sendOtpForRegistration = await this.otpServices.SendOtp(sendOtpPayload);
        /** Note: Create Reset token. */
        const resetTokenPayload:CreateTokenInterface = {
            type:TokenTypes.EMAIL_VERIFY,
            userId:userId
        };
        const { rawToken } = await this.tokenServices.CreateToken(resetTokenPayload);
        return { 
            resetToken: rawToken
        };
    }

    /**
     * Note: Verify Update email otp.
     * @param userObject - otp.
     * @param userObject - email.
     * @param userObject - userId.
     * @update Document email.
     * @return new Document.
    */
    public async VerifyOtpAndChangeEmail(userObject:VerifyUpdateEmailOtpInterface):Promise<object> {
        const {email,otp,userId,resetToken} = userObject;
        const user = await this.GetUserById(userId);
        /** Note: Before otp verify check resetToken is valid */
        const resetTokenPayload:VerifyResetTokenInterface = {
            rawToken:resetToken,
            type:TokenTypes.EMAIL_VERIFY,
            userId:userId
        }
        const proccessingResetToken = await this.tokenServices.VerifyResetToken(resetTokenPayload);
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
        const returnedUser = user.toObject();
        delete returnedUser.password;

        return returnedUser;
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
        console.log(userObject)
        if(sort){
            if(sort === "NEWEST_FIRST") productSort = {createdAt: -1};
            if(sort === "PRICE_HIGH_TO_LOW") productSort = {price: -1};
            if(sort === "PRICE_LOW_TO_HIGH") productSort = {price: 1};
            if(sort === "RELEVANCE") productSort = {createdAt: -1};
        }
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
                    as: "followings"
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
                    let:{owner:"$_id"},
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
    public async LogoutUserAccount(userObject:LogoutUserAccountInterface):Promise<Boolean> {
        const {userId,refreshToken} = userObject;
        const user = await this.GetUserById(userId);
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
     * @param otpObject - email.
     * @param otpObject - otp.
     * @returns null.
    */
    public async VerifyForgotAccountOtp(otpObject:VerifyForgotAccountOtpInterface):Promise<{resetToken:string}> {
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
        const {email,resetToken,password} = resetObject;
        /** Note: Check user exist. */
        const user = await UserModel.findOne({email:email});
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
     * Note: Auth Login with google.
     * @param GoogleProfile.
     * @returns UserDocument.
    */
    public async LoginWithGoogle(profile:GoogleProfile):Promise<UserDocument> {
        const {name,emails,photos,id} = profile;
        /** note: Check user is exist. */
        let user = await UserModel.findOne({
            googleId:id
        });
        if(!user){
            const emailSafe = emails || [];
            const photosSafe = photos || [];
            const removeNullFileds:Partial<Record<any,any>> = {
                googleId:id,
                email:emailSafe[0]?.value ?? null,
                avatar:photosSafe[0]?.value ?? null,
                fullname:(name?.givenName && name?.familyName) ? name.givenName + " " + name.familyName : null,
                username:emailSafe[0]?.value.split("@")[0] ?? null,
                isVerfied:true
            };
            /** Note: Filter User */
            const filterdUser = await this.RemoveNullAndUndefinedValues(removeNullFileds);
            /** Note: Create new account */
            user = await UserModel.create(filterdUser);
        }
        return user;
    };
    
    /**
     * Note: Auth Login with facebook.
     * @param FacebookProfile.
     * @returns UserDocument.
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
                fullname:(name?.givenName && name?.givenName) ? `${name?.givenName} ${name?.familyName}` : nullable,
                username:emailsSafe[0]?.value?.split("@")[0] ?? null,
                gender:gender ?? null,
                isVerfied:true
            };
            /** Note: Removinf nulleble fields. */
            const filterdUser = await this.RemoveNullAndUndefinedValues(removeNullFields);
            /** Note: Create Document in Mongodb */
            user = await UserModel.create(filterdUser);
        }
        return user;
    }
}

export default UserServices;
