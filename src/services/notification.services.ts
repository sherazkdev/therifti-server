import NotificationModel from "../models/notification.model.js";
import ApiError from "../utils/ApiError.js";
import { ERROR_MESSAGES, STATUS_CODES } from "../constants/responseConstants.js";
import mongoose from "mongoose";
import type { CreateNotificationInterface, NotificationDocument } from "../interfaces/notification.interface.js";


class NotificationServices {
    public async CreateNotification(notificationObject: CreateNotificationInterface): Promise<NotificationDocument> {
        const { recipient_id, type, metaData, linkUrl } = notificationObject;

        const notification = await NotificationModel.create({
            recipient_id: new mongoose.Types.ObjectId(recipient_id as string),
            type,
            metaData,
            linkUrl
        });
        return notification;
    }

    public async GetNotifications(recipientId: string, page = 1, limit = 20): Promise<NotificationDocument[]> {
        const skip = (page - 1) * limit;
        const notifications = await NotificationModel.find({
            recipient_id: new mongoose.Types.ObjectId(recipientId)
        }).sort({ createdAt: -1 }).skip(skip).limit(limit);
        return notifications;
    }

    public async MarkAsRead(recipientId: string, notificationId?: string): Promise<void> {
        if (notificationId) {
            await NotificationModel.updateOne({
                _id: new mongoose.Types.ObjectId(notificationId),
                recipient_id: new mongoose.Types.ObjectId(recipientId)
            }, { $set: { status: "READ" } });
        } else {
            await NotificationModel.updateMany({
                recipient_id: new mongoose.Types.ObjectId(recipientId),
                status: { $ne: "READ" }
            }, { $set: { status: "READ" } });
        }
        return;
    }
}

export default NotificationServices;
