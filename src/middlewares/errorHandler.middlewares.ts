import ApiError from "../utils/ApiError.js";
import env from "../constants/loadEnv.js";

import type {Request,Response,NextFunction} from "express";
import { ZodError } from "zod";
import { ERROR_CODES, STATUS_CODES } from "../constants/responseConstants.js";

export default async function ErrorHandler (err:unknown,req:Request,res:Response,next:NextFunction):Promise<Response> {

    if(err instanceof ApiError){
        console.log(err);
        return res.status(err.statusCode).json({
            message:err.message,
            success:false,
            statusCode:err.statusCode,
            stack:env.NODE_ENV === "PRODUCTION" ? err.stack : null,
            errors:err.errors || []
        });
    }

    if(err instanceof ZodError){
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            message:ERROR_CODES.VALIDATION.FAILED,
            statusCode:STATUS_CODES.BAD_REQUEST,
            stack:env.NODE_ENV === "PRODUCTION" ? err.stack : null,
            errors:err.issues.map( (e) => ({field:e.path.join(", "),message:e.message}))
        });
    }
    console.log(err)
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        stack: env.NODE_ENV === "PRODUCTION" ? (err as Error)?.stack : null,
    });
}