/** EnvironmentVariables Interface */
interface EnvironmentVariables {
    MONGO_URI: string;
    FACEBOOK_APP_PASSWORD: string;
    FACEBOOK_APP_ID: string;
    GOOGLE_APP_PASSWORD: string;
    GOOGLE_APP_ID: string;
    CORS_ORIGIN: string;
    PORT: string | number;
    NODE_ENV: string;
    CLOUDINARY_APP_PASSWORD: string;
    ACCESS_TOKEN_EXPIRY: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_EXPIRY: string;
    MAILER_APP_EMAIL: string;
    MAILER_APP_PASSWORD: string;
    REFRESH_TOKEN_SECRET: string;
}
declare const env: EnvironmentVariables;
export default env;
//# sourceMappingURL=loadEnv.d.ts.map