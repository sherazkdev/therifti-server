import mongoose from "mongoose";

/** Environment variables */
import env from "../../constants/loadEnv.js";
/** Types */
import type {Connection,MongooseError} from "mongoose";

class MongooseConnection {
    public isConnected:boolean;
    public connection:Connection | null;

    constructor(){
        this.connection = null;
        this.isConnected = false;
    }
    /** Mongoose Connection */
    public async Connect(){
        try {
            const connectionInstance = await mongoose.connect(`${env.MONGO_URI}/therfti-v2`);
            this.connection = connectionInstance.connection;
            this.isConnected = true;
            console.log(` MongoDB running at this ${this.connection.host} Host.`);
            return;
        } catch (e:MongooseError | any) {
            throw new Error(e);
        }
    }

    /** Disconnect Mongoose */
    public async Disconnect(){
        if(this.connection && this.isConnected){
            this.connection.close();
            this.connection = null;
            this.isConnected = false;
        }
    }
}
export default new MongooseConnection();