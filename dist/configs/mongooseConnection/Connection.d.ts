/** Types */
import type { Connection } from "mongoose";
declare class MongooseConnection {
    isConnected: boolean;
    connection: Connection | null;
    constructor();
    /** Mongoose Connection */
    Connect(): Promise<void>;
    /** Disconnect Mongoose */
    Disconnect(): Promise<void>;
}
export default MongooseConnection;
//# sourceMappingURL=Connection.d.ts.map