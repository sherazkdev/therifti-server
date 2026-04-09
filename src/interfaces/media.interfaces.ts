import type {Types,Document} from "mongoose";

export interface MediaInterface {
    publicId:string;
    secureUrl:string;
};


/** Note: Delete Media Interface */
export interface DeleteMediaInterface {
    mediaId:string;
};

/** @type Create Media Document Interface */
export interface CreateMediaDocumentInterface {
    publicId:string;
    secureUrl:string;
};

/** @type : Create Media Document Interface Response */
export interface CreateMediaResponse {
  acknowledged: boolean;
  insertedCount: number;
  insertedIds: Types.ObjectId[];
}

/** @type Create Product Image Interface */
export interface CreateProductImageInterface {
  publicId:string,
  secureUrl:string
};

/** Media Document with types */
export interface MediaDocument extends MediaInterface, Document {};