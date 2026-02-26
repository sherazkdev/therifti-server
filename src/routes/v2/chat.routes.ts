import express from "express";
import type { Router } from "express";

/** Note: Services */
import ChatServices from "../../services/chat.services.js";

/* Note: Controllers imports **/
import ChatControllers from "../../controllers/chat.controllers.js";

import AsyncHandler from "../../utils/AsyncHandler.js";
/** Imports Middlewares */
import AuthMiddlewares from "../../middlewares/auth.middlewares.js";

const ChatRouter:Router = express.Router();
const chatServices = new ChatServices();

const chatControllers = new ChatControllers(chatServices);
const authMiddlewares = new AuthMiddlewares();

ChatRouter.use(authMiddlewares.AuthenticateJwtCookie);
/** Secure Routes */
ChatRouter.route("/create-chat").post(AsyncHandler(chatControllers.HandleCreateChat));
ChatRouter.route("/delete-chat/:chatId").delete(AsyncHandler(chatControllers.HandleDeleteChat));
ChatRouter.route("/get-chats").get(AsyncHandler(chatControllers.HandleGetChat));

export default ChatRouter;