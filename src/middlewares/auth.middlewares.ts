
import cookie from "cookie";
/** Envorments variables */
import env from "../constants/loadEnv";
/** Types */
import type { Socket } from "socket.io";
import type { NextFunction } from "express";

class AuthMiddlewares {

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
}