import { Server } from "socket.io";
import http from "http";
import env from "../constants/loadEnv.js";
/** Online users list */
const onlineUsers = new Map();
class Sockets {
    _io;
    constructor(httpServer) {
        this._io = new Server(httpServer, {
            cors: {
                origin: env.CORS_ORIGIN,
                credentials: true,
                methods: ["GET", "POST"]
            }
        });
    }
    init() {
        const io = this._io;
        io.on("connection", (socket) => {
            /** Set user */
            onlineUsers.set("12903090", socket.id);
            console.log(onlineUsers);
        });
    }
    get io() {
        return this._io;
    }
}
export default Sockets;
//# sourceMappingURL=sockets.js.map