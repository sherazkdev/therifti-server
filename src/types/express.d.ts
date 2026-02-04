import type { UserDocument } from "../interfaces/user.interfaces.ts";
import UserModel from "../models/user.model.ts";
import "express";

declare global {
    namespace Express {
        interface Request {
            user?: UserDocument
        }
    }
}