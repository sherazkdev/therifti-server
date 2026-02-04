import UserModel from "../models/user.model.js";
/** Note: UserModel Services */
import ApiError from "../utils/ApiError.js";
/** Response Constants */
import { ERROR_MESSAGES, STATUS_CODES } from "../constants/responseConstants.js";
import UserServices from "./user.services.js";
class AuthServices {
    userServices = new UserServices();
    /**
     * Note: Auth Login with google.
     * @param GoogleProfile.
     * @returns UserDocument.
    */
    async LoginWithGoogle(profile) {
        const { name, emails, photos, id } = profile;
        /** note: Check user is exist. */
        let user = await UserModel.findOne({
            googleId: id
        });
        if (!user) {
            const emailSafe = emails || [];
            const photosSafe = photos || [];
            const removeNullFileds = {
                googleId: id,
                email: emailSafe[0]?.value ?? null,
                avatar: photosSafe[0]?.value ?? null,
                fullname: (name?.givenName && name?.familyName) ? name.givenName + " " + name.familyName : null,
                username: emailSafe[0]?.value.split("@")[0] ?? null,
                isVerfied: true
            };
            /** Note: Filter User */
            const filterdUser = await this.userServices.RemoveNullAndUndefinedValues(removeNullFileds);
            /** Note: Create new account */
            user = await UserModel.create(filterdUser);
        }
        return user;
    }
    ;
    /**
     * Note: Auth Login with facebook.
     * @param FacebookProfile.
     * @returns UserDocument.
    */
    async LoginWithFacebook(profile) {
        const { birthday, name, photos, emails, id, gender, } = profile;
        /** Note: Check User exist using facebookId. */
        let user = await UserModel.findOne({
            facebookeId: id
        });
        if (!user) {
            let emailsSafe = emails || [];
            let photosSafe = photos || [];
            /** Note: this object creating for remove a nulleble fields. */
            const removeNullFields = {
                email: emailsSafe[0]?.value ?? null,
                facebookId: id,
                avatar: photosSafe[0]?.value ?? null,
                dob: birthday ? new Date(birthday) : null,
                fullname: (name?.givenName && name?.givenName) ? `${name?.givenName} ${name?.familyName}` : null,
                username: emailsSafe[0]?.value?.split("@")[0] ?? null,
                gender: gender ?? null,
                isVerfied: true
            };
            /** Note: Removinf nulleble fields. */
            const filterdUser = await this.userServices.RemoveNullAndUndefinedValues(removeNullFields);
            /** Note: Create Document in Mongodb */
            user = await UserModel.create(filterdUser);
        }
        return user;
    }
}
;
export default AuthServices;
//# sourceMappingURL=auth.services.js.map