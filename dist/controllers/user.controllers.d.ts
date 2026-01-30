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
    /**
     * Note: Login user account.
     * @param req.
     * @param res.
     * @returns userDocument.
    */
    HandleLoginUserAccount: (req: Request, res: Response) => Promise<Response>;
    /**
     * Note: Change email and send otp.
     * @param req.
     * @param res.
     * @returns Null.
    */
    HandleChangeEmail: (req: Request, res: Response) => Promise<Response>;
    /**
     * Note: Verify otp and change email.
     * @param req.
     * @param res.
     * @returns userDocument.
    */
    HandleVerifyOtpAndChangeEmail: (req: Request, res: Response) => Promise<Response>;
}
declare const _default: UserControllers;
export default _default;
//# sourceMappingURL=user.controllers.d.ts.map