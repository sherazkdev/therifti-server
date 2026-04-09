import express from "express";
import type { Router } from "express";

/** Note: Services */
import MessageServices from "../../services/message.services.js";
import ChatServices from "../../services/chat.services.js";

/** Note: Controllers */
import MessageControllers from "../../controllers/message.controllers.js";
import AsyncHandler from "../../utils/AsyncHandler.js";
import AuthMiddlewares from "../../middlewares/auth.middlewares.js";


const MessageRouter: Router = express.Router();
const chatServices = new ChatServices();
const messageServices = new MessageServices(chatServices);

const messageControllers = new MessageControllers(messageServices);
const authMiddlewares = new AuthMiddlewares();

MessageRouter.route("/send").post(authMiddlewares.AuthenticateJwtCookie, AsyncHandler(messageControllers.HandleSendMessage));
MessageRouter.route("/chatMessages/:chatId").get(authMiddlewares.AuthenticateJwtCookie, AsyncHandler(messageControllers.HandleGetChatMessages));
MessageRouter.route("/delete-message").patch(authMiddlewares.AuthenticateJwtCookie, AsyncHandler(messageControllers.HandleDeleteMessage));
MessageRouter.route("/:offerId/accept").patch(authMiddlewares.AuthenticateJwtCookie, AsyncHandler(messageControllers.HandleAcceptOffer));
MessageRouter.route("/:offerId/cancel").patch(authMiddlewares.AuthenticateJwtCookie, AsyncHandler(messageControllers.HandleCancelOffer));
MessageRouter.route("/send-offer").post(authMiddlewares.AuthenticateJwtCookie, AsyncHandler(messageControllers.HandleSendOffer));

export default MessageRouter;
