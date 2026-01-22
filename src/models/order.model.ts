import mongoose from "mongoose";
/** Note: Importing types and interface for schema */
import {type OrderDocument, OrderStatus} from "../interfaces/order.interfaces.js";

/** Order Schema */
const OrderSchema = new mongoose.Schema<OrderDocument>({
    productId:{
        types:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,
        index:true
    },
    sellerId:{
        types:mongoose.Schema.Types.ObjectId,
        ref:"User",
        unique:true,
        required:true,
        index:true
    },
    buyerId:{
        types:mongoose.Schema.Types.ObjectId,
        ref:"User",
        index:true,
        required:true
    },
    canBuyerReview:{
        types:Boolean,
        default:false
    },
    canSellerReview:{
        types:Boolean,
        default:false
    },
    deliveredAt:{
        types:Boolean,
        default:false
    },
    confirmedAt:{
        types:Boolean,
        default:false
    
    },
    status:{
        type:String,
        enum:Object.values(OrderStatus),
        required:true,
        index:true
    }
}, {timestamps:true});
/** Order Model */
const OrderModel = mongoose.model<OrderDocument>("Order", OrderSchema);
export default OrderModel;
