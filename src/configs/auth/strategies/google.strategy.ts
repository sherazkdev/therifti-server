import passport from "passport";

/** Note: Auth Stratergies */
import { Strategy } from "passport-google-oauth20";
import type {Profile,VerifyCallback} from "passport-google-oauth20";

import env from "../../../constants/loadEnv.js";
/** Auth Services. */
import AuthServices from "../../../services/auth.services.js";

import UserServices from "../../../services/user.services.js";
import OtpServices from "../../../services/otp.services.js";
import TokenServices from "../../../services/token.services.js";
import AddressServices from "../../../services/address.services.js";

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
                const otpServices = new OtpServices();
                const addressServices = new AddressServices();
                const userServices = new UserServices();
                const tokenServices = new TokenServices();
                /** Note: User Authenticater. */
                const authServices = new AuthServices(userServices, otpServices, addressServices, tokenServices);   
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