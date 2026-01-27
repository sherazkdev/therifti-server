import type { Types, Document } from "mongoose";
/** Message Status */
export declare enum MessageStatus {
    SENT = "SENT",
    DELIVERD = "DELIVERD",
    SEEN = "SEEN"
}
/** Message Interface */
export interface MessageInterface {
    chatId: Types.ObjectId;
    senderId: Types.ObjectId;
    receiverId: Types.ObjectId;
    content: string;
    status: MessageStatus;
}
/** Message Document */
export interface MessageDocument extends MessageInterface, Document {
}
//# sourceMappingURL=message.interfaces.d.ts.map