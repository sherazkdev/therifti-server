import mongoose from "mongoose";
/** Types || Interfaces */
import { type MessageDocument } from "../interfaces/message.interfaces.js";
/** MessageModel */
declare const MessageModel: mongoose.Model<MessageDocument, {}, {}, {}, mongoose.Document<unknown, {}, MessageDocument, {}, mongoose.DefaultSchemaOptions> & MessageDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, MessageDocument>;
export default MessageModel;
//# sourceMappingURL=message.model.d.ts.map