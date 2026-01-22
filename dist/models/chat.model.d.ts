import mongoose from "mongoose";
/** Types */
import { type ChatDocument } from "../interfaces/chat.interfaces.js";
/** ChatModel */
declare const ChatModel: mongoose.Model<ChatDocument, {}, {}, {}, mongoose.Document<unknown, {}, ChatDocument, {}, mongoose.DefaultSchemaOptions> & ChatDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ChatDocument>;
export default ChatModel;
//# sourceMappingURL=chat.model.d.ts.map