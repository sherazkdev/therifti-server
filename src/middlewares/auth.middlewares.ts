
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

class AuthMiddlewares {
    private userServices = new UserServices();

    /**
     * Note: Authenticate Socket Middleware. 
     * @param socket.
     * @param next.
    */
    public AuthenticateSocket(socket:Socket,next:NextFunction){
        try {
            const cookies = socket.handshake.headers.cookie ? cookie.parse(socket.handshake.headers.cookie) : {};
            if(!cookies?.accessToken){
                socket.user = null;
                socket.isAuthenticated = false;
                next();
            };

        } catch (e:any) {
            throw new Error(e);
        }
    }

    public AuthenticateJwtCookie = async (req:Request,res:Response,next:NextFunction) => {
        const accessToken = req.cookies?.accessToken || req.headers.authorization?.split("Bearer ")[0]
        if(!accessToken){
            throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.COMMON.UNAUTHORIZED);
        }
        /** Note: Jwt dcrypting and verify user. */
        const decoded = await jwt.verify(accessToken,env.ACCESS_TOKEN_SECRET) as JwtPayloadInterface;
        if(!decoded){
            throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.AUTH.TOKEN_INVALID);
        }
        /** Note: Get user by userId. */
        const user = await UserModel.findById(new mongoose.Types.ObjectId(decoded._id)).select("-password -refreshToken");
        req.user = user;
        next();
    };
}

export default new AuthMiddlewares;