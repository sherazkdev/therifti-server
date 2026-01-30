import express from "express";
/* Note: UserControllers imports **/
import UserControllers from "../../controllers/user.controllers.js";
import AsyncHandler from "../../utils/AsyncHandler.js";
const UserRouter = express.Router();
/** Imports Middlewares */
import AuthMiddlewares from "../../middlewares/auth.middlewares.js";
UserRouter.route("/register").post(AsyncHandler(UserControllers.HandleRegisterUserAccount));
UserRouter.route("/registeration-otp-verifier").patch(AsyncHandler(UserControllers.HandleRegisterationOtpVerifier));
UserRouter.route("/login").post(AsyncHandler(UserControllers.HandleLoginUserAccount));
/** Secure Routes */
UserRouter.route("/update-email").post(AuthMiddlewares.AuthenticateJwtCookie, AsyncHandler(UserControllers.HandleChangeEmail));
UserRouter.route("/verify-otp-and-change-email").post(AuthMiddlewares.AuthenticateJwtCookie, AsyncHandler(UserControllers.HandleVerifyOtpAndChangeEmail));
export default UserRouter;
//# sourceMappingURL=user.routes.js.map