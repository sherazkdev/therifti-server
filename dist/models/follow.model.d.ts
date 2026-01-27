import mongoose from "mongoose";
/** Importing types and interfaces */
import { type FollowDocument } from "../interfaces/follow.interfaces.js";
/** Follow Model */
declare const FollowModel: mongoose.Model<FollowDocument, {}, {}, {}, mongoose.Document<unknown, {}, FollowDocument, {}, mongoose.DefaultSchemaOptions> & FollowDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, FollowDocument>;
export default FollowModel;
//# sourceMappingURL=follow.model.d.ts.map