import express from "express";
/* Note: BrandControllers imports **/
import SizeControllers from "../../controllers/size.controllers.js";
import AsyncHandler from "../../utils/AsyncHandler.js";
/** Imports Middlewares */
import AuthMiddlewares from "../../middlewares/auth.middlewares.js";
const SizeRouter = express.Router();
const sizeControllers = new SizeControllers();
const authMiddlewares = new AuthMiddlewares();
SizeRouter.route("/get-size-by-category/:categoryId").get(AsyncHandler(sizeControllers.HandleGetSizeByCategory));
/** Secure routes */
SizeRouter.route("/create-size").post(authMiddlewares.AuthenticateJwtCookie, AsyncHandler(sizeControllers.HandleCreateSize));
SizeRouter.route("/update-size").patch(authMiddlewares.AuthenticateJwtCookie, AsyncHandler(sizeControllers.HandleUpdateSize));
SizeRouter.route("/delete-size/:sizeId").delete(authMiddlewares.AuthenticateJwtCookie, AsyncHandler(sizeControllers.HandleDeleteSize));
export default SizeRouter;
//# sourceMappingURL=size.routes.js.map