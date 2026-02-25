import * as z from "zod";
/** Note: Validate Create Chat. */
export declare const VALIDATE_CREATE_CHAT: z.ZodObject<{
    member: z.ZodString;
    productRef: z.ZodString;
}, z.core.$strip>;
/** Note: Validate Delete Chat. */
export declare const VALIDATE_DELETE_CHAT: z.ZodObject<{
    chatId: z.ZodString;
}, z.core.$strip>;
/** Note: Validate Get Chat. */
export declare const VALIDATE_GET_CHATS: z.ZodObject<{
    userId: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=chat.validater.d.ts.map