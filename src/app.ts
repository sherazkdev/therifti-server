import express,{} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
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
app.use(express.static(path.resolve( process.cwd() + "public")));

/** Routes */

export default app;