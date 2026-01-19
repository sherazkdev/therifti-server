import mongoose from "mongoose";
/** Environment variables */
import env from "../../constants/loadEnv.js";
class MongooseConnection {
    isConnected;
    connection;
    constructor() {
        this.connection = null;
        this.isConnected = false;
    }
    /** Mongoose Connection */
    async Connect() {
        try {
            const connectionInstance = await mongoose.connect(`${env.MONGO_URI}/therfti-v2`);
            this.connection = connectionInstance.connection;
            this.isConnected = true;
            console.log(` MongoDB running at this ${this.connection.host} Host.`);
            return;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    /** Disconnect Mongoose */
    async Disconnect() {
        if (this.connection && this.isConnected) {
            this.connection.close();
            this.connection = null;
            this.isConnected = false;
        }
    }
}
export default MongooseConnection;
//# sourceMappingURL=Connection.js.map