import express from "express";
/* Note: UserControllers imports **/
import UserControllers from "../../controllers/user.controllers.js";
import AsyncHandler from "../../utils/AsyncHandler.js";
const UserRouter = express.Router();
/** Imports Middlewares */
import AuthMiddlewares from "../../middlewares/auth.middlewares.js";
import TokenModel from "../../models/token.model.js";
import OtpModel from "../../models/otp.model.js";
import UserModel from "../../models/user.model.js";
UserRouter.route("/register").post(AsyncHandler(UserControllers.HandleRegisterUserAccount));
UserRouter.route("/registeration-otp-verifier").patch(AsyncHandler(UserControllers.HandleRegisterationOtpVerifier));
UserRouter.route("/login").post(AsyncHandler(UserControllers.HandleLoginUserAccount));
/** Note: Reset Password routes. */
UserRouter.route("/forgot-password").post(AsyncHandler(UserControllers.HandleForgotAccountPassword));
UserRouter.route("/verify-forgot-otp").post(AsyncHandler(UserControllers.HandleVerifyForgotAccountOtp));
UserRouter.route("/reset-password").post(AsyncHandler(UserControllers.HandleResetPassword));
/** Secure Routes */
UserRouter.route("/update-email").post(AuthMiddlewares.AuthenticateJwtCookie, AsyncHandler(UserControllers.HandleChangeEmail));
UserRouter.route("/update-profile").patch(AuthMiddlewares.AuthenticateJwtCookie, AsyncHandler(UserControllers.HandleUpdateProfile));
UserRouter.route("/verify-otp-and-change-email").post(AuthMiddlewares.AuthenticateJwtCookie, AsyncHandler(UserControllers.HandleVerifyOtpAndChangeEmail));
export default UserRouter;
//# sourceMappingURL=user.routes.js.map