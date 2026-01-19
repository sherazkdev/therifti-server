import express,{} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

/** types */
import type {Application} from "express";

/** Environment variables */
import env from "./constants/loadEnv";

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

/** Routes */

export default app;