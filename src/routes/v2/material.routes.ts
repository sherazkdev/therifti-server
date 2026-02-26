import express from "express";
import type { Router } from "express";

import MaterialControllers from "../../controllers/material.controllers.js";
import MaterialServices from "../../services/material.services.js";
import CategoryServices from "../../services/category.services.js";
import AsyncHandler from "../../utils/AsyncHandler.js";
import AuthMiddlewares from "../../middlewares/auth.middlewares.js";

const MaterialRouter: Router = express.Router();
const categoryServices = new CategoryServices();
const materialServices = new MaterialServices(categoryServices);
const materialControllers = new MaterialControllers(materialServices);
const authMiddlewares = new AuthMiddlewares();

MaterialRouter.route("/create-material").post(authMiddlewares.AuthenticateJwtCookie, AsyncHandler(materialControllers.HandleCreateMaterial));
MaterialRouter.route("/get-materials").post(authMiddlewares.AuthenticateJwtCookie,AsyncHandler(materialControllers.HandleGetMaterials));
MaterialRouter.route("/delete-material/:materialId").delete(authMiddlewares.AuthenticateJwtCookie, AsyncHandler(materialControllers.HandleDeleteMaterial));
MaterialRouter.route("/get-material-by-category/:materialId").get(AsyncHandler(materialControllers.HandleGetMaterialByCategory));
MaterialRouter.route("/update-material").patch(authMiddlewares.AuthenticateJwtCookie, AsyncHandler(materialControllers.HandleUpdateMaterial));

export default MaterialRouter;
