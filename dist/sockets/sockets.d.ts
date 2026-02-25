import http from "http";
declare class SocketServices {
    private static instance;
    private notificationServices;
    private _io;
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
    private constructor();
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
    static init(httpServer: http.Server): SocketServices;
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
    private RegisterConnection;
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
    EmitEvents(messageDocument: any): Promise<void>;
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
    static io(): SocketServices;
}
export default SocketServices;
//# sourceMappingURL=sockets.d.ts.map