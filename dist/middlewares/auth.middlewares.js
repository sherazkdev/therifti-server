import cookie from "cookie";
/** Envorments variables */
import env from "../constants/loadEnv.js";
import UserServices from "../services/user.services.js";
import ApiError from "../utils/ApiError.js";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { ERROR_MESSAGES, STATUS_CODES } from "../constants/responseConstants.js";
import UserModel from "../models/user.model.js";
import mongoose, { MongooseError } from "mongoose";
class AuthMiddlewares {
    userServices = new UserServices();
    /**
     * Note: Authenticate Socket Middleware.
     * @param socket.
     * @param next.
    */
    AuthenticateSocket(socket, next) {
        try {
            const cookies = socket.handshake.headers.cookie ? cookie.parse(socket.handshake.headers.cookie) : {};
            if (!cookies?.accessToken) {
                socket.user = null;
                socket.isAuthenticated = false;
                next();
            }
            ;
        }
        catch (e) {
            next(e);
        }
    }
    AuthenticateJwtCookie = async (req, res, next) => {
        try {
            const accessToken = req.cookies?.accessToken || req.headers.authorization?.split("Bearer ")[0];
            if (!accessToken) {
                throw new ApiError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.COMMON.UNAUTHORIZED);
            }
            /** Note: Jwt dcrypting and verify user. */
            const decoded = await jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET);
            if (!decoded) {
                throw new ApiError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.AUTH.TOKEN_INVALID);
            }
            /** Note: Get user by userId. */
            const user = await UserModel.findById(new mongoose.Types.ObjectId(decoded._id)).select("-password -refreshToken");
            if (!user) {
                throw new ApiError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.USER.NOT_FOUND);
            }
            req.user = user;
            next();
        }
        catch (e) {
            next(e);
        }
    };
}
export default AuthMiddlewares;
//# sourceMappingURL=auth.middlewares.js.map