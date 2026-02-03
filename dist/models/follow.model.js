import mongoose, { mongo } from "mongoose";
/** Importing types and interfaces */
import {} from "../interfaces/follow.interfaces.js";
/** Follow Schema  */
const FollowSchema = new mongoose.Schema({
    followerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    followingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });
/** Follow Model */
const FollowModel = mongoose.model("Follow", FollowSchema);
export default FollowModel;
//# sourceMappingURL=follow.model.js.map