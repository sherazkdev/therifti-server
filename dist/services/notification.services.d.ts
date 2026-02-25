import type { CreateNotificationInterface, GetNotificationsInterface, NotificationDocument } from "../interfaces/notification.interface.js";
declare class NotificationServices {
    /**
     * Note: Create Notification Service
     *
     * Purpose:
     * This service is responsible for creating and storing notifications
     * for users when they are offline. These notifications allow users
     * to view missed activities such as new messages or follower actions
     * once they come back online.
     *
     * @param {object} notificationObject - Notification Derails object.
     * @param {string} [notificationObject.recipient_id] - Recipient_id for message owner.
     * @param {string} [notificationObject.type] - Notification Type is message or follower etc.
     * @param {string} [notificationObject.metaData] - MetaData for notification info who is liked product name etc.
     * @param {string} [notificationObject.linkUrl] - LinkUrl click to notification redirect.
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
    CreateNotification(notificationObject: CreateNotificationInterface): Promise<NotificationDocument>;
    /**
     * Note: Get Notifications Service
     *
     * Purpose:
     * This service is responsible for fetching stored notifications
     * for a specific user. It retrieves notification history from
     * the database using aggregation and supports pagination.
     *
     * @param {object} getNotificationObj - Get notifications request object.
     * @param {string} getNotificationObj.userId - User ID of the notification recipient.
     * @param {number} [getNotificationObj.page] - Page number for pagination.
     * @param {number} [getNotificationObj.limit] - Number of notifications per page.
     *
     * Use cases:
     * - Load notification list when user opens notification screen
     * - Fetch older notifications using pagination or infinite scroll
     * - Display missed activities such as messages, followers, or product updates
     *
     * Notes:
     * - Notifications are returned in descending order by creation date
     * - Uses MongoDB aggregation pipeline for better scalability
     * - This service only reads stored notification records
     * - Does not send or trigger real-time notifications
     */
    GetNotifications(getNotificationObj: GetNotificationsInterface): Promise<NotificationDocument[]>;
    /**
     * Note: Mark Notification(s) as Read Service
     *
     * Purpose:
     * This service is responsible for updating the read status
     * of notifications for a specific user. It allows marking
     * a single notification as read or marking all unread
     * notifications as read at once.
     *
     * @param {string} recipientId - User ID of the notification recipient.
     * @param {string} [notificationId] - Specific notification ID to mark as read.
     *
     * Use cases:
     * - User opens a specific notification
     * - User clears all unread notifications from the notification screen
     * - Keep notification read status in sync between client and backend
     *
     * Notes:
     * - If `notificationId` is provided, only that notification is updated
     * - If `notificationId` is not provided, all unread notifications are updated
     * - Updates are restricted to notifications belonging to the recipient
     * - This service does not return updated notification documents
     * - Does not send or trigger real-time notifications
     */
    MarkAsRead(recipientId: string, notificationId?: string): Promise<void>;
}
export default NotificationServices;
//# sourceMappingURL=notification.services.d.ts.map