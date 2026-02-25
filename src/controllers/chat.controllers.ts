/** Response Constants */
import {ERROR_MESSAGES, STATUS_CODES, SUCCESS_MESSAGES} from "../constants/responseConstants.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

/** Note: imports types */
import type {Request,Response} from "express";
import { VALIDATE_CREATE_CHAT,VALIDATE_DELETE_CHAT,VALIDATE_GET_CHATS } from "../validaters/chat.validater.js";

/** Services*/
import ChatServices from "../services/chat.services.js";
import type { UserDocument } from "../interfaces/user.interfaces.js";

class ChatControllers {
    private chatService = new ChatServices();
    
    /**
     * Note: Create a new Chat
     *
     * Purpose:
     * This controller handles the creation of a new chat document between users.
     * It validates the request payload and ensures the authenticated user is
     * added to the chat members list.
     *
     * @param {Request} req - Express request object containing payload and authenticated user.
     * @param {Response} res - Express response object.
     *
     * @returns {Promise<Response>} API response containing the newly created product document.
     *
     * Use cases:
     * - User initiates a chat with another user regarding a product
     * - Ensure chat document is created with correct members and product reference
     *
     * Notes:
     * - Validation is performed using Zod
     * - Authenticated user ID is automatically included in chat members
     * - Returns the newly created chat document
     */
    public HandleCreateChat = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_CREATE_CHAT.safeParse(req.body);
        if(!result.success){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG)
        }
        const userId = (req.user as UserDocument)._id.toString();
        /** Note: Create Chat payload. */
        const createChatPayload = {
            members:[result.data.member,userId],
            productRef:result.data.productRef
        };
        const chatDocument = await this.chatService.CreateChat(createChatPayload);
        return res.status(STATUS_CODES.CREATED).json(
            new ApiResponse(chatDocument,SUCCESS_MESSAGES.CHAT.CHAT_CREATED,true,STATUS_CODES.CREATED)
        )
    };

    /**
     * Note: Get Chats
     *
     * Purpose:
     * This controller retrieves chat documents for a user based on filter criteria.
     *
     * @param {Request} req - Express request object containing filter payload.
     * @param {Response} res - Express response object.
     * 
     * @returns {Promise<Response>} API response containing the newly created product document.
     *
     * Use cases:
     * - User views their chat list
     * - Retrieve all chats the user is a member of
     *
     * Notes:
     * - Validation is performed using Zod
     * - Returns an array of chat documents
     */
    public HandleGetChat = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_GET_CHATS.safeParse(req.body);
        if(!result.success){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG)
        }
        /** Note: Get chats */
        const getChatDocumentsPayload = result.data;
        const chatDocuments = await this.chatService.GetChats(getChatDocumentsPayload);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(chatDocuments,SUCCESS_MESSAGES.CHAT.FETCHED,true,STATUS_CODES.OK)
        )
    };

    /**
     * Note: Delete Chat
     *
     * Purpose:
     * This controller handles the deletion of a chat document by its ID.
     *
     * @param {Request} req - Express request object containing chat ID.
     * @param {Response} res - Express response object.
     * 
     * @returns {Promise<Response>} API response containing the newly created product document.
     *
     * Use cases:
     * - User deletes a chat conversation
     * - Remove the chat from the database
     *
     * Notes:
     * - Validation is performed using Zod
     * - Returns a success response without the deleted chat document
     */
    public HandleDeleteChat = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_DELETE_CHAT.safeParse(req.body);
        if(!result.success){
            throw new ApiError(STATUS_CODES.BAD_REQUEST,result.error?.issues[0]?.message || ERROR_MESSAGES.COMMON.SOMETHING_WENT_WRONG)
        }
        /** Note: Delete Chat. */
        await this.chatService.DeleteChat(result.data.chatId);
        return res.status(STATUS_CODES.ACCEPTED).json(
            new ApiResponse([],SUCCESS_MESSAGES.CHAT.DELETED,true,STATUS_CODES.ACCEPTED)
        )
    };
}

export default ChatControllers;