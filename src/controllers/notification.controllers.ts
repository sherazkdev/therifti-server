/** Response Constants */
import {ERROR_MESSAGES, STATUS_CODES, SUCCESS_MESSAGES} from "../constants/responseConstants.js";
import ApiError from "../utils/ApiError.js";

/** Note: imports types */
import type {Request,Response} from "express";
import {VALIDATE_GET_NOTIFICATIONS,VALIDATE_MARK_AS_NOTIFICATION} from "../validaters/notification.validater.js";
import ApiResponse from "../utils/ApiResponse.js";
import type { UserDocument } from "../interfaces/user.interfaces.js";

/** Services*/
import type NotificationServices from "../services/notification.services.js";

class NotificationControllers {
    private notificationServices: NotificationServices;

    constructor(notificationServices:NotificationServices){
        this.notificationServices = notificationServices;
    }
    
    /**
     * Note: Handle Mark As Read Notification
     *
     * Purpose:
     * This controller handles marking one or multiple notifications as read
     * for the authenticated user.
     *
     * It validates the request payload using Zod and delegates the business
     * logic to NotificationService.
     *
     * @param {Request} req - Express request object containing notification IDs
     *                        and authenticated user information.
     * @param {Response} res - Express response object.
     *
     * @returns {Promise<Response>} API response indicating notifications
     *                             were successfully marked as read.
     *
     * Use cases:
     * - User marks a single notification as read.
     * - User marks multiple notifications as read at once.
     *
     * Notes:
     * - Validation is performed using Zod schema (VALIDATE_MARK_AS_NOTIFICATION).
     * - User ID is extracted from req.user and appended to payload.
     * - Throws ApiError if validation fails.
     * - Returns HTTP 202 (Accepted) on success.
     */
    public HandleMarkAsReadNotification = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_MARK_AS_NOTIFICATION.parse(req.body);

        /** Note: Mark as read payload. */
        const markAsReadPayload = {...result,userId:(req.user as UserDocument)._id.toString()};
        await this.notificationServices.MarkAsRead(markAsReadPayload);
        return res.status(STATUS_CODES.ACCEPTED).json(
            new ApiResponse([],SUCCESS_MESSAGES.NOTIFICATION.READED,true,STATUS_CODES.ACCEPTED)
        )
    };

    /**
     * Note: Handle Get Notifications
     *
     * Purpose:
     * This controller retrieves notifications for the authenticated user
     * based on provided filters (e.g., pagination, read/unread status).
     *
     * It validates request data using Zod and delegates fetching logic
     * to NotificationService.
     *
     * @param {Request} req - Express request object containing notification
     *                        query/filter payload and authenticated user data.
     * @param {Response} res - Express response object.
     *
     * @returns {Promise<Response>} API response containing a list of
     *                             user notifications.
     *
     * Use cases:
     * - User fetches all notifications.
     * - User fetches only unread notifications.
     * - User fetches notifications with pagination.
     *
     * Notes:
     * - Validation is performed using Zod schema (VALIDATE_GET_NOTIFICATIONS).
     * - User ID is appended to payload for scoped data access.
     * - Throws ApiError if validation fails.
     * - Returns HTTP 200 (OK) with notification list on success.
     */
    public HandleGetNotifications = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_GET_NOTIFICATIONS.parse(req.query);

        /** Note: Get notifications payload. */
        const getNotificationsPayload = {...result,userId:(req.user as UserDocument)._id.toString()};
        const notificationDocuments = await this.notificationServices.GetNotifications(getNotificationsPayload);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(notificationDocuments,SUCCESS_MESSAGES.NOTIFICATION.FETCHED,true,STATUS_CODES.OK)
        )
    };

}

export default NotificationControllers;

