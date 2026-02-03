/** Types */
import type { Socket } from "socket.io";
import type { NextFunction, Request, Response } from "express";
declare class AuthMiddlewares {
    private userServices;
    /**
     * Note: Authenticate Socket Middleware.
     * @param socket.
     * @param next.
    */
    AuthenticateSocket(socket: Socket, next: NextFunction): void;
    AuthenticateJwtCookie: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
declare const _default: AuthMiddlewares;
export default _default;
//# sourceMappingURL=auth.middlewares.d.ts.map