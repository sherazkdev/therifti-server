import app from "./app";
import env from "./constants/loadEnv";
/** HttpServer */
import http from "http";
/** MongooseConnection */
import MongooseConnection from "./configs/mongooseConnection/Connection";
/** Socket services */
import Sockets from "./sockets/sockets";

MongooseConnection.Connect()
.then( () => {
    const server = http.createServer(app);
    const socketsServices = new Sockets(server);

    /** Initialized Socket Server */
    socketsServices.init();
    /** Listen the server */
    server.listen(env.PORT, () => console.log(`\x1b[32m%s\x1b[0m`, `Ready on http://localhost:${env.PORT}`));
})
.catch( (e:any) => app)
export default app;