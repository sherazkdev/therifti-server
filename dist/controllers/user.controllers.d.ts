/** Note: imports types */
import type { Request, Response } from "express";
/**
 * Note: User Controllers.
 * 01: HandleGetUserProfile
 * 02: HandleGetCurrentUser
 * 03: HandleUpdateUserProfile
 * 04: HandleRegisterUser
 * 05: HandleLoginUser
 * 06: HandleForgotUserPassword
 * 07: HandleChangeUserPassword
 * 09: HandleChangeUserEmail
 * 10: HandleVerifyOtp
*/
declare class UserControllers {
    private userServices;
    HandleRegisterUserAccount: (req: Request, res: Response) => Promise<Response>;
    /**
     * Note: Registration Otp Verifier.
     * @param otpObject - userId.
     * @param otpObject - otp.
     * @update userDocument isVerified and refreshToken.
     * @returns UserDocument.
    */
    HandleRegisterationOtpVerifier: (req: Request, res: Response) => Promise<Response>;
}
declare const _default: UserControllers;
export default _default;
//# sourceMappingURL=user.controllers.d.ts.map