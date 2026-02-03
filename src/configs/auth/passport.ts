import passport from "passport";

/** Note: Auth Stratergies */
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import type {Profile,VerifyCallback} from "passport-google-oauth20";

import env from "../../constants/loadEnv.js";
import UserModel from "../../models/user.model.js";
/** User Services. */
import UserServices from "../../services/user.services.js";

/** Google Strategy */
passport.use(
    new GoogleStrategy(
        {
            clientID:env.GOOGLE_APP_ID,
            clientSecret:env.GOOGLE_APP_PASSWORD,
            callbackURL:env.GOOGLE_CALLBACK_URL
        },
        async function (accessToken:string,refershToken:string,profile:Profile,cb:VerifyCallback):Promise<cb> {
            /** Note: User Authenticater. */
        }
    )
)
