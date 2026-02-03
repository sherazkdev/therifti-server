import express from "express";
import type { Router } from "express";

/* Note: UserControllers imports **/
import UserControllers from "../../controllers/user.controllers.js";
import AsyncHandler from "../../utils/AsyncHandler.js";
const UserRouter:Router = express.Router();

/** Imports Middlewares */
import AuthMiddlewares from "../../middlewares/auth.middlewares.js";

UserRouter.route("/register").post(AsyncHandler(UserControllers.HandleRegisterUserAccount));
UserRouter.route("/registeration-otp-verifier").patch(AsyncHandler(UserControllers.HandleRegisterationOtpVerifier));
UserRouter.route("/login").post(AsyncHandler(UserControllers.HandleLoginUserAccount));
UserRouter.route("/profile").get(AsyncHandler(UserControllers.HandleGetUserProfile));
UserRouter.route("/user-reviews").get(AsyncHandler(UserControllers.HandleGetUserReviews));


/** Note: Reset Password routes. */
UserRouter.route("/forgot-password").post(AsyncHandler(UserControllers.HandleForgotAccountPassword));
UserRouter.route("/verify-forgot-otp").post(AsyncHandler(UserControllers.HandleVerifyForgotAccountOtp));
UserRouter.route("/reset-password").post(AsyncHandler(UserControllers.HandleResetPassword));

/** Secure Routes */
UserRouter.route("/update-email").post(AuthMiddlewares.AuthenticateJwtCookie,AsyncHandler(UserControllers.HandleChangeEmail));
UserRouter.route("/logout").patch(AuthMiddlewares.AuthenticateJwtCookie,AsyncHandler(UserControllers.LogoutUserAccount));
UserRouter.route("/update-profile").patch(AuthMiddlewares.AuthenticateJwtCookie,AsyncHandler(UserControllers.HandleUpdateProfile));
UserRouter.route("/verify-otp-and-change-email").post(AuthMiddlewares.AuthenticateJwtCookie,AsyncHandler(UserControllers.HandleVerifyOtpAndChangeEmail));

export default UserRouter;