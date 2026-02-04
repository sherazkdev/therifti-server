import type { Profile as GoogleProfile } from "passport-google-oauth20";
import type { Profile as FacebookProfile } from "passport-facebook";
import type { UserDocument } from "../interfaces/user.interfaces.js";
declare class AuthServices {
    private userServices;
    /**
     * Note: Auth Login with google.
     * @param GoogleProfile.
     * @returns UserDocument.
    */
    LoginWithGoogle(profile: GoogleProfile): Promise<UserDocument>;
    /**
     * Note: Auth Login with facebook.
     * @param FacebookProfile.
     * @returns UserDocument.
    */
    LoginWithFacebook(profile: FacebookProfile): Promise<UserDocument>;
}
export default AuthServices;
//# sourceMappingURL=auth.services.d.ts.map