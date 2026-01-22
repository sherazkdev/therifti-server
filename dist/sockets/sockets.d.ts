import { Server } from "socket.io";
import http from "http";
declare class Sockets {
    _io: Server;
    constructor(httpServer: http.Server);
    init(): void;
    get io(): Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
}
export default Sockets;
//# sourceMappingURL=sockets.d.ts.map