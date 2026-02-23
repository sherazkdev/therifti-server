import NotificationModel from "../models/notification.model.js";
import ApiError from "../utils/ApiError.js";
import { ERROR_MESSAGES, STATUS_CODES } from "../constants/responseConstants.js";
import mongoose from "mongoose";
import type { CreateNotificationInterface, NotificationDocument } from "../interfaces/notification.interface.js";


class NotificationServices {
    
    /**
     * Note: Create Notification Service
     *
     * Purpose:
     * This service is responsible for creating and storing notifications
     * for users when they are offline. These notifications allow users
     * to view missed activities such as new messages or follower actions
     * once they come back online.
     *
     * Use cases:
     * - New message received while the recipient is offline
     * - Follower activity while the user is offline
     * - Product price drop notification for followers
     * - Product sold notification for users who added the product to their wishlist
     *
     * Notes:
     * - Notifications are stored as history records
     * - This service does not send real-time notifications
     * - Used only when the recipient is offline
    */
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
