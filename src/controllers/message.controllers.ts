import type { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { STATUS_CODES, SUCCESS_MESSAGES, ERROR_MESSAGES } from "../constants/responseConstants.js";
import MessageServices from "../services/message.services.js";

class MessageControllers {
    private messageServices = new MessageServices();

  
}

export default MessageControllers;
