import mongoose from "mongoose";
/** Types || Interfaces */
import { type ReviewDocument } from "../interfaces/review.interfaces.js";
/** Review Model */
declare const ReviewModel: mongoose.Model<ReviewDocument, {}, {}, {}, mongoose.Document<unknown, {}, ReviewDocument, {}, mongoose.DefaultSchemaOptions> & ReviewDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ReviewDocument>;
export default ReviewModel;
//# sourceMappingURL=review.model.d.ts.map