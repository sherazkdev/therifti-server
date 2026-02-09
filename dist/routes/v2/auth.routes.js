import express from "express";
import passport, { session } from "passport";
/* Note: UserControllers imports **/
import AuthControllers from "../../controllers/auth.controllers.js";
import AsyncHandler from "../../utils/AsyncHandler.js";
/** Imports Middlewares */
import AuthMiddlewares from "../../middlewares/auth.middlewares.js";
const AuthRouter = express.Router();
const authControllers = new AuthControllers();
const authMiddlewares = new AuthMiddlewares();
/** Note: Auth Strateges */
AuthRouter.route("/google").get(passport.authenticate("google", { scope: ["profile", "email"], session: false }));
AuthRouter.route("/google-callback").get(passport.authenticate("google", { session: false }), authControllers.HandleGoogleAuthCallback);
AuthRouter.route("/facebook").get(passport.authenticate("faceboook", { scope: ["email"], session: false }));
AuthRouter.route("/facebook-callback").get(passport.authenticate("faceboook", { session: false }), authControllers.HandleFacebookAuthCallback);
AuthRouter.route("/register").post(AsyncHandler(authControllers.HandleRegisterUserAccount));
AuthRouter.route("/registeration-otp-verifier").patch(AsyncHandler(authControllers.HandleRegisterationOtpVerifier));
AuthRouter.route("/login").post(AsyncHandler(authControllers.HandleLoginUserAccount));
/** Secure Routes */
AuthRouter.route("/logout").patch(authMiddlewares.AuthenticateJwtCookie, AsyncHandler(authControllers.HandleLogoutUserAccount));
/** Note: Reset Password routes. */
AuthRouter.route("/forgot-password").post(AsyncHandler(authControllers.HandleForgotAccountPassword));
AuthRouter.route("/verify-forgot-otp").post(AsyncHandler(authControllers.HandleVerifyForgotAccountOtp));
AuthRouter.route("/reset-password").post(AsyncHandler(authControllers.HandleResetPassword));
export default AuthRouter;
//# sourceMappingURL=auth.routes.js.map