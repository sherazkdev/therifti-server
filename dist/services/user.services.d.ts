import { type AuthResponseInterface, type ChangeAccountEmailInterface, type ChangeAccountEmailResponseInterface, type ChangeAccountEmailVerifyOtpInterface, type ChangeAccountPasswordInterface, type GetUserProfileInterface, type LoginUserAccountInterface, type RefreshAndAccessTokenGeneraterInterface, type RegisterUserAccountMenuallyInterface, type UpdateUserPasswordInterface, type UpdateUserProfileInterface, type UserDocument, type VerifyUpdateEmailOtpInterface, type VerifyForgotAccountOtpInterface, type resetPasswordWithTokenInterface, type LogoutUserAccountInterface } from "../interfaces/user.interfaces.js";
import type { VerifyOtpInterface } from "../interfaces/otp.interfaces.js";
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
declare class UserServices {
    private otpServices;
    private tokenServices;
    /**
     * Note: Retrieves user details by user ID.
     * @param  userId - ObjectId.
     * @returns User Object.
     * @throw if not exist user throw error.
    */
    GetUserById(userId: string): Promise<UserDocument>;
    /**
     * Note: Update user details by userId .
     * @param userObject - User object containing the required userId and updated fields.
     * @update  User object.
     * @returns The updated user object.
    */
    UpdateUserProfileById(userId: string, userObject: UpdateUserProfileInterface): Promise<UserDocument>;
    /**
     * Note: Remove undifind and null values from object
     * @param object
     * @return object
    */
    RemoveNullAndUndefinedValues<T extends Record<string, any>>(object: T): Partial<T>;
    /**
     * Note: Update user account password.
     * @param userObject - User object containing the required userId and password and updated fields.
     * @update only updating password.
     * @returns NULL
    */
    UpdateUserAccountPassword(userObject: UpdateUserPasswordInterface): Promise<void>;
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
     * Note: Account access and refresh token generater.
     * @param userDocument - with Document.
     * @update userDocument.refreshToken.
     * @returns access_token and refresh_token.
    */
    protected GenerateRefreshAndAccessToken(userId: string): Promise<RefreshAndAccessTokenGeneraterInterface>;
    /**
     * Note: Login user with email and password
     * @param userObject - email and password is required fields.
     * @check email is exit.
     * @update userDocument refreshToken and lastSeen.
     * @returns access and refresh token.
    */
    LoginUserAccount(userObject: LoginUserAccountInterface): Promise<AuthResponseInterface>;
    /**
     * Note: Forgot account password
     * @param forgotAccoutDetails - email is hardly required.
     * @check email is exist.
     * @update user document otp and otp expiry.
     * @returns NULL.
    */
    ForgotAccountPassword(forgotAccoutDetails: {
        email: string;
    }): Promise<void>;
    /**
     * Note: Change Account Password.
     * @param accountDetails - userId and password
     * @check email is exist.
     * @update userDocument update password and lastlogin info.
     * @returns NULL.
    */
    ChangeAccountPassword(accountDetails: ChangeAccountPasswordInterface): Promise<void>;
    /**
     * Note: Change account primary email.
     * @param userObject - userId and email is required.
     * @check email is exist.
     * @update userDocument otp and send otp on email.
     * @returns userDocument.
    */
    ChangeAccountEmail(userObject: ChangeAccountEmailInterface): Promise<ChangeAccountEmailResponseInterface>;
    /**
     * Note: Verify Update email otp.
     * @param userObject - otp.
     * @param userObject - email.
     * @param userObject - userId.
     * @update Document email.
     * @return new Document.
    */
    VerifyOtpAndChangeEmail(userObject: VerifyUpdateEmailOtpInterface): Promise<object>;
    /**
     * Note: Get User Profile with products and followers following list.
     * @param userObject - userId, page, limit.
     * @throw if user not found throw error.
     * @returns userProfileObject.
    */
    GetUserAccountProfile(userObject: GetUserProfileInterface): Promise<object>;
    /**
     * Note: Get User Reviews.
     * @param userObject - userId
     * @throw if user not found throw error.
     * @returns reviewsObject
    */
    GetUserReviews(userObject: {
        userId: string;
    }): Promise<Object>;
    /**
     * Note: ChangeAccountEmailVerifyOtp.
     * @param userObject - otp and userId is full required.
     * @update userDocument update user primary email.
     * @return updated userDocument.
    */
    ChangeAccountEmailVerifyOtp(userObject: ChangeAccountEmailVerifyOtpInterface): Promise<void>;
    /**
     * Note: Logout User Account Remove access and refreshToken.
     * @param userObject - userId.
     * @update userDocument refreshToken.
     * @return null.
    */
    LogoutUserAccount(userObject: LogoutUserAccountInterface): Promise<Boolean>;
    /**
     * Note: Deactivate user account.
     * @param userObject - userId
     * @update userDocument status.
     * @return null.
    */
    DeactivateUserAccount(userObject: {
        userId: string;
    }): Promise<void>;
    /**
     * Note: Activate user account.
     * @param userObject - userId
     * @update userDocument status.
     * @return null.
    */
    ActivateUserAccount(userObject: {
        userId: string;
    }): Promise<void>;
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
}
export default UserServices;
//# sourceMappingURL=user.services.d.ts.map