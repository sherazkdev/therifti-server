import UserModel from "../models/user.model.js";
/** Note: UserModel Services */
import ApiError from "../utils/ApiError.js";
/** Response Constants */
import { ERROR_MESSAGES, STATUS_CODES } from "../constants/responseConstants.js";
import { UserStatusEnum, } from "../interfaces/user.interfaces.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import ProductModel from "../models/product.model.js";
import OtpServices from "./otp.services.js";
import TokenServices from "./token.services.js";
import { TokenTypes } from "../interfaces/token.interfaces.js";
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
    otpServices = new OtpServices();
    tokenServices = new TokenServices();
    /**
     * Note: Retrieves user details by user ID.
     * @param  userId - ObjectId.
     * @returns User Object.
     * @throw if not exist user throw error.
    */
    async GetUserById(userId) {
        const user = await UserModel.findById(new mongoose.Types.ObjectId(userId));
        if (!user) {
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
    async UpdateUserProfileById(userId, userObject) {
        const {} = userObject;
        /** Note: Filtered Product Data. */
        const filteredProduct = await this.RemoveNullAndUndefinedValues(userObject);
        console.log(filteredProduct, userObject);
        const updateUserProfile = await UserModel.findByIdAndUpdate(new mongoose.Types.ObjectId(userId), { $set: filteredProduct }, { new: true }).select("-password");
        if (!updateUserProfile) {
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
    RemoveNullAndUndefinedValues(object) {
        return Object.fromEntries(Object.entries(object).filter((_y, item) => item !== undefined && item !== null));
    }
    /**
     * Note: Update user account password.
     * @param userObject - User object containing the required userId and password and updated fields.
     * @update only updating password.
     * @returns NULL
    */
    async UpdateUserAccountPassword(userObject) {
        const { password, userId } = userObject;
        const user = await this.GetUserById(userId);
        user.password = password;
        await user.save();
        return;
    }
    /**
     * Note: Change Account Password.
     * @param accountDetails - userId and password
     * @check email is exist.
     * @update userDocument update password and lastlogin info.
     * @returns NULL.
    */
    async ChangeAccountPassword(accountDetails) {
        const { password, userId } = accountDetails;
        const user = await this.GetUserById(userId);
        /** Note: hash normal password */
        const salt_rounds = 10;
        const get_salt = await bcrypt.genSalt(salt_rounds);
        const hash_password = await bcrypt.hash(password, get_salt);
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
    async ChangeAccountEmail(userObject) {
        const { email, userId } = userObject;
        /**
         * Note: Check Email is already exist in anoterher
         * is exist throw error.
        */
        const checking_email_is_already_exist = await UserModel.findOne({
            email: email
        });
        if (checking_email_is_already_exist) {
            throw new ApiError(STATUS_CODES.BAD_REQUEST, ERROR_MESSAGES.AUTH.EMAIL_EXISTS);
        }
        const user = await this.GetUserById(userId);
        /** Note: if user is not verified send otp. */
        const sendOtpPayload = {
            purpose: "CHANGE_EMAIL",
            email: email,
            userId: userId
        };
        const sendOtpForRegistration = await this.otpServices.SendOtp(sendOtpPayload);
        /** Note: Create Reset token. */
        const resetTokenPayload = {
            type: TokenTypes.EMAIL_VERIFY,
            userId: userId
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
    async VerifyOtpAndChangeEmail(userObject) {
        const { email, otp, userId, resetToken } = userObject;
        const user = await this.GetUserById(userId);
        /** Note: Before otp verify check resetToken is valid */
        const resetTokenPayload = {
            rawToken: resetToken,
            type: TokenTypes.EMAIL_VERIFY,
            userId: userId
        };
        const proccessingResetToken = await this.tokenServices.VerifyResetToken(resetTokenPayload);
        /** Note: Verify Otp Payload. */
        const verifyOtpPayload = {
            otp: otp,
            purpose: "CHANGE_EMAIL",
            userId: userId
        };
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
    async GetUserAccountProfile(userObject) {
        const { userId, limit, page, sort, categoryId } = userObject;
        /** Note: Product Sorting. */
        let productSort = { createdAt: -1 };
        if (sort) {
            if (sort === "NEWEST_FIRST")
                productSort = { createdAt: -1 };
            if (sort === "PRICE_HIGH_TO_LOW")
                productSort = { price: -1 };
            if (sort === "PRICE_LOW_TO_HIGH")
                productSort = { price: 1 };
            if (sort === "RELEVANCE")
                productSort = { createdAt: -1 };
        }
        /** Note: Pagination and limits. */
        const limitNumber = limit || 10;
        const pageNumber = page || 1;
        const skip = (pageNumber - 1) * limitNumber;
        let productQuery = {
            $expr: {
                $eq: ["$owner", "$$owner"]
            }
        };
        if (categoryId) {
            productQuery.$expr = {
                $and: [
                    { $eq: ["$owner", "$$owner"] },
                    { $eq: ["$categoryId", new mongoose.Types.ObjectId(categoryId)] }
                ]
            };
        }
        /** Note: Getting user profile using aggregate piplines */
        const userDetails = await UserModel.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: ["$_id", new mongoose.Types.ObjectId(userId)]
                    }
                }
            },
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "targetUserId",
                    as: "reviews"
                }
            },
            {
                $lookup: {
                    from: "follows",
                    localField: "_id",
                    foreignField: "followerId",
                    as: "followings"
                }
            },
            {
                $lookup: {
                    from: "follows",
                    localField: "_id",
                    foreignField: "followingId",
                    as: "followers"
                }
            },
            {
                $lookup: {
                    from: "products",
                    let: { owner: "$_id" },
                    pipeline: [
                        {
                            $match: productQuery
                        },
                        {
                            $sort: productSort
                        },
                        {
                            $limit: limitNumber
                        },
                        {
                            $skip: skip
                        }
                    ],
                    as: "products"
                }
            },
            {
                $addFields: {
                    totalReviewsCount: {
                        $size: "$reviews"
                    },
                    totalProductsCount: {
                        $size: "$products"
                    },
                    totalFollowersCount: {
                        $size: "$followers"
                    },
                    totalFollowingsCount: {
                        $size: "$followings"
                    }
                }
            },
            {
                $project: {
                    username: 1,
                    totalReviewsCount: 1,
                    totalProductsCount: 1,
                    totalFollowersCount: 1,
                    totalFollowingsCount: 1,
                    location: 1,
                    lastSeen: 1,
                    avatar: 1,
                    fullname: 1,
                    _id: 1,
                    products: 1,
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
    async GetUserReviews(userObject) {
        const { userId } = userObject;
        /** Note: GetUserReviews and return. */
        const userReviews = await UserModel.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: ["$targetUserId", new mongoose.Types.ObjectId(userId)]
                    }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "reviewerId",
                    foreignField: "_id",
                    as: "reviewer"
                }
            },
            {
                $unwind: "$reviewer"
            },
            {
                $project: {
                    _id: 1,
                    "reviewer._id": 1,
                    "reviewer.fullname": 1,
                    "reviewer.avatar": 1,
                    "reviewer.isVerifed": 1,
                    rate: 1,
                    review: 1,
                    type: 1,
                    status: 1
                }
            }
        ]);
        return userReviews[0];
    }
    /**
     * Note: ChangeAccountEmailVerifyOtp.
     * @param userObject - otp and userId is full required.
     * @update userDocument update user primary email.
     * @return updated userDocument.
    */
    async ChangeAccountEmailVerifyOtp(userObject) {
    }
    /**
     * Note: Deactivate user account.
     * @param userObject - userId
     * @update userDocument status.
     * @return null.
    */
    async DeactivateUserAccount(userObject) {
        const { userId } = userObject;
        const user = await this.GetUserById(userId);
        /** Note: First of all currently user products is live, if live do not deactivate account. */
        const check_user_products_exist = await ProductModel.find({
            owner: new mongoose.Types.ObjectId(userId)
        });
        if (check_user_products_exist.length > 0) {
            throw new ApiError(STATUS_CODES.METHOD_NOT_ALLOWED, ERROR_MESSAGES.USER.ACCOUNT_DEACTIVATE_LIVE_PRODUCTS);
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
    async ActivateUserAccount(userObject) {
        const { userId } = userObject;
        const user = await this.GetUserById(userId);
        /** Note: Active UserAccount Status now. */
        user.status = UserStatusEnum.ACTIVATED;
        user.lastSeen = new Date();
        await user.save();
        return;
    }
}
export default UserServices;
//# sourceMappingURL=user.services.js.map