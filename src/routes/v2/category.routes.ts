import express from "express";
import type { Router,Request,Response } from "express";

/** Note: Services */
import CategoryServices from "../../services/category.services.js";
import CategoryModel from "../../models/category.model.js";

/* Note: Controllers imports **/
import CategoryControllers from "../../controllers/category.controlles.js";

import AsyncHandler from "../../utils/AsyncHandler.js";
/** Imports Middlewares */
import AuthMiddlewares from "../../middlewares/auth.middlewares.js";
import mongoose from "mongoose";

const CategoryRouter:Router = express.Router();
const categoryService = new CategoryServices();

const categoryControllers = new CategoryControllers(categoryService);
const authMiddlewares = new AuthMiddlewares();

CategoryRouter.route("/get-categories").get(AsyncHandler(categoryControllers.HandleGetCategories));
/** Secure Routes */
CategoryRouter.route("/create-category").get(authMiddlewares.AuthenticateJwtCookie,AsyncHandler(categoryControllers.HandleCreateCategory));
CategoryRouter.route("/delete-category").get(authMiddlewares.AuthenticateJwtCookie,AsyncHandler(categoryControllers.HandleDeleteCategory));
CategoryRouter.route("/update-category").get(authMiddlewares.AuthenticateJwtCookie,AsyncHandler(categoryControllers.HandleUpdateCategory));

export default CategoryRouter;
