import ErrorHandler from "./middlewares/errorHandler.middlewares.js";
import cookieParser from "cookie-parser";
import initPassport from "./configs/auth/passport.js";
import passport from "passport";
import express,{} from "express";
import cors from "cors";
import path from "node:path";

/** types */
import type {Application} from "express";

/** Environment variables */
import env from "./constants/loadEnv.js";
const app:Application = express();

/** Middlewares */
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    credentials:true,
    methods:["GET","POST","PUT","PATCH","DELETE"],
    origin:env.CORS_ORIGIN,
}))
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.resolve( process.cwd() + "public")));

// Register your strategies
initPassport();

/** Routes */
import NotificationRouter from "./routes/v2/notification.routes.js";
import MaterialRouter from "./routes/v2/material.routes.js";
import MessageRouter from "./routes/v2/message.routes.js";
import ProductRouter from "./routes/v2/product.routes.js";
import WishlistRouter from "./routes/v2/wishlist.routes.js";
import CategoryRouter from "./routes/v2/category.routes.js";
import FollowRouter from "./routes/v2/follow.routes.js";
import ChatRouter from "./routes/v2/chat.routes.js";
import UserRouter from "./routes/v2/user.routes.js";
import AuthRouter from "./routes/v2/auth.routes.js";
import BrandRouter from "./routes/v2/brand.routes.js";
import SizeRouter from "./routes/v2/size.routes.js";

app.use("/api/v1/users",UserRouter);
app.use("/api/v1/auth",AuthRouter);
app.use("/api/v1/products",ProductRouter);
app.use("/api/v1/brands",BrandRouter);
app.use("/api/v1/sizes",SizeRouter);
app.use("/api/v1/wishlists",WishlistRouter);
app.use("/api/v1/categories",CategoryRouter);
app.use("/api/v1/follows",FollowRouter);
app.use("/api/v1/chats",ChatRouter);
app.use("/api/v1/notifications",NotificationRouter);
app.use("/api/v1/materials",MaterialRouter);
app.use("/api/v1/messages",MessageRouter);

app.use(ErrorHandler);
export default app;