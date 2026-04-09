import { Server, Socket } from "socket.io";
import http from "http";
import env from "../constants/loadEnv.js";

/** Services */
import NotificationServices from "../services/notification.services.js";
import AuthMiddlewares from "../middlewares/auth.middlewares.js";
import { type CreateNotificationInterface,NotificationType } from "../interfaces/notification.interface.js";

/** Interfaces */
import { type OnlineUsersInterface } from "../interfaces/socket.interfaces.js";

class SocketServices {
    private static instance: SocketServices;
    private notificationServices = new NotificationServices();
    private authMiddleware = new AuthMiddlewares();
    private _io: Server;
    private onlineUsers: OnlineUsersInterface;
    
    /**
     * Note: Creates and configures a Socket.IO server instance.
     *
     * Binds Socket.IO to the provided HTTP server and applies
     * CORS configuration to allow cross-origin, credentialed
     * real-time communication.
     *
     * Configuration details:
     * - `origin`: Allowed client origin(s) defined in environment variables
     * - `credentials`: Enables cookies and authentication headers
     * - `methods`: Allowed HTTP methods for Socket.IO transport
     *
     * @param {http.Server} httpServer - The HTTP server to attach Socket.IO to.
    */
    private constructor(httpServer:http.Server){
        this._io = new Server(httpServer,{
            cors:{
                origin:"*",
                credentials:true,
                methods:["GET", "POST"]
            }
        });
        
        /** Note: Online Users Configeration */
        this.onlineUsers = {
            authenticated: new Map(),
            guests: new Set()
        }
    }
    
    /**
     * Initializes the Socket.IO server and registers connection handlers.
     *
     * This method creates a singleton instance of `SocketServices` if not
     * already initialized, and sets up listeners for incoming socket
     * connections. Each connected socket is classified as either a
     * **guest** or an **authenticated user** and stored in `onlineUsers`.
     *
     * Connection registration logic:
     * - **Guest users**
     *   - Do not have a `userId`
     *   - `isGuest === true`
     *   - Tracked using their `socket.id`
     *
     * - **Authenticated users**
     *   - Have a valid `userId`
     *   - `isGuest === false`
     *   - Tracked using `userId → socket.id` mapping
     *
     * Prerequisite:
     * - Socket authentication middleware must attach `socket.userId` and
     *   `socket.isGuest` before connection.
     *
     * @param {http.Server} httpServer - The HTTP server to attach Socket.IO to.
     * @returns {SocketServices} Singleton instance of `SocketServices`.
    */
    static init(httpServer: http.Server):SocketServices{

        if(!SocketServices.instance){
            console.log("SocketServices initialized");
            SocketServices.instance = new SocketServices(httpServer);
            SocketServices.instance.RegisterConnection();
        }
        return SocketServices.instance;
    }

    /**
     * Registers a Socket.IO connection.
     *
     * This method is responsible for registering a user in the Socket.IO
     * real-time communication layer when they are not already registered.
     * It ensures the user is properly tracked for real-time events such as
     * messaging, notifications, and presence updates.
     *
     * Logic:
     * - Listens for new socket connections
     * - Determines whether the connecting client is a guest or an authenticated user
     * - Registers guest users using their `socket.id`
     * - Registers authenticated users using a `userId → socket.id` mapping
     *
     * Prerequisite:
     * - Socket authentication middleware must attach `userId` and `isGuest`
     *   properties to the socket before this method is executed
     *
     * @returns {void}
    */
    private RegisterConnection():void {
        const io = this._io;
        io.use(this.authMiddleware.AuthenticateSocket);
        io.on("connection",(socket) => {
            /** Note: Check user is Guest. */
            console.log("Socket id: ",socket.id, socket.userId)
            if(!socket.userId && socket.isGuest) this.onlineUsers.guests.add(socket.id);
            if(socket.userId && !socket.isGuest) this.onlineUsers.authenticated.set(socket.userId,socket.id);
            socket.on("join-chat-room",(chatId:string) => this.JoinChatRoom(chatId,socket));
            socket.on("leave-chat-room",(chatId:string) => this.LeaveChatRoom(chatId,socket));
            socket.on("online-users",() => this.OnlineUsers(socket));
            socket.on("disconnect",() => this.Disconnect(socket));
        })
    };

    /**
     * Note: Emits messages and real-time events using the Socket.IO server instance.
     *
     * This method is responsible for:
     * - Emitting real-time events/messages to connected clients
     * - Determining whether a target user is currently online
     * - Broadcasting events or emitting to a specific socket connection
     *
     * Message delivery logic:
     * - Online user:
     *   - Emit the real-time event/message immediately
     * - Online user and currently active in the chat:
     *   - Emit the message with a “delivered” state
     * - Offline user:
     *   - Persist the message and trigger a notification for later delivery
     *
     * Prerequisite:
     * - A valid `MessageDocument` is required to resolve user identity,
     *   socket mapping, and notification targets
     *
     * @returns {Promise<void>} Resolves when the event emission flow completes.
    */
    public async EmitEvents(messageDocument:any): Promise<void> {
        const io = this._io;
        /** Note: First of all check user is Online. */
        const isOnline = this.onlineUsers.authenticated.get(messageDocument.receiverId.toString());
        if(isOnline){
            /** Note: Check user current in this chat room joined. */
            const chatRooms = this._io.sockets.adapter.rooms;
            if(chatRooms.get(messageDocument.chatId.toString())){
                io.to(messageDocument.chatId.toString()).emit("event:message",messageDocument);
            }
            /** Note: Emit to user Deliver messageDocument. */
            io.emit("event:deliverd-message",messageDocument);
            return;
        }
        const senderName = messageDocument.senderId?.fullname || messageDocument.senderName || "Someone";
        /** If user is online but not in chat to deliver a messageNotification */
        const NotificationPayload:CreateNotificationInterface = {
            recipient_id:messageDocument.receiverId,
            metaData:{
                senderId:messageDocument.sender._id || messageDocument.senderId,
                senderName,
                chatId:messageDocument.chatId,
                lastMessage:messageDocument.content
            },
            linkUrl:`/inbox/${messageDocument.chatId}`,
            type:NotificationType.NEW_MESSAGE
        }
        this.notificationServices.CreateNotification(NotificationPayload);
        return;
    }

    /** 
     * Note: Join Chat Room.
     * 
     * This method is used to join a chat room.
     * to communicate with the user.
     * 
     * @param {string} chatId - The chatId to join.
     * @param {Socket} socket - The Socket server instance.
     * @returns {void}
    */
    public JoinChatRoom(chatId:string,socket:Socket):void {
        socket.join(chatId);
        console.log("Joined chat room: ",chatId);
        return;
    };

    /**
     * Note: Disconnect Socket Connection.
     * 
     * This service method using for diconccect user to server using socket.io.
     * 
     * @param {Socket} socket - The Socket server instance.
     * @returns {void}
    */
    public Disconnect(socket:Socket):void {
        this.onlineUsers.authenticated.delete(socket.userId);
        socket.disconnect();
        return;
    };


    /**
     * Note: Online Users getter.
     * 
     * This service method using for get online users list.
     * 
     * @param {Socket} socket - The Socket server instance.
     *
     * @returns {OnlineUsersInterface} Online users list.
    */
    public OnlineUsers(socket:Socket):void {
        const authenticatedUsers = Object.fromEntries(this.onlineUsers.authenticated);
        socket.emit("event:online-users",authenticatedUsers);
        return;
    };

    /** 
     * Note: Leave Chat Room.
     * 
     * This method is used to leave a chat room.
     * to stop communicating with the user.
     * 
     * @param {string} chatId - The chatId to leave.
     * @param {Socket} socket - The Socket server instance.
     * @returns {void}
    */
    public LeaveChatRoom(chatId:string,socket:Socket):void {
        socket.leave(chatId);
        console.log("Left chat room: ",chatId);
        return;
    };

    /**
     * Note: Returns the Socket.IO server instance.
     *
     * This service is used to:
     * - Emit real-time events/messages
     * - Check online users
     * - Broadcast or target socket messages
     *
     * Acts as a centralized access point for the Socket.IO server
     * across the application.
     *
     * @returns {Server} Socket.IO server instance.
    */
    static io():Server{
        if (!SocketServices.instance) {
            throw new Error("SocketServices not initialized");
        }
        return this.instance._io;
    }

    /**
     * Note: Returns the singleton instance of `SocketServices`.
     *
     * This method exposes the full SocketServices instance, including
     * internal socket lifecycle methods such as connection registration
     * and advanced event orchestration.
     *
     * NOTE:
     * - Intended for **internal or advanced use only**
     * - External services should prefer using `SocketServices.io()`
     *   instead of accessing the full service instance.
     *
     * IMPORTANT:
     * - Must be called only after `SocketServices.init()` has completed.
     *
     * @throws {Error} If SocketServices has not been initialized.
     *
     * @returns {SocketServices} The initialized SocketServices singleton instance.
     */
    static getServerInstance():SocketServices{
        if(!SocketServices.instance){
            throw new Error("SocketServices not initialized");
        }
        return SocketServices.instance;
    }
}

export default SocketServices;