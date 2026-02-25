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
    AuthenticateSocket(socket: Socket, next: NextFunction): Promise<void>;
    AuthenticateJwtCookie: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default AuthMiddlewares;
//# sourceMappingURL=auth.middlewares.d.ts.map