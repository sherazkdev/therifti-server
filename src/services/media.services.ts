import MediaModel from "../models/media.model.js";
import mongoose from "mongoose";
import cloudinary from "../configs/cloudinary/cloudinary.js";

/** Response Constants */
import {ERROR_CODES, ERROR_MESSAGES, STATUS_CODES} from "../constants/responseConstants.js";
import ApiError from "../utils/ApiError.js";
import type { MediaDocument, DeleteMediaInterface, CreateMediaDocumentInterface, CreateMediaResponse } from "../interfaces/media.interfaces.js";


class MediaServices {

    public async CreateMedia(mediaObj:CreateMediaDocumentInterface[]):Promise<CreateMediaResponse | null> {
        const mediaArray = mediaObj;

        var uploadedDocuments:CreateMediaResponse | null = null;
        const CHUNK_SIZE = 3;
        for( let i = 0; i < mediaArray.length; i += CHUNK_SIZE ){
            const chunk = mediaArray.slice(i, i + CHUNK_SIZE);

            const documents = chunk.map( ({secureUrl,publicId}) => {
                /** Note: Save Document */
                const mediaDocument = {
                    publicId,
                    secureUrl
                };
                return mediaDocument;
            });
            const mediaDocuments = await MediaModel.insertMany(documents,{rawResult: true});
            uploadedDocuments = {...mediaDocuments,insertedIds:Object.values(mediaDocuments.insertedIds)};
            if (!uploadedDocuments) {
                throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, ERROR_CODES.COMMON.SOMETHING_WENT_WRONG);
            }
        }
        return uploadedDocuments;
    };

    public async DeleteMedia(mediaObj:DeleteMediaInterface):Promise<void> {
        const {mediaId} = mediaObj;
        /** Note: Check if message and productId is exist on field is required. */
        const documents = await MediaModel.findById(new mongoose.Types.ObjectId(mediaId));

        const mediaArray = Array.isArray(documents) ? documents : [documents];

        const CHUNK_SIZE = 10;
        for( let i = 0; i < mediaArray.length; i += CHUNK_SIZE ){
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