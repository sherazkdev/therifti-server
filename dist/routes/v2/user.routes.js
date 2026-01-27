import express from "express";
/* Note: UserControllers imports **/
import UserControllers from "../../controllers/user.controllers.js";
import AsyncHandler from "../../utils/AsyncHandler.js";
const UserRouter = express.Router();
UserRouter.route("/register").post(AsyncHandler(UserControllers.HandleRegisterUserAccount));
UserRouter.route("/registeration-otp-verifier").patch(AsyncHandler(UserControllers.HandleRegisterationOtpVerifier));
export default UserRouter;
//# sourceMappingURL=user.routes.js.map