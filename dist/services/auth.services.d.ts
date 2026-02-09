import type { Profile as GoogleProfile } from "passport-google-oauth20";
import type { Profile as FacebookProfile } from "passport-facebook";
import type { RefreshAndAccessTokenGeneraterInterface, UserDocument } from "../interfaces/user.interfaces.js";
/** Interfaces */
import type { AuthResponseInterface, RegisterUserAccountMenuallyInterface, LoginUserAccountInterface, resetPasswordWithTokenInterface, VerifyForgotAccountOtpInterface, LogoutUserAccountInterface } from "../interfaces/user.interfaces.js";
import type { VerifyOtpInterface } from "../interfaces/otp.interfaces.js";
declare class AuthServices {
    private userServices;
    private otpServices;
    private tokenServices;
    /**
     * Note: Auth Login with google.
     * @param {GoogleProfile} profile - Logged in user profile.
     * @returns {UserDocument}.
    */
    LoginWithGoogle(profile: GoogleProfile): Promise<UserDocument>;
    /**
     * Note: Auth Login with facebook.
     * @param {FacebookProfile} profile - Logged in user profile.
     * @returns {UserDocument}.
    */
    LoginWithFacebook(profile: FacebookProfile): Promise<UserDocument>;
    /**
     * Note: Register User account.
     * @param userObject - required fields is email, password, zipCode is optionl, userName,
     * @throw if emails exist.
    */
    RegisterUserAccount(userObject: RegisterUserAccountMenuallyInterface): Promise<UserDocument>;
    /**
     * Note: Sended verification otp verifier.
     * @param otpObject - userId.
     * @param otpObject - otp.
     * @update userDocument update isVerified status.
     * @returns Boolean.
    */
    VerifyRegistrationOtp(otpObject: VerifyOtpInterface): Promise<AuthResponseInterface>;
    /**
     * Note: Login user with email and password
     * @param userObject - email and password is required fields.
     * @check email is exit.
     * @update userDocument refreshToken and lastSeen.
     * @returns access and refresh token.
    */
    LoginUserAccount(userObject: LoginUserAccountInterface): Promise<AuthResponseInterface>;
    /**
     * Note: Verify Forgot account otp.
     * @param otpObject - email.
     * @param otpObject - otp.
     * @returns null.
    */
    VerifyForgotAccountOtp(otpObject: VerifyForgotAccountOtpInterface): Promise<{
        resetToken: string;
    }>;
    /**
     * Note: Reset password with resetToken based verification is only for un authencticated.
     * @param resetObject - resetToken.
     * @param resetObject - email.
     * @update userDocument - password.
     * @return null.
    */
    resetPasswordWithToken(resetObject: resetPasswordWithTokenInterface): Promise<void>;
    /**
     * Logs out the user by removing the refresh token from their account.
     *
     * @param {string} userId - Unique identifier of the user.
     * @param {string} refreshToken - The refresh token to be invalidated.
     * @returns {Promise<Boolean>} - Resolves when the token has been removed.
     * @throws {ApiError} If the user is not found or token removal fails.
     * @note Delete the user's `refreshToken` in the database.
    */
    LogoutUserAccount(userObject: LogoutUserAccountInterface): Promise<Boolean>;
    /**
     * Note: Forgot account and send otp.
     *
     * @param {string} email - Unique identifier of the user.
     * @returns {Promise<void>} send otp on email.
     * @throws {ApiError} If the user is not found.
     *
     * @note Sended otp on user email and otp hashed save in database.
    */
    ForgotAccount(forgotAccoutDetails: {
        email: string;
    }): Promise<void>;
    /**
     * Note: Generates a new access token for the given user.
     * @param {string} userId - Unique identifier of the user.
     * @returns {Promise<RefreshAndAccessTokenGeneraterInterface>}
     * An object containing the generated access token.
     *
     * @throws {ApiError} If the user is not found.
     */
    protected GenerateRefreshAndAccessToken(userId: string): Promise<RefreshAndAccessTokenGeneraterInterface>;
}
export default AuthServices;
//# sourceMappingURL=auth.services.d.ts.map