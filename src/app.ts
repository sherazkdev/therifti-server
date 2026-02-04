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
import UserRouter from "./routes/v2/user.routes.js";
import AuthRouter from "./routes/v2/auth.routes.js";

app.use("/api/v1/users",UserRouter);
app.use("/api/v1/auth",AuthRouter);

app.use(ErrorHandler);
export default app;