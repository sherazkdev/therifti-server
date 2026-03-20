import express from "express";
import type { Router } from "express";

import NotificationControllers from "../../controllers/notification.controllers.js";
import NotificationServices from "../../services/notification.services.js";
import AsyncHandler from "../../utils/AsyncHandler.js";
import AuthMiddlewares from "../../middlewares/auth.middlewares.js";

const NotificationRouter: Router = express.Router();
const notificationServices = new NotificationServices();
const notificationControllers = new NotificationControllers(notificationServices);
const authMiddlewares = new AuthMiddlewares();

NotificationRouter.route("/get-notifications").get(authMiddlewares.AuthenticateJwtCookie, AsyncHandler(notificationControllers.HandleGetNotifications));
NotificationRouter.route("/mark-as-read").patch(authMiddlewares.AuthenticateJwtCookie, AsyncHandler(notificationControllers.HandleMarkAsReadNotification));

export default NotificationRouter;
