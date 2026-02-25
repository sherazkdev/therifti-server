import express from "express";
import type { Router } from "express";

/* Note: Controllers imports **/
import FollowControllers from "../../controllers/follow.controllers.js";

import AsyncHandler from "../../utils/AsyncHandler.js";
/** Imports Middlewares */
import AuthMiddlewares from "../../middlewares/auth.middlewares.js";

const FollowRouter:Router = express.Router();
const followControllers = new FollowControllers();
const authMiddlewares = new AuthMiddlewares();

FollowRouter.route("get-followings/:userId").get(AsyncHandler(followControllers.HandleGetFollowers));
FollowRouter.route("get-followers/:userId").get(AsyncHandler(followControllers.HandleGetFollowings));
/** Secure routes */
FollowRouter.route("follow-seller").post(authMiddlewares.AuthenticateJwtCookie,AsyncHandler(followControllers.HandleFollowSeller));
FollowRouter.route("unfollow-seller").delete(authMiddlewares.AuthenticateJwtCookie,AsyncHandler(followControllers.HandleUnfollow));

export default FollowRouter;
