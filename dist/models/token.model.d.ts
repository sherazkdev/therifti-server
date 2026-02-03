import mongoose from "mongoose";
/** Note: Token Interfaces */
import { type TokenDocument } from "../interfaces/token.interfaces.js";
/** Note: Token Model */
declare const TokenModel: mongoose.Model<TokenDocument, {}, {}, {}, mongoose.Document<unknown, {}, TokenDocument, {}, mongoose.DefaultSchemaOptions> & TokenDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, TokenDocument>;
export default TokenModel;
//# sourceMappingURL=token.model.d.ts.map