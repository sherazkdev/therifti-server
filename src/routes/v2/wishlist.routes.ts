import express from "express";
import type { Router } from "express";

/** Note: Services */
import WishlistServices from "../../services/wishlist.services.js";

/* Note: Controllers imports **/
import WishlistControllers from "../../controllers/wishlist.controllers.js";

import AsyncHandler from "../../utils/AsyncHandler.js";
/** Imports Middlewares */
import AuthMiddlewares from "../../middlewares/auth.middlewares.js";

const WishlistRouter:Router = express.Router();
const wishlistServices = new WishlistServices();

const wishlistControllers = new WishlistControllers(wishlistServices);
const authMiddlewares = new AuthMiddlewares();

WishlistRouter.use(authMiddlewares.AuthenticateJwtCookie);
/* Secure Routes **/
WishlistRouter.route("/add-to-wishlist").post(AsyncHandler(wishlistControllers.HandleAddToWishlist));
WishlistRouter.route("/remove-to-wishlist/:wishlistId").delete(AsyncHandler(wishlistControllers.HandleRemoveToWishlist));
WishlistRouter.route("/get-wishlist").get(AsyncHandler(wishlistControllers.HandleGetWishlists));

export default WishlistRouter;