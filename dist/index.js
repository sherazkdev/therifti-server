import app from "./app.js";
import env from "./constants/loadEnv.js";
/** HttpServer */
import http from "http";
/** MongooseConnection */
import MongooseConnection from "./configs/mongooseConnection/Connection.js";
/** Socket services */
import Sockets from "./sockets/sockets.js";
MongooseConnection.Connect()
    .then(() => {
    const server = http.createServer(app);
    const socketsServices = Sockets;
    /** Note: Initialized Socket Server */
    socketsServices.init(server);
    /** Listen the server */
    server.listen(env.PORT, () => console.log(`\x1b[32m%s\x1b[0m`, `Ready on http://localhost:${env.PORT}`));
})
    .catch((e) => app);
export default app;
//# sourceMappingURL=index.js.map