import type {Request,Response,NextFunction} from "express";
import ApiError from "../utils/ApiError.js";
import env from "../constants/loadEnv.js";
export default async function ErrorHandler (err:any,req:Request,res:Response,next:NextFunction):Promise<Response> {
    
    if(err instanceof ApiError){
        return res.status(err.statusCode).json({
            message:err.message,
            success:false,
            stack:env.NODE_ENV === "PRODUCTION" ? err.stack : null,
            errors:err.errors || []
        })
    }

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        stack: env.NODE_ENV === "PRODUCTION" ? err?.stack : null,
    });
}