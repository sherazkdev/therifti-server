import MediaModel from "../models/media.model.js";
import mongoose from "mongoose";
import cloudinary from "../configs/cloudinary/cloudinary.js";

/** Response Constants */
import {ERROR_CODES, ERROR_MESSAGES, STATUS_CODES} from "../constants/responseConstants.js";
import ApiError from "../utils/ApiError.js";
import type { MediaDocument, DeleteMediaInterface } from "../interfaces/media.interfaces.js";


class MediaServices {

    public async CreateMedia(mediaObj:MediaDocument[] | MediaDocument):Promise<void> {
        const mediaArray:MediaDocument[] = Array.isArray(mediaObj) ? mediaObj : [mediaObj];
        
        const CHUNK_SIZE = 3;
        for( let i = 0; CHUNK_SIZE < mediaArray.length; i += CHUNK_SIZE ){
            const chunk = mediaArray.slice(i, i + CHUNK_SIZE);

            const documents = chunk.map( ({ mediaUrl, publicId, productId, messageId}) => {
                /** Note: Save Document */
                const mediaDocument = {
                    productId: productId && new mongoose.Types.ObjectId(productId) || null,
                    messageId: messageId && new mongoose.Types.ObjectId(messageId) || null,
                    publicId,
                    mediaUrl
                };
                return mediaDocument;
            });
            await MediaModel.insertMany(documents);
        };
        return;
    };

    public async DeleteMedia(mediaObj:DeleteMediaInterface):Promise<void> {
        const {messageId,productId} = mediaObj;
        /** Note: Check if message and productId is exist on field is required. */
        if( (!messageId || !productId) ) throw new ApiError(STATUS_CODES.BAD_REQUEST,ERROR_CODES.COMMON.NOT_FOUND);
        const documents = await MediaModel.find({
            $or:[
                {messageId: new mongoose.Types.ObjectId(messageId)},
                {productId: new mongoose.Types.ObjectId(productId)}
            ]
        });

        const mediaArray = Array.isArray(documents) ? documents : [documents];

        const CHUNK_SIZE = 10;
        for( let i = 0; CHUNK_SIZE < mediaArray.length; i += CHUNK_SIZE ){
            const chunk = mediaArray.slice(i, i + CHUNK_SIZE);
            const chunkIds = chunk.map((m) => m.publicId.toString());

            const response = await cloudinary.api.delete_resources(chunkIds);
            /** Note: Delete MediaDocuments */
            await MediaModel.deleteMany({ publicId:{$in: chunkIds}});
        };
        return;
    };
};

export default MediaServices;