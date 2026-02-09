import UserModel from "../models/user.model.js";
/** Note: UserModel Services */
import ApiError from "../utils/ApiError.js";
/** Response Constants */
import { ERROR_MESSAGES, STATUS_CODES } from "../constants/responseConstants.js";
import bcrypt from "bcrypt";
import { TokenTypes } from "../interfaces/token.interfaces.js";
import TokenServices from "./token.services.js";
import UserServices from "./user.services.js";
import OtpServices from "./otp.services.js";
class AuthServices {
    userServices = new UserServices();
    otpServices = new OtpServices();
    tokenServices = new TokenServices();
    /**
     * Note: Auth Login with google.
     * @param {GoogleProfile} profile - Logged in user profile.
     * @returns {UserDocument}.
    */
    async LoginWithGoogle(profile) {
        const { name, emails, photos, id } = profile;
        /** note: Check user is exist. */
        let user = await UserModel.findOne({
            googleId: id
        });
        if (!user) {
            const emailSafe = emails || [];
            const photosSafe = photos || [];
            const removeNullFileds = {
                googleId: id,
                email: emailSafe[0]?.value ?? null,
                avatar: photosSafe[0]?.value ?? null,
                fullname: (name?.givenName && name?.familyName) ? name.givenName + " " + name.familyName : null,
                username: emailSafe[0]?.value.split("@")[0] ?? null,
                isVerfied: true
            };
            /** Note: Filter User */
            const filterdUser = await this.userServices.RemoveNullAndUndefinedValues(removeNullFileds);
            /** Note: Create new account */
            user = await UserModel.create(filterdUser);
        }
        return user;
    }
    ;
    /**
     * Note: Auth Login with facebook.
     * @param {FacebookProfile} profile - Logged in user profile.
     * @returns {UserDocument}.
    */
    async LoginWithFacebook(profile) {
        const { birthday, name, photos, emails, id, gender, } = profile;
        /** Note: Check User exist using facebookId. */
        let user = await UserModel.findOne({
            facebookeId: id
        });
        if (!user) {
            let emailsSafe = emails || [];
            let photosSafe = photos || [];
            /** Note: this object creating for remove a nulleble fields. */
            const removeNullFields = {
                email: emailsSafe[0]?.value ?? null,
                facebookId: id,
                avatar: photosSafe[0]?.value ?? null,
                dob: birthday ? new Date(birthday) : null,
                fullname: (name?.givenName && name?.givenName) ? `${name?.givenName} ${name?.familyName}` : null,
                username: emailsSafe[0]?.value?.split("@")[0] ?? null,
                gender: gender ?? null,
                isVerfied: true
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
    async RegisterUserAccount(userObject) {
        const { email, fullname, password, username, zipCode } = userObject;
        const checkUserAccountEmailExist = await UserModel.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });
        if (checkUserAccountEmailExist?.email === email) {
            if (checkUserAccountEmailExist.isVerfied === true) {
                throw new ApiError(STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGES.AUTH.EMAIL_EXISTS);
            }
            /** Note: if user is not verified send otp. */
            const sendOtpPayload = {
                purpose: "REGISTER_ACCOUNT",
                email: email,
                userId: checkUserAccountEmailExist._id.toString()
            };
            const sendOtpForRegistration = await this.otpServices.SendOtp(sendOtpPayload);
            return checkUserAccountEmailExist;
        }
        if (checkUserAccountEmailExist?.username === username) {
            throw new ApiError(STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGES.AUTH.USERNAME_EXISTS);
        }
        /** Note: end otp hashing section. */
        const UserDocument = {
            email: email,
            fullname: fullname,
            password: password,
            username: username,
            isVerfied: false
        };
        const created_user = await UserModel.create(UserDocument);
        /** Note: Generate new otp for email verification. */
        const sendOtpPayload = {
            purpose: "REGISTER_ACCOUNT",
            email: email,
            userId: created_user._id.toString()
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
    async VerifyRegistrationOtp(otpObject) {
        const { userId } = otpObject;
        /** Verify Registration Otp */
        const verifyOtp = await this.otpServices.VerifyOtp(otpObject);
        const user = await this.userServices.GetUserById(userId);
        /** Note: Generate access and refresh token. */
        const { accessToken } = await this.GenerateRefreshAndAccessToken(userId);
        /** Note: Update user document and asign the refreshToken etc.*/
        /** Note: Create a token for a refreshToken etc.*/
        const createTokenPayload = {
            type: TokenTypes.REFRESH,
            userId: user._id.toString()
        };
        const { rawToken } = await this.tokenServices.CreateToken(createTokenPayload);
        const returnedUser = user.toObject();
        delete returnedUser.password;
        return {
            user: returnedUser,
            tokens: {
                accessToken: accessToken,
                refreshToken: rawToken
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
    async LoginUserAccount(userObject) {
        const { email, password } = userObject;
        const user = await UserModel.findOne({ email: email, isVerfied: true });
        if (!user) {
            throw new ApiError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.AUTH.EMAIL_NOT_FOUND);
        }
        /** Match Password. */
        if (!user.password) {
            throw new ApiError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
        }
        const hashed_password = user.password;
        /** Note: Compare normal password to hashpassword. */
        const compare_password = await bcrypt.compare(password, hashed_password);
        if (!compare_password) {
            throw new ApiError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
        }
        /** Note: Generate access and refresh token. */
        const { accessToken } = await this.GenerateRefreshAndAccessToken(user._id.toString());
        /** Note: Create a token for a refreshToken etc.*/
        const createTokenPayload = {
            type: TokenTypes.REFRESH,
            userId: user._id.toString()
        };
        const { rawToken } = await this.tokenServices.CreateToken(createTokenPayload);
        const returnedUser = user.toObject();
        delete returnedUser.password;
        return {
            user: returnedUser,
            tokens: {
                refreshToken: rawToken,
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
    async VerifyForgotAccountOtp(otpObject) {
        const { email, otp } = otpObject;
        const user = await UserModel.findOne({
            email: email
        });
        /** Note: Check email is exist. */
        if (!user) {
            throw new ApiError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.USER.NOT_FOUND);
        }
        /** Note: otp verify payload. */
        const OtpVerifyPayload = {
            otp: otp,
            purpose: "FORGOT_ACCOUNT",
            userId: user._id.toString()
        };
        const {} = await this.otpServices.VerifyOtp(OtpVerifyPayload);
        /** Note: Create Reset token. for non authenticated. */
        const resetTokenPayload = {
            type: TokenTypes.RESET_PASSWORD,
            userId: user._id.toString(),
        };
        const { rawToken } = await this.tokenServices.CreateToken(resetTokenPayload);
        return { resetToken: rawToken };
    }
    /**
     * Note: Reset password with resetToken based verification is only for un authencticated.
     * @param resetObject - resetToken.
     * @param resetObject - email.
     * @update userDocument - password.
     * @return null.
    */
    async resetPasswordWithToken(resetObject) {
        const { email, resetToken, password } = resetObject;
        /** Note: Check user exist. */
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            throw new ApiError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.USER.NOT_FOUND);
        }
        /** Note: verify reset token now. */
        const verifyResetTokenPayload = {
            rawToken: resetToken,
            type: TokenTypes.RESET_PASSWORD,
            userId: user._id.toString()
        };
        const tokenVerification = await this.tokenServices.VerifyResetToken(verifyResetTokenPayload);
        /** Note: after reset token verification assign the user document password to password and automatecly saved in db hashed password. */
        user.password = password;
        await user.save();
        return;
    }
    ;
    /**
     * Logs out the user by removing the refresh token from their account.
     *
     * @param {string} userId - Unique identifier of the user.
     * @param {string} refreshToken - The refresh token to be invalidated.
     * @returns {Promise<Boolean>} - Resolves when the token has been removed.
     * @throws {ApiError} If the user is not found or token removal fails.
     * @note Delete the user's `refreshToken` in the database.
    */
    async LogoutUserAccount(userObject) {
        const { userId, refreshToken } = userObject;
        const user = await this.userServices.GetUserById(userId);
        /** Note: Delete RefreshToken */
        const findRefreshTokenPayload = {
            token: refreshToken,
            type: TokenTypes.REFRESH,
            userId: userId
        };
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
    async ForgotAccount(forgotAccoutDetails) {
        const { email } = forgotAccoutDetails;
        const user = await UserModel.findOne({ email: email, isVerfied: true });
        if (!user) {
            throw new ApiError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.USER.NOT_FOUND);
        }
        /** Note: if account is exist generate a new otp and with email. */
        /** Note: Send otp on email using with nodemailer */
        const sendOtpPayload = {
            userId: user._id.toString(),
            purpose: "FORGOT_ACCOUNT",
            email: email
        };
        const sendOtp = await this.otpServices.SendOtp(sendOtpPayload);
        return;
    }
    /**
     * Note: Generates a new access token for the given user.
     * @param {string} userId - Unique identifier of the user.
     * @returns {Promise<RefreshAndAccessTokenGeneraterInterface>}
     * An object containing the generated access token.
     *
     * @throws {ApiError} If the user is not found.
     */
    async GenerateRefreshAndAccessToken(userId) {
        const user = await this.userServices.GetUserById(userId);
        const accessToken = await user.GenerateAccessToken();
        return { accessToken };
    }
}
;
export default AuthServices;
//# sourceMappingURL=auth.services.js.map