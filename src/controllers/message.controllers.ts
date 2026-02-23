import type { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { STATUS_CODES, SUCCESS_MESSAGES, ERROR_MESSAGES } from "../constants/responseConstants.js";
import MessageServices from "../services/message.services.js";

class MessageControllers {
    private messageServices = new MessageServices();

    public HandleSendMessage = async (req: Request, res: Response): Promise<Response> => {
        const { chatId, senderId, receiverId, content } = req.body;
        if (!chatId || !senderId || !receiverId || !content) {
            throw new ApiError(STATUS_CODES.BAD_REQUEST, ERROR_MESSAGES.CHAT.MESSAGE_FAILED);
        }
        const message = await this.messageServices.SendMessage({ chatId, senderId, receiverId, content });
        return res.status(STATUS_CODES.OK).json(new ApiResponse(message, SUCCESS_MESSAGES.CHAT.MESSAGE_SENT, true, STATUS_CODES.OK));
    }

    public HandleGetMessages = async (req: Request, res: Response): Promise<Response> => {
        const chatId = req.params.chatId || req.query.chatId;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 50;
        if (!chatId) throw new ApiError(STATUS_CODES.BAD_REQUEST, ERROR_MESSAGES.COMMON.INVALID_ID);
        const messages = await this.messageServices.GetMessagesByChat(chatId.toString(), page, limit);
        return res.status(STATUS_CODES.OK).json(new ApiResponse(messages, "Messages fetched.", true, STATUS_CODES.OK));
    }

    public HandleMarkAsSeen = async (req: Request, res: Response): Promise<Response> => {
        const { chatId } = req.body;
        const receiverId = (req.user as any)?._id?.toString() || req.body.receiverId;
        if (!chatId || !receiverId) throw new ApiError(STATUS_CODES.BAD_REQUEST, ERROR_MESSAGES.COMMON.INVALID_ID);
        await this.messageServices.MarkMessagesAsSeen(chatId.toString(), receiverId.toString());
        return res.status(STATUS_CODES.OK).json(new ApiResponse([], "Marked as seen.", true, STATUS_CODES.OK));
    }
}

export default MessageControllers;
