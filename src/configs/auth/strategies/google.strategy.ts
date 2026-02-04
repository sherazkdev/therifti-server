import passport from "passport";

/** Note: Auth Stratergies */
import { Strategy } from "passport-google-oauth20";
import type {Profile,VerifyCallback} from "passport-google-oauth20";

import env from "../../../constants/loadEnv.js";
/** Auth Services. */
import AuthServices from "../../../services/auth.services.js";

/** Google Strategy */
const GoogleStrategy = passport.use(
    new Strategy(
        {
            clientID:env.GOOGLE_APP_ID,
            clientSecret:env.GOOGLE_APP_PASSWORD,
            callbackURL:env.GOOGLE_CALLBACK_URL
        },
        async function (accessToken:string,refershToken:string,profile:Profile,cb:VerifyCallback):Promise<void> {
            try {
                /** Note: User Authenticater. */
                const authServices = new AuthServices();   
                /** Note: Check user exist by service. */
                const user = await authServices.LoginWithGoogle(profile);
                return cb(null,user);
            } catch (e:any) {
                cb(e, undefined); 
            }
        }
    )
);
export default GoogleStrategy;