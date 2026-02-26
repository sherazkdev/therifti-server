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

export default ProductRouter;