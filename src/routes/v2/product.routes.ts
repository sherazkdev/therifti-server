import express from "express";
import type { Router } from "express";

/** Note: Services */
import ProductServices from "../../services/product.services.js";

/* Note: UserControllers imports **/
import ProductControllers from "../../controllers/product.controllers.js";
import AsyncHandler from "../../utils/AsyncHandler.js";
/** Imports Middlewares */
import AuthMiddlewares from "../../middlewares/auth.middlewares.js";

const ProductRouter:Router = express.Router();
const productServices = new ProductServices();

const productControllers = new ProductControllers(productServices);
const authMiddlewares = new AuthMiddlewares();

ProductRouter.route("/search").post(AsyncHandler(productControllers.HandleSearchProduct));
ProductRouter.route("/get-suggestions/:q").get(AsyncHandler(productControllers.HandleGetSuggestions));
ProductRouter.route("/single-product").get(authMiddlewares.AuthenticateJwtOptional,AsyncHandler(productControllers.HandleGetSingleProductById));
/** Secure Routes */
ProductRouter.route("/create-product").post(authMiddlewares.AuthenticateJwtCookie,AsyncHandler(productControllers.HandleCreateProduct));
ProductRouter.route("/update-product").patch(authMiddlewares.AuthenticateJwtCookie,AsyncHandler(productControllers.HandleUpdateProduct));

export default ProductRouter;