import mongoose from "mongoose";
/** Types */
import { type NotificationDocument } from "../interfaces/notification.interface";
/** Notification Model */
declare const NotificationModel: mongoose.Model<NotificationDocument, {}, {}, {}, mongoose.Document<unknown, {}, NotificationDocument, {}, mongoose.DefaultSchemaOptions> & NotificationDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, NotificationDocument>;
export default NotificationModel;
//# sourceMappingURL=notification.model.d.ts.map