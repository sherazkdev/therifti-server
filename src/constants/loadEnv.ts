import dotenv from 'dotenv';
import path from 'path';

/** Environment variables configuration */
dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

/** requireEnv Handler */
const requireEnv = (name:string): string => {
    const value = process.env[name];
    if(!value){
        throw new Error(`Error: Environment variable ${name} is missing`);
    }
    return value;
}

/** EnvironmentVariables Interface */
interface EnvironmentVariables {
    MONGO_URI:string,
    FACEBOOK_APP_PASSWORD:string,
    FACEBOOK_APP_ID:string,
    GOOGLE_APP_PASSWORD:string,
    GOOGLE_APP_ID:string,
    CORS_ORIGIN:string,
    PORT:string | number,
    NODE_ENV:string,
    CLOUDINARY_APP_PASSWORD:string,
    ACCESS_TOKEN_EXPIRY:string,
    ACCESS_TOKEN_SECRET:string,
    REFRESH_TOKEN_EXPIRY:string,
    MAILER_APP_EMAIL:string,
    MAILER_APP_PASSWORD:string,
    REFRESH_TOKEN_SECRET:string
}
const env:EnvironmentVariables = {
    MONGO_URI:requireEnv("MONGO_URI"),
    FACEBOOK_APP_PASSWORD:requireEnv("FACEBOOK_APP_PASSWORD"),
    FACEBOOK_APP_ID:requireEnv("FACEBOOK_APP_ID"),
    GOOGLE_APP_PASSWORD:requireEnv("GOOGLE_APP_PASSWORD"),
    GOOGLE_APP_ID:requireEnv("GOOGLE_APP_ID"),
    CORS_ORIGIN:requireEnv("CORS_ORIGIN"),
    PORT:requireEnv("PORT"),
    NODE_ENV:requireEnv("NODE_ENV"),
    CLOUDINARY_APP_PASSWORD:requireEnv("CLOUDINARY_APP_PASSWORD"),
    ACCESS_TOKEN_EXPIRY:requireEnv("ACCESS_TOKEN_EXPIRY"),
    ACCESS_TOKEN_SECRET:requireEnv("ACCESS_TOKEN_SECRET"),
    REFRESH_TOKEN_EXPIRY:requireEnv("REFRESH_TOKEN_EXPIRY"),
    REFRESH_TOKEN_SECRET:requireEnv("REFRESH_TOKEN_SECRET"),
    MAILER_APP_EMAIL:requireEnv("MAILER_APP_EMAIL"),
    MAILER_APP_PASSWORD:requireEnv("MAILER_APP_PASSWORD")
}
export default env;