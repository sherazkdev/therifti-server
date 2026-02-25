import type { Document, Types } from "mongoose";
/** Notificatio metaData */
type NotificationMetaData = {
    /** Item Like */
    actorId: Types.ObjectId;
    actorName?: string;
    entityId: Types.ObjectId;
    itemTitle: string;
} | {
    /** Follow User */
    followerId: Types.ObjectId;
    followerName?: string;
    followedId: Types.ObjectId;
} | {
    /** New Message */
    senderId: Types.ObjectId;
    senderName?: string;
    chatId: Types.ObjectId;
    lastMessage: string;
};
/** Notification Type */
export declare enum NotificationType {
    ITEM_LIKED = "ITEM_LIKED",
    NEW_MESSAGE = "NEW_MESSAGE",
    NEW_FOLLOWER = "NEW_FOLLOWER"
}
/** Notification Status */
export declare enum NotifcationStatus {
    READ = "READ",
    UNREAD = "UNREAD"
}
/** Notifcation Interface */
export interface NotificationInterface {
    recipient_id: Types.ObjectId;
    type: NotificationType;
    metaData: NotificationMetaData;
    linkUrl: string;
    status?: NotifcationStatus;
}
export interface CreateNotificationInterface {
    recipient_id: Types.ObjectId | string;
    type: NotificationType;
    metaData: NotificationMetaData;
    linkUrl: string;
}
export interface GetNotificationsInterface {
    userId: string;
    page: number;
    limit: number;
}
export interface NotificationDocument extends NotificationInterface, Document {
}
export {};
//# sourceMappingURL=notification.interface.d.ts.map