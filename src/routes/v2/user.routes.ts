import express from "express";
import type { Router } from "express";

/* Note: UserControllers imports **/
import UserControllers from "../../controllers/user.controllers.js";
import AsyncHandler from "../../utils/AsyncHandler.js";

/** Imports Middlewares */
import AuthMiddlewares from "../../middlewares/auth.middlewares.js";

const UserRouter:Router = express.Router();
const userControllers = new UserControllers();
const authMiddlewares = new AuthMiddlewares();

UserRouter.route("/profile").get(AsyncHandler(userControllers.HandleGetUserProfile));
UserRouter.route("/user-reviews").get(AsyncHandler(userControllers.HandleGetUserReviews));


/** Secure Routes */
UserRouter.route("/update-email").post(authMiddlewares.AuthenticateJwtCookie,AsyncHandler(userControllers.HandleChangeEmail));
UserRouter.route("/update-profile").patch(authMiddlewares.AuthenticateJwtCookie,AsyncHandler(userControllers.HandleUpdateProfile));
UserRouter.route("/verify-otp-and-change-email").post(authMiddlewares.AuthenticateJwtCookie,AsyncHandler(userControllers.HandleVerifyOtpAndChangeEmail));

export default UserRouter;