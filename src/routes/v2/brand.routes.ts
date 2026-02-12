import express from "express";
import type { Router } from "express";

/* Note: BrandControllers imports **/
import BrandControllers from "../../controllers/brand.controllers.js";
import AsyncHandler from "../../utils/AsyncHandler.js";

/** Imports Middlewares */
import AuthMiddlewares from "../../middlewares/auth.middlewares.js";

const BrandRouter:Router = express.Router();
const brandControllers = new BrandControllers();
const authMiddlewares = new AuthMiddlewares();