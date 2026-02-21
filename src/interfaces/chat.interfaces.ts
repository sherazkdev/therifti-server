import type {Types,Document} from "mongoose";

/** Chat Interface */
export interface ChatInterface {
    productRef:Types.ObjectId,
    members:Types.ObjectId[],
    lastMessage:Types.ObjectId
};

export interface ChatDocument extends ChatInterface, Document {};

/** Note: Create Chat Interface */
export interface CreateChatInterface {
    members:string[],
    productRef:string
}
