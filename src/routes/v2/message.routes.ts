import express from "express";
import type { Router } from "express";

/** Note: Services */
import MessageServices from "../../services/message.services.js";

/** Note: Controllers */
import MessageControllers from "../../controllers/message.controllers.js";
import AsyncHandler from "../../utils/AsyncHandler.js";
import AuthMiddlewares from "../../middlewares/auth.middlewares.js";

const MessageRouter: Router = express.Router();
const messageServices = new MessageServices();

const messageControllers = new MessageControllers(messageServices);
const authMiddlewares = new AuthMiddlewares();

MessageRouter.route("/send").post(authMiddlewares.AuthenticateJwtCookie, AsyncHandler(messageControllers.HandleSendMessage));
MessageRouter.route("/chat/:chatId").get(authMiddlewares.AuthenticateJwtCookie, AsyncHandler(messageControllers.HandleGetChatMessages));
MessageRouter.route("/delete-message").delete(authMiddlewares.AuthenticateJwtCookie, AsyncHandler(messageControllers.HandleDeleteMessage));

export default MessageRouter;
