import { Server } from "socket.io";
import http from "http";
import env from "../constants/loadEnv.js";

/** Online users list */
const onlineUsers: Map<string, string> = new Map();

class Sockets {
    public _io: Server;

    constructor(httpServer:http.Server){
        this._io = new Server(httpServer,{
            cors:{
                origin:env.CORS_ORIGIN,
                credentials:true,
                methods:["GET", "POST"]
            }
        });
    }

    public init():void{
        const io = this._io;
        io.on("connection",(socket) => {
            /** Set user */
            onlineUsers.set("12903090",socket.id);
            console.log(onlineUsers);
        })
    }

    get io(){
        return this._io;
    }
}

export default Sockets;