import * as z from "zod";

/** Note: Validate Send Message */
export const VALIDATE_SEND_MESSAGE = z.object({
    receiverId:z.string().min(24,"Error: Object id at least 24 character"),
    chatId:z.string().min(24,"Error: Object id at least 24 character"),
    content:z.string()
});

/** Note: Validate Delete Message */
export const VALIDATE_DELETE_MESSAGE = z.object({
    messageId:z.string().min(24,"Error: Object id at least 24 character")
});


/** Note: Validate Get Chat Messages */
export const VALIDATE_GET_CHAT_MESSAGES = z.object({
    chatId:z.string().min(24,"Error: Object id at least 24 character"),
    page:z.number().default(1),
    limit:z.number().default(20),
});
