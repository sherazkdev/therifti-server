import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { STATUS_CODES, SUCCESS_MESSAGES, ERROR_MESSAGES } from "../constants/responseConstants.js";
import MessageServices from "../services/message.services.js";
class MessageControllers {
    messageServices = new MessageServices();
}
export default MessageControllers;
//# sourceMappingURL=message.controllers.js.map