import type { JwtPayload } from "jsonwebtoken";

export interface JwtPayloadInterface extends JwtPayload {
    _id:string
}