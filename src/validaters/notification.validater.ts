import * as z from "zod";

/** Note: Validate Mark as Read Notification. */
export const VALIDATE_MARK_AS_NOTIFICATION = z.object({
    notificationId:z.string().min(24,"Error: Object id at least 24 character").optional()
});

/** Note: Validate Get Notifications. */
export const VALIDATE_GET_NOTIFICATIONS = z.object({
    page:z.number().default(1),
    limit:z.number().default(10)
});
