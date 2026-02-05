import express from "express";
import type { Router } from "express";

/* Note: UserControllers imports **/
import ProductControllers from "../../controllers/product.controllers.js";
import AsyncHandler from "../../utils/AsyncHandler.js";
/** Imports Middlewares */
import AuthMiddlewares from "../../middlewares/auth.middlewares.js";

const ProductRouter:Router = express.Router();
const productControllers = new ProductControllers();
const authMiddlewares = new AuthMiddlewares();

export default ProductRouter;