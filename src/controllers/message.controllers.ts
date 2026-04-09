/** Response Constants */
import {ERROR_MESSAGES, STATUS_CODES, SUCCESS_MESSAGES} from "../constants/responseConstants.js";
import ApiError from "../utils/ApiError.js";

/** Note: imports types */
import type {Request,Response} from "express";
import {VALIDATE_ACCEPT_OFFER, VALIDATE_CANCEL_OFFER, VALIDATE_DELETE_MESSAGE,VALIDATE_GET_CHAT_MESSAGES,VALIDATE_SEND_MESSAGE, VALIDATE_SEND_OFFER} from "../validaters/message.validater.js";
import ApiResponse from "../utils/ApiResponse.js";

/** Services*/
import type MessageServices from "../services/message.services.js";
import type { UserDocument } from "../interfaces/user.interfaces.js";

class MessageControllers {
    private messageServices: MessageServices;

    constructor(messageServices:MessageServices){
        this.messageServices = messageServices;
    }

    /**
     * Note: Handle Get Chat Messages
     *
     * Purpose:
     * This controller handles fetching chat messages for a given conversation.
     * It validates the incoming request payload using Zod and delegates the
     * retrieval logic to MessageService.
     *
     * @param {Request} req - Express request object containing chat query parameters
     *                        and authenticated user information.
     * @param {Response} res - Express response object.
     *
     * @returns {Promise<Response>} API response containing fetched chat messages.
     *
     * Use cases:
     * - Fetch all messages for a conversation.
     * - Fetch messages with pagination or filters (depending on payload).
     *
     * Notes:
     * - Validation is performed using Zod schema (VALIDATE_GET_CHAT_MESSAGES).
     * - Throws ApiError if validation fails.
     * - Returns HTTP 200 (OK) on success.
     */
    public HandleGetChatMessages = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_GET_CHAT_MESSAGES.parse(req.params);

        /** Note: Chat Messages payload. */
        const chatMessagesPayload = result;
        const chatMessagesDocuments = await this.messageServices.GetChatMessages(chatMessagesPayload);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(chatMessagesDocuments,SUCCESS_MESSAGES.MESSAGE.FETCHED,true,STATUS_CODES.OK)
        )
    };

    /**
     * Note: Handle Delete Message
     *
     * Purpose:
     * This controller handles deleting a specific chat message.
     * It validates the request payload using Zod and delegates deletion
     * to MessageService.
     *
     * @param {Request} req - Express request object containing message ID
     *                        and authenticated user information.
     * @param {Response} res - Express response object.
     *
     * @returns {Promise<Response>} API response indicating the message was deleted.
     *
     * Use cases:
     * - User deletes a single message from a conversation.
     *
     * Notes:
     * - Validation is performed using Zod schema (VALIDATE_DELETE_MESSAGE).
     * - Throws ApiError if validation fails.
     * - Returns HTTP 202 (Accepted) on success.
     */
    public HandleDeleteMessage = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_DELETE_MESSAGE.parse(req.body);

        /** Note: Delete Message Payload. */
        const deleteMessagePayload = result;
        await this.messageServices.DeleteMessage(deleteMessagePayload);
        return res.status(STATUS_CODES.ACCEPTED).json(
            new ApiResponse([],SUCCESS_MESSAGES.MESSAGE.DELETED,true,STATUS_CODES.ACCEPTED)
        )
    };

    /**
     * Note: Handle Send Message
     *
     * Purpose:
     * This controller handles sending a new chat message.
     * It validates the request payload using Zod, appends the authenticated
     * sender ID, and delegates sending logic to MessageService.
     *
     * @param {Request} req - Express request object containing message content
     *                        and authenticated user information.
     * @param {Response} res - Express response object.
     *
     * @returns {Promise<Response>} API response indicating the message was sent.
     *
     * Use cases:
     * - User sends a new message in a conversation.
     *
     * Notes:
     * - Validation is performed using Zod schema (VALIDATE_SEND_MESSAGE).
     * - Sender ID is extracted from req.user and appended to payload.
     * - Throws ApiError if validation fails.
     * - Returns HTTP 202 (Accepted) on success.
     */
    public HandleSendMessage = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_SEND_MESSAGE.parse(req.body);

        const {_id, avatar, fullname} = req.user as UserDocument;
        /** Note: Send Message Payload. */
        const sendMessagePayload = {...result,sender:{
            _id:_id.toString(),
            avatar,
            fullname
        }};
        await this.messageServices.SendMessage(sendMessagePayload);
        return res.status(STATUS_CODES.ACCEPTED).json(
            new ApiResponse([],SUCCESS_MESSAGES.MESSAGE.MESSAGE_SENDED,true,STATUS_CODES.ACCEPTED)
        )
    };

    /** -------- In Progress ----------- */
    // public HandleMessageAsSeen = async (req:Request,res:Response):Promise<Response> => {};

    public HandleSendOffer = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_SEND_OFFER.parse(req.body);
        /** Note: Send Offer Payload */
        const sendOfferPayload = {...result,senderId:(req.user as UserDocument)._id.toString()};
        const responseData = await this.messageServices.SendOffer(sendOfferPayload);
        return res.status(STATUS_CODES.OK).json(
            new ApiResponse(responseData,SUCCESS_MESSAGES.MESSAGE.OFFER_SENDED,true,STATUS_CODES.OK)
        )
    };

    public HandleAcceptOffer = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_ACCEPT_OFFER.parse(req.params);
        /** Note: Accept Offer Payload */
        const acceptOfferPayload = {...result};
        await this.messageServices.AcceptOffer(acceptOfferPayload);
        return res.status(STATUS_CODES.ACCEPTED).json(
            new ApiResponse([],SUCCESS_MESSAGES.MESSAGE.OFFER_ACCEPTED,true,STATUS_CODES.ACCEPTED)
        );
    };
    
    public HandleCancelOffer = async (req:Request,res:Response):Promise<Response> => {
        const result = VALIDATE_CANCEL_OFFER.parse(req.params);
        /** Note: Cancel Offer Payload */
        const cancleOfferPayload = {...result};
        await this.messageServices.CancelOffer(cancleOfferPayload);
        return res.status(STATUS_CODES.ACCEPTED).json(
            new ApiResponse([],SUCCESS_MESSAGES.MESSAGE.OFFER_CANCELLED,true,STATUS_CODES.ACCEPTED)
        );
    };
}

export default MessageControllers;
