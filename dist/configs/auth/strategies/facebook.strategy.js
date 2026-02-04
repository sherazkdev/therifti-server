import { Strategy } from "passport-facebook";
import env from "../../../constants/loadEnv.js";
/** Auth Services. */
import AuthServices from "../../../services/auth.services.js";
const FacebookStrategy = new Strategy({
    clientID: env.FACEBOOK_APP_ID,
    clientSecret: env.FACEBOOK_APP_PASSWORD,
    callbackURL: env.FACEBOOK_CALLBACK_URL
}, async function (accessToken, refreshToken, profile, cb) {
    try {
        /** Authenticate User Details. */
        const authServices = new AuthServices();
        /** Note: Check user exist by service. */
        const user = await authServices.LoginWithFacebook(profile);
        cb(null, user);
    }
    catch (e) {
        cb(e, undefined);
    }
});
export default FacebookStrategy;
//# sourceMappingURL=facebook.strategy.js.map