import mongoose from "mongoose";
import type { SizeDocument } from "../interfaces/size.interfaces.js";
/** Note: Size Model */
declare const SizeModel: mongoose.Model<SizeDocument, {}, {}, {}, mongoose.Document<unknown, {}, SizeDocument, {}, mongoose.DefaultSchemaOptions> & SizeDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, SizeDocument>;
export default SizeModel;
//# sourceMappingURL=size.model.d.ts.map