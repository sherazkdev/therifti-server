import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { STATUS_CODES, ERROR_MESSAGES } from "../constants/responseConstants.js";
import NotificationServices from "../services/notification.services.js";
class NotificationControllers {
    notificationServices = new NotificationServices();
}
export default NotificationControllers;
//# sourceMappingURL=notification.controllers.js.map