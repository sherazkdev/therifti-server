import UserModel from "../models/user.model.js";
/** Note: UserModel Services */
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
/** Response Constants */
import {ERROR_MESSAGES, STATUS_CODES, SUCCESS_MESSAGES} from "../constants/responseConstants.js";
import { OTP_EMAIL_CONTENT, OtpPurposeEnum, UserStatusEnum, type ChangeAccountEmailInterface, type ChangeAccountEmailVerifyOtpInterface, type ChangeAccountPasswordInterface, type GetUserProfileInterface, type LoginUserAccountInterface, type RefreshAndAccessTokenGeneraterInterface, type RegisterUserAccountMenuallyInterface, type SendOtpInterface, type UpdateUserPasswordInterface, type UpdateUserProfileInterface, type UserDocument, type UserInterface, type VerifyOtpInterface } from "../interfaces/user.interfaces.js";
import mongoose from "mongoose";
import bcrypt, { genSalt } from "bcrypt";
import Mailer from "../configs/nodemailer/mailer.js";
import path from "node:path";
import hbs from "handlebars"
import { fileURLToPath } from 'node:url';
import fs from "fs";
import ProductModel from "../models/product.model.js";

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

    /**
     * Note: Retrieves user details by user ID.
     * @param  userId - ObjectId.
     * @returns User Object.
     * @throw if not exist user throw error. 
    */
    public async GetUserById(userId:string):Promise<UserDocument> {
        const user = await UserModel.findById(new mongoose.Types.ObjectId(userId)).select("-password -refreshtoken");
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
    public async RegisterUserAccountAndSendOtp(userObject:RegisterUserAccountMenuallyInterface):Promise<UserDocument> {
        const {email, fullname, password, username, zipCode} = userObject;
        const checkUserAccountEmailExist = await UserModel.findOne({
            $or : [
                {email:email},
                {username:username}
            ]
        });
        if(checkUserAccountEmailExist?.email === email){
            throw new ApiError(STATUS_CODES.UNAUTHORIZED,ERROR_MESSAGES.AUTH.EMAIL_EXISTS)
        } if(checkUserAccountEmailExist?.username === username){
            throw new ApiError(STATUS_CODES.UNAUTHORIZED,ERROR_MESSAGES.AUTH.USERNAME_EXISTS)
        }
        /** Note: Generate new otp for email verification. */
        const generated_otp = await this.GenerateOtp();
        /** Note: Generate normal dcryot otp to hashed otp */
        const salt_rounds:number = 10;
        const gen_salt = await bcrypt.genSalt(salt_rounds);
        const hashed_otp = await bcrypt.hash(generated_otp,gen_salt);
        /** Note: end otp hashing section. */
        const UserDocument:UserInterface = {
            email:email,
            fullname:fullname,
            password:password,
            username:username,
            isVerfied:false,
            otp:hashed_otp,
            otpExpiry: new Date(Date.now() + 10 * 60 * 1000)
        };
        const created_user = await UserModel.create(UserDocument);
        /** Note: Send otp using nodemailer. */
        const mail_options = {
            to:email,
            subject:`Therifti Verifiction Code`,
            body:`
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: auto;
                        background: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                        overflow: hidden;
                    }
                    .header {
                        background: #ff9800;
                        color: white;
                        text-align: center;
                        padding: 20px;
                        font-size: 24px;
                    }
                    .body {
                        padding: 20px;
                        color: #333333;
                        line-height: 1.6;
                    }
                    .footer {
                        text-align: center;
                        background: #eeeeee;
                        padding: 10px;
                        font-size: 12px;
                        color: #777777;
                    }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                    <div class="header">
                        Welcome to Therfti App!
                    </div>
                    <div class="body">
                        <p>Hi ${fullname}</p>
                        <p>Thank you for signing up for our service. We're excited to have you onboard!</p>
                        <p> Your Verification Code is <b> ${generated_otp} </b> </p>
                        <p>Feel free to reach out if you have any questions.</p>
                    </div>
                    <div class="footer">
                        © 2026 Therfti App. All Rights Reserved.
                    </div>
                    </div>
                </body>
                </html>
            `
        };
        const mailer = new Mailer();
        const sendMail = await   mailer.Send(mail_options);
        
        /** Send response */
        return created_user;
    }

    /**
     * Note: Account registration and change change email otp generater.
     * @param NULL.
     * @returns Generated otp.
    */
    protected async GenerateOtp():Promise<string> {
        let otp = Math.floor(1000 + Math.random() * 9000);
        return otp.toString();
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
     * Note: Verify sended otp
     * @param userObject - otp and userId
     * @check hashed otp match to dcrypt otp.
     * @update userDocument isVerfied status.
     * @returns void. 
    */
    public async VerifyOtp(userObject:VerifyOtpInterface):Promise<void> {
        const {otp, userId} = userObject;
        const user = await this.GetUserById(userId);
        /** Note: Compare otp. */
        const hashed_otp = user.otp;
        if(!hashed_otp){
            throw new ApiError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.AUTH.OTP_NOT_FOUND)
        }
        /** Check otp expiry. */
        if(user?.otpExpiry){
            const now = new Date();
            if(user.otpExpiry < now){
                throw new ApiError(STATUS_CODES.UNAUTHORIZED,ERROR_MESSAGES.AUTH.OTP_EXPIRED);
            }
            /** Note: Comparing hashed otp. */
            const hashed_otp = user.otp;
            if(!hashed_otp){
                throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR,ERROR_MESSAGES.AUTH.OTP_NOT_FOUND);
            }
            const compare_otp = await bcrypt.compare(otp,hashed_otp);
            if(!compare_otp){
                throw new ApiError(STATUS_CODES.UNAUTHORIZED,ERROR_MESSAGES.AUTH.INVALID_OTP);
            }
            /** Note: after matched otp update user isVerified status and generate cookies */
            user.isVerfied = true;
            user.otp = null;
            user.otpExpiry = null;
            await user.save();
            
            return;
        }else {
            throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR,ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
        }
        
    }

    /**
     * Note: Login user with email and password
     * @param userObject - email and password is required fields.
     * @check email is exit.
     * @update userDocument refreshToken and lastSeen.
     * @returns access and refresh token. 
    */
    public async LoginUserAccount(userObject:LoginUserAccountInterface):Promise<RefreshAndAccessTokenGeneraterInterface> {
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
        return {accessToken,refreshToken};
    }

    /**
     * Note: Forgot account password
     * @param forgotAccoutDetails - email is hardly required.
     * @check email is exist.
     * @update user document otp and otp expiry.
     * @returns NULL.
    */
    public async ForgotAccount(forgotAccoutDetails:{email:string}):Promise<void> {
        const {email} = forgotAccoutDetails;
        const user = await UserModel.findOne({email:email,isVerifed:true});
        if(!user){
            throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.USER.NOT_FOUND);
        }
        /** Note: if account is exist generate a new otp and with email. */
        // -------------------------------------------------------------------
        /** Note: Generate new otp for email verification. */
        const generated_otp = await this.GenerateOtp();
        /** Note: Generate normal dcryot otp to hashed otp */
        const salt_rounds:number = 10;
        const gen_salt = await bcrypt.genSalt(salt_rounds);
        const hashed_otp = await bcrypt.hash(generated_otp,gen_salt);
        /** Note: Asign the otp to otp */
        const now = Date.now();
        user.otp = hashed_otp;
        user.otpExpiry = new Date(now + (10 * 60 * 1000));        
        await user.save();
        /** Note: Send otp on email using with nodemailer */
        const otpObject = {
            userId:user._id.toString(),
            purpose:OtpPurposeEnum.FORGOT_ACCOUNT
        }
        const send_mail = await this.SendOtp(otpObject)
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
     * @update update userDocument primary email
     * @returns userDocument.
    */
    public async ChangeAccountEmail(userObject:ChangeAccountEmailInterface):Promise<UserDocument> {
        const {email,userId} = userObject;
        const user = await this.GetUserById(userId);
        /** Note: Assign the UserDocument email to params email. */
        user.email = email;
        await user.save();
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
     * Note: Send Otp otp puporse allowed only CHANGE_PASSWORD, FORGOT_PASSWORD, REGISTER_ACCOUNT, CHANGE_EMAIL
     * @param otpObject - userId
    */
    public async SendOtp(otpObject:SendOtpInterface):Promise<void> {
        const {purpose,userId,email} = otpObject;
        /** Note: Check user is exist. */
        let user:UserDocument | null;
        if(userId){
            user = await UserModel.findById(new mongoose.Types.ObjectId(userId));
        }else if(email){
            user = await UserModel.findOne({email:email});
        }
        if(!user){
            throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.USER.NOT_FOUND);
        }
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        /** Note: Get email Tesmplate. */
        const templatePath = path.join(
            __dirname,
            "../configs/nodemailer/templates",
            "otp.email.hbs"
        );
        /** Note: check file exist. */
        if(!templatePath || !fs.existsSync(templatePath)){
            throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.EMAIL.EMAIL_TEMPLATE_NOT_FOUND)
        }
        const source = fs.readFileSync(templatePath,"utf-8");
        const html = hbs.compile(source);
        const otp = await this.GenerateOtp();
        
        /** Note: HashOtp and save otp in UserDocument */
        const salt_rounds = 10;
        const gen_salt = await bcrypt.genSalt(salt_rounds);
        const hashed_otp = await bcrypt.hash(otp,gen_salt);
        user.otp = hashed_otp;
        user.otpExpiry = new Date(Date.now() + ( 10 * 60 * 1000 ));
        await user.save();
        /** Note: After save user send otp on the email service. */
        const body = OTP_EMAIL_CONTENT[purpose];
        const template = html({
            purposeDescription:body.description,
            purposeTitle:body.title,
            fullname: user?.fullname || user?.username
        });
        /** Note: Mail Options */
        /** Note: Send otp using nodemailer. */
        const mail_options = {
            to:user.email,
            subject:`Therifti Verifiction Code`,
            body:template
        };
        const mailer = new Mailer();
        const send_mail = mailer.Send(mail_options);
        return;
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
}

export default UserServices;
