import express, {} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
/** Environment variables */
import env from "./constants/loadEnv.js";
const app = express();
/** Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    origin: env.CORS_ORIGIN,
}));
app.use(cookieParser());
/** Routes */
export default app;
//# sourceMappingURL=app.js.map