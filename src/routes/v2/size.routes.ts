import express from "express";
import type { Router } from "express";

/** Note: Services */
import SizeServices from "../../services/size.services.js";

/* Note: BrandControllers imports **/
import SizeControllers from "../../controllers/size.controllers.js";
import AsyncHandler from "../../utils/AsyncHandler.js";

/** Imports Middlewares */
import AuthMiddlewares from "../../middlewares/auth.middlewares.js";

const SizeRouter:Router = express.Router();
const sizeServices = new SizeServices();

const sizeControllers = new SizeControllers(sizeServices);
const authMiddlewares = new AuthMiddlewares();

SizeRouter.route("/get-size-by-category/:categoryId").get(AsyncHandler(sizeControllers.HandleGetSizeByCategory));
/** Secure routes */
SizeRouter.route("/create-size").post(authMiddlewares.AuthenticateJwtCookie,AsyncHandler(sizeControllers.HandleCreateSize));
SizeRouter.route("/update-size").patch(authMiddlewares.AuthenticateJwtCookie,AsyncHandler(sizeControllers.HandleUpdateSize));
SizeRouter.route("/delete-size/:sizeId").delete(authMiddlewares.AuthenticateJwtCookie,AsyncHandler(sizeControllers.HandleDeleteSize));

export default SizeRouter;