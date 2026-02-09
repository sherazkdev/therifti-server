import { Strategy } from "passport-facebook";
import passport from "passport";
import type {Profile,VerifyFunction} from "passport-facebook";

import env from "../../../constants/loadEnv.js";
/** Auth Services. */
import AuthServices from "../../../services/auth.services.js";

const FacebookStrategy = passport.use(
    new Strategy(
        {
            clientID:"1473173694378518",
            clientSecret:"430d8e8a7a0578b751b3e1e8753587ec",
            callbackURL:"http://localhost:8000/api/v1/auth/facebook/callback"
        },
        async function(accessToken:string,refreshToken:string,profile:Profile,cb:(error: any, user?: any, info?: any) => void):Promise<void> {
            try {
                /** Authenticate User Details. */
                const authServices = new AuthServices();
                /** Note: Check user exist by service. */
                const user = await authServices.LoginWithFacebook(profile);
                cb(null,user);
            } catch (e:any) {
                cb(e, undefined); 
            }
        }
    )    
);
export default FacebookStrategy;