import type {Types,Document} from "mongoose";

/** Message Status */
export enum MessageStatus {
    SENT = "SENT",
    DELIVERD = "DELIVERD",
    SEEN = "SEEN"
};

/** Message Interface */
export interface MessageInterface {
    chatId:Types.ObjectId,
    senderId:Types.ObjectId,
    receiverId:Types.ObjectId,
    content:string,
    status:MessageStatus,
};

export interface SendMessageInterface {
	chatId: string;
	senderId: string;
	receiverId: string;
	content: string;
}

export interface GetChatMessagesInterface {
    chatId:string,
    page?:number,
    limit?:number,
}

export interface MarkMessagesAsSeenInterface {
    chatId:string,
    receiverId:string
}

export interface DeleteMessageInterface {
    messageId:string
}

/** Message Document */
export interface MessageDocument extends MessageInterface, Document {};