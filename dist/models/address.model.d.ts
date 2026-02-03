import mongoose from "mongoose";
/** Note: imports interface and types */
import type { AddressDocument } from "../interfaces/address.interfaces.js";
/** Note: Address Model */
declare const AddressModel: mongoose.Model<AddressDocument, {}, {}, {}, mongoose.Document<unknown, {}, AddressDocument, {}, mongoose.DefaultSchemaOptions> & AddressDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, AddressDocument>;
export default AddressModel;
//# sourceMappingURL=address.model.d.ts.map