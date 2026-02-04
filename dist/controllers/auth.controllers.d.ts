/** Note: imports types */
import type { Request, Response } from "express";
declare class AuthControllers {
    private userServices;
    /**
     * Note: Register User account.
     * @param req.
     * @param res.
     * @returns userDocument.
    */
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
 * Note: Forgot account password.
 * @param req.
 * @param res.
 * @returns null.
*/
    HandleForgotAccountPassword: (req: Request, res: Response) => Promise<Response>;
    /**
     * Note: Verify Forgot account otp.
     * @param req.
     * @param res.
     * @returns null.
    */
    HandleVerifyForgotAccountOtp: (req: Request, res: Response) => Promise<Response>;
    /**
     * Note: Change password with resetToken.
     * @param req.
     * @param res.
     * @returns Response.
    */
    HandleResetPassword: (req: Request, res: Response) => Promise<Response>;
    /**
     * Note: Logout user account.
     * @param req.
     * @param res.
     * @returns Response.
    */
    LogoutUserAccount: (req: Request, res: Response) => Promise<Response>;
}
export default AuthControllers;
//# sourceMappingURL=auth.controllers.d.ts.map