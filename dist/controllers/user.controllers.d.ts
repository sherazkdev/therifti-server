/** Note: imports types */
import type { Request, Response } from "express";
declare class UserControllers {
    private userServices;
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
    /**
     * Note: Update user profile.
     * @param req.
     * @param res.
     * @return Response.
    */
    HandleUpdateProfile: (req: Request, res: Response) => Promise<Response>;
    /**
     * Note: Get User Profile.
     * @param req.
     * @param res.
     * @returns Response.
    */
    HandleGetUserProfile: (req: Request, res: Response) => Promise<Response>;
    /**
     * Note: Get user reviews.
     * @param req.
     * @param res.
     * @returns Response.
    */
    HandleGetUserReviews: (req: Request, res: Response) => Promise<Response>;
}
export default UserControllers;
//# sourceMappingURL=user.controllers.d.ts.map