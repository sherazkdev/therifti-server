import express from "express";
import type { Router } from "express";

import MessageControllers from "../../controllers/message.controllers.js";
import AsyncHandler from "../../utils/AsyncHandler.js";
import AuthMiddlewares from "../../middlewares/auth.middlewares.js";

const MessageRouter: Router = express.Router();
const messageControllers = new MessageControllers();
const authMiddlewares = new AuthMiddlewares();

MessageRouter.route("/send").post(authMiddlewares.AuthenticateJwtCookie, AsyncHandler(messageControllers.HandleSendMessage));
MessageRouter.route("/chat/:chatId").get(authMiddlewares.AuthenticateJwtCookie, AsyncHandler(messageControllers.HandleGetMessages));
MessageRouter.route("/mark-seen").post(authMiddlewares.AuthenticateJwtCookie, AsyncHandler(messageControllers.HandleMarkAsSeen));

export default MessageRouter;
