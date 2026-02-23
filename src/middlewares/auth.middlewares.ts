
import cookie from "cookie";
/** Envorments variables */
import env from "../constants/loadEnv.js";
/** Types */
import type { Socket } from "socket.io";
import type { NextFunction,Request,Response } from "express";
import UserServices from "../services/user.services.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { ERROR_MESSAGES, STATUS_CODES } from "../constants/responseConstants.js";
import UserModel from "../models/user.model.js";
import type { JwtPayloadInterface } from "../interfaces/auth.interfaces.js";
import mongoose from "mongoose";
import type { UserDocument } from "../interfaces/user.interfaces.js";

class AuthMiddlewares {
    private userServices = new UserServices();

    /**
     * Note: Authenticate Socket Middleware. 
     * @param socket.
     * @param next.
    */
    public async AuthenticateSocket(socket:Socket,next:NextFunction):Promise<void>{
        try {
            const cookies = socket.handshake.headers.cookie ? cookie.parse(socket.handshake.headers.cookie) : {};
            if(!cookies?.accessToken){
                socket.userId = null;
                socket.isGuest = true;
                return next();
            };
            /** Note: If accessToken is not == null get userId using jwt. */
            const decodToken = jwt.verify(cookies.accessToken,env.ACCESS_TOKEN_SECRET) as JwtPayloadInterface;
            /** Note: Check userId document is exist. */
            const userDocument = await UserModel.findById(new mongoose.Types.ObjectId(decodToken._id)).select("-password -refreshToken") as UserDocument | null;
            if(!userDocument){
                socket.userId = null;
                socket.isGuest = true;
                return next();
            }

            /** Note: If userDocument is exist assing The userId and isGuest false. */
            socket.userId = userDocument._id.toString();
            socket.isGuest = false;
            return next();
        } catch (e:any) {
            next(e);
        }
    }

    public AuthenticateJwtCookie = async (req:Request,res:Response,next:NextFunction) => {
        try {
            const accessToken = req.cookies?.accessToken || req.headers.authorization?.split("Bearer ")[0]
            if(!accessToken){
                throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.COMMON.UNAUTHORIZED);
            }
            /** Note: Jwt dcrypting and verify user. */
            const decoded = jwt.verify(accessToken,env.ACCESS_TOKEN_SECRET) as JwtPayloadInterface;
            if(!decoded){
                throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.AUTH.TOKEN_INVALID);
            }
            /** Note: Get user by userId. */
            const user = await UserModel.findById(new mongoose.Types.ObjectId(decoded._id)).select("-password -refreshToken") as UserDocument | null;
            if(!user){
                throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.USER.NOT_FOUND);
            }
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    };
}

export default AuthMiddlewares;