import dotenv from 'dotenv';
import path from 'path';
/** Environment variables configuration */
dotenv.config({
    path: path.resolve(process.cwd(), '.env'),
});
/** requireEnv Handler */
const requireEnv = (name) => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Error: Environment variable ${name} is missing`);
    }
    return value;
};
const env = {
    MONGO_URI: requireEnv("MONGO_URI"),
    FACEBOOK_APP_PASSWORD: requireEnv("FACEBOOK_APP_PASSWORD"),
    FACEBOOK_APP_ID: requireEnv("FACEBOOK_APP_ID"),
    GOOGLE_APP_PASSWORD: requireEnv("GOOGLE_APP_PASSWORD"),
    GOOGLE_APP_ID: requireEnv("GOOGLE_APP_ID"),
    CORS_ORIGIN: requireEnv("CORS_ORIGIN"),
    PORT: requireEnv("PORT"),
    NODE_ENV: requireEnv("NODE_ENV"),
    CLOUDINARY_APP_PASSWORD: requireEnv("CLOUDINARY_APP_PASSWORD"),
    ACCESS_TOKEN_EXPIRY: requireEnv("ACCESS_TOKEN_EXPIRY"),
    ACCESS_TOKEN_SECRET: requireEnv("ACCESS_TOKEN_SECRET"),
    REFRESH_TOKEN_EXPIRY: requireEnv("REFRESH_TOKEN_EXPIRY"),
    REFRESH_TOKEN_SECRET: requireEnv("REFRESH_TOKEN_SECRET")
};
export default env;
//# sourceMappingURL=loadEnv.js.map