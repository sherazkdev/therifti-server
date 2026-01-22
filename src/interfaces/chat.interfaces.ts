import type {Types,Document} from "mongoose";

/** Chat Interface */
export interface ChatInterface {
    members:Types.ObjectId[],
    lastMessage:Types.ObjectId
};

export interface ChatDocument extends ChatInterface, Document {}
