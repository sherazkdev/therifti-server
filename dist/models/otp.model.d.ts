import mongoose from "mongoose";
/** Note: Imports types and interfaces */
import { type OtpDocument } from "../interfaces/otp.interfaces.js";
/** Note: Otp Model */
declare const OtpModel: mongoose.Model<OtpDocument, {}, {}, {}, mongoose.Document<unknown, {}, OtpDocument, {}, mongoose.DefaultSchemaOptions> & OtpDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, OtpDocument>;
export default OtpModel;
//# sourceMappingURL=otp.model.d.ts.map