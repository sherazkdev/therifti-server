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
declare const _default: MongooseConnection;
export default _default;
//# sourceMappingURL=Connection.d.ts.map