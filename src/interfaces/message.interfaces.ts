import type {Types,Document} from "mongoose";

/** Message Status */
export enum MessageStatus {
    DELETED = "DELETED",
    ENABLED = "ENABLED",
};

export const OFFER_STATUS = ["PENDING","ACCEPTED"] as const;
export const SEEN_STATUS = ["SENT","SEEN"] as const;
export const TYPE_STATUS = ["TEXT","OFFER","FILE"] as const;
export type offerStatus = typeof OFFER_STATUS[number];
export type SeenStatus = typeof SEEN_STATUS[number];
export type TypeStatus = typeof TYPE_STATUS[number];

/** Message Interface */
export interface MessageInterface {
    chatId:Types.ObjectId,
    senderId:Types.ObjectId,
    receiverId:Types.ObjectId,
    offer?:{
        previousOfferId:Types.ObjectId | null,
        offeredPrice:number,
        status:offerStatus,
    },
    content:string,
    type:TypeStatus,
    seen:SeenStatus,
    status:MessageStatus,
};

export interface SendMessageInterface {
	chatId: string;
	sender: {
        fullname:string | null | undefined,
        _id:string,
        avatar:string | null | undefined
    };
	receiverId: string;
	content: string;
    type:TypeStatus
};

export interface SendOffferInterface {
    senderId:string,
    receiverId:string,
    productId:string,
    offeredPrice:number,
};

export interface CancelOfferInterface {
    offerId:string
};

export interface AcceptOfferInterface {
    offerId:string
};

export interface CancelOfferInterface {
    offerId:string
};

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