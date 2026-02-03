/** Otp Interfaces */
import { type VerifyOtpInterface, type SendOtpInterface } from "../interfaces/otp.interfaces.js";
declare class OtpServices {
    private mailServices;
    /**
     * Note: Account registration and change change email otp generater.
     * @param NULL.
     * @returns Generated otp.
    */
    protected GenerateOtp(): Promise<string>;
    /**
     * Note: Verify sended otp
     * @param userObject - otp and userId
     * @check hashed otp match to dcrypt otp.
     * @update userDocument isVerfied status.
     * @returns void.
    */
    VerifyOtp(userObject: VerifyOtpInterface): Promise<Boolean>;
    /**
     * Note: Get Template Path.
     * @param templateObject - filename.
     * @returns templateObject.
    */
    GetTemplatePath(templateObject: {
        filename: string;
    }): Promise<string>;
    /**
     * Note: Send Otp otp puporse allowed only CHANGE_PASSWORD, FORGOT_PASSWORD, REGISTER_ACCOUNT, CHANGE_EMAIL
     * @param otpObject - userId.
     * @param otpObject - purpose.
    */
    SendOtp(otpObject: SendOtpInterface): Promise<void>;
}
export default OtpServices;
//# sourceMappingURL=otp.services.d.ts.map