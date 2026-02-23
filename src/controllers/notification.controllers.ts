import type { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { STATUS_CODES, ERROR_MESSAGES } from "../constants/responseConstants.js";
import NotificationServices from "../services/notification.services.js";

class NotificationControllers {
    private notificationServices = new NotificationServices();

    public HandleGetNotifications = async (req: Request, res: Response): Promise<Response> => {
        const userId = (req.user as any)?._id?.toString() || req.query.userId;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
        if (!userId) throw new ApiError(STATUS_CODES.BAD_REQUEST, ERROR_MESSAGES.COMMON.INVALID_ID);
        const notifications = await this.notificationServices.GetNotifications(userId.toString(), page, limit);
        return res.status(STATUS_CODES.OK).json(new ApiResponse(notifications, "Notifications fetched.", true, STATUS_CODES.OK));
    }

    public HandleMarkAsRead = async (req: Request, res: Response): Promise<Response> => {
        const userId = (req.user as any)?._id?.toString() || req.body.userId;
        const { notificationId } = req.body;
        if (!userId) throw new ApiError(STATUS_CODES.BAD_REQUEST, ERROR_MESSAGES.COMMON.INVALID_ID);
        await this.notificationServices.MarkAsRead(userId.toString(), notificationId);
        return res.status(STATUS_CODES.OK).json(new ApiResponse([], "Notifications updated.", true, STATUS_CODES.OK));
    }
}

export default NotificationControllers;
import mongoose from "mongoose";

