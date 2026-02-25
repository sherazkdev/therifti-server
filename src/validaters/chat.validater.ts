import * as z from "zod";

/** Note: Validate Create Chat. */
export const VALIDATE_CREATE_CHAT = z.object({
    member:z.string().min(24,"Error: Object id at least 24 character"),
    productRef:z.string().min(24,"Error: Object id at least 24 character")
});

/** Note: Validate Delete Chat. */
export const VALIDATE_DELETE_CHAT = z.object({
    chatId:z.string().min(24,"Error: Object id at least 24 character")
});

/** Note: Validate Get Chat. */
export const VALIDATE_GET_CHATS = z.object({
    userId:z.string().min(24,"Error: Object id at least 24 character")
});
