import express from "express";
/* Note: Controllers imports **/
import ChatControllers from "../../controllers/chat.controllers.js";
import AsyncHandler from "../../utils/AsyncHandler.js";
/** Imports Middlewares */
import AuthMiddlewares from "../../middlewares/auth.middlewares.js";
const ChatRouter = express.Router();
const chatControllers = new ChatControllers();
const authMiddlewares = new AuthMiddlewares();
ChatRouter.use(authMiddlewares.AuthenticateJwtCookie);
/** Secure Routes */
ChatRouter.route("/create-chat").post(AsyncHandler(chatControllers.HandleCreateChat));
ChatRouter.route("/delete-chat/:chatId").delete(AsyncHandler(chatControllers.HandleDeleteChat));
ChatRouter.route("/get-chats").get(AsyncHandler(chatControllers.HandleGetChat));
export default ChatRouter;
//# sourceMappingURL=chat.routes.js.map