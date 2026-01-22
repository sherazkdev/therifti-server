import mongoose from "mongoose";
/** Types */
import { NotificationType, NotifcationStatus } from "../interfaces/notification.interface";
/** NotificationSchema */
const NotificationSchema = new mongoose.Schema({
    recipient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
        required: true
    },
    metaData: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    linkUrl: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: Object.values(NotificationType),
        required: true
    },
    status: {
        type: String,
        enum: Object.values(NotifcationStatus),
        default: NotifcationStatus.UNREAD
    }
}, { timestamps: true });
/** Notification Model */
const NotificationModel = mongoose.model("Notification", NotificationSchema);
export default NotificationModel;
//# sourceMappingURL=notification.model.js.map