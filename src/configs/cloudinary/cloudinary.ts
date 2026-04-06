import { v2 as cloudinary } from "cloudinary";

/** Envorment variables */
import env from "../../constants/loadEnv.js";

/** Configration */
cloudinary.config({
    cloud_name:env.CLOUDINARY_CLOUD_NAME,
    api_key:env.CLOUDINARY_API_KEY,
    api_secret:env.CLOUDINARY_API_SECRET
});

export default cloudinary;