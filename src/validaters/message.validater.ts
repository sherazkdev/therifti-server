import * as z from "zod";

/** Constants */
import { TYPE_STATUS } from "../interfaces/message.interfaces.js";

/** Note: Validate Send Message */
export const VALIDATE_SEND_MESSAGE = z.object({
    receiverId:z.string().min(24,"Error: Object id at least 24 character"),
    chatId:z.string().min(24,"Error: Object id at least 24 character"),
    content:z.string(),
    type:z.enum(TYPE_STATUS)
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

/** Note: Validate Send Offer */
export const VALIDATE_SEND_OFFER = z.object({
    productId:z.string().min(24,"Error: Object id at least 24 character"),
    receiverId:z.string().min(24,"Error: Object id at least 24 character"),
    offeredPrice:z.number()
});

/** Note: Validate Accecpt Offer */
export const VALIDATE_ACCEPT_OFFER = z.object({
    offerId:z.string().min(24,"Error: Object id at least 24 character")
});

/* Note: Validate Cancle Offer */
export const VALIDATE_CANCEL_OFFER = z.object({
    offerId:z.string().min(24,"Error: Object id at least 24 character")
});
