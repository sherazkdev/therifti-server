import mongoose, { Types } from "mongoose";
/** Types */
import { type UserDocument } from "../interfaces/user.interfaces.js";
/** UserModel */
declare const UserModel: mongoose.Model<UserDocument, {}, {}, {}, mongoose.Document<unknown, {}, UserDocument, {}, mongoose.DefaultSchemaOptions> & UserDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, UserDocument>;
export default UserModel;
//# sourceMappingURL=user.model.d.ts.map