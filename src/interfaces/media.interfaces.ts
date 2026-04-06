import type {Types,Document} from "mongoose";

/** Media Interface */
export interface MediaInterface {
    productId:Types.ObjectId | null,
    messageId:Types.ObjectId | null,
    publicId:string,
    mediaUrl:string,
};


/** Note: Delete Media Interface */
export interface DeleteMediaInterface {
    messageId?:string,
    productId?:string
}

/** Media Document with types */
export interface MediaDocument extends MediaInterface, Document {};