import UserModel from "../models/user.model.js";
import OtpModel from "../models/otp.model.js";
import ApiError from "../utils/ApiError.js";
/** Response Constants */
import {ERROR_CODES, ERROR_MESSAGES, STATUS_CODES} from "../constants/responseConstants.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import path from "node:path";
import hbs from "handlebars"
import fs from "fs";

/** Otp Interfaces */
import {OTP_EMAIL_CONTENT, type VerifyOtpInterface, type SendOtpInterface} from "../interfaces/otp.interfaces.js";
/** Note: Mail Services. */
import MailServices from "./mail.services.js";

/** Note: Path Identifier. */
import { __dirname } from "../utils/path.js";

class OtpServices {
    private mailServices = new MailServices();

    /**
     * Note: Account registration and change change email otp generater.
     * @param NULL.
     * @returns Generated otp.
    */
    protected async GenerateOtp():Promise<string> {
        let otp = Math.floor(1000 + Math.random() * 9000);
        return otp.toString();
    }
    
    /**
     * Note: Verify sended otp
     * @param userObject - otp and userId
     * @check hashed otp match to dcrypt otp.
     * @update userDocument isVerfied status.
     * @returns void. 
    */
    public async VerifyOtp(userObject:VerifyOtpInterface):Promise<Boolean> {
        const {otp, userId,purpose} = userObject;
        const hashed_user_otp_object = await OtpModel.findOne({
            userId: new mongoose.Types.ObjectId(userId),
            purpose: purpose
        });
        /** Note: Compare otp. */
        const hashed_otp = hashed_user_otp_object?.otp;
        if(!hashed_otp){
            throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_CODES.AUTH.OTP_NOT_FOUND,)
        }
        /** Check otp expiry. */
        const now = Date.now();
        if(hashed_user_otp_object.otpExpiry.getTime() < now){
            throw new ApiError(STATUS_CODES.UNAUTHORIZED,ERROR_CODES.AUTH.OTP_EXPIRED);
        }
        const compare_otp = await bcrypt.compare(otp,hashed_otp);
        if(!compare_otp){
            throw new ApiError(STATUS_CODES.UNAUTHORIZED,ERROR_CODES.AUTH.INVALID_OTP);
        }
        await hashed_user_otp_object.deleteOne();
        return true;
    }

    /**
     * Note: Get Template Path.
     * @param templateObject - filename.
     * @returns templateObject.
    */
    public async GetTemplatePath(templateObject:{filename:string}):Promise<string> {
        const {filename} = templateObject;
        const templatePath = path.join(
            __dirname,
            `../configs/nodemailer/templates`,
            `${filename}`
        );
        /** Note: Check file is exist in directory. */
        if(!templatePath || !fs.existsSync(templatePath)){
            throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.EMAIL.EMAIL_TEMPLATE_NOT_FOUND);
        }
        return templatePath;
    }

    /**
     * Note: Send Otp otp puporse allowed only CHANGE_PASSWORD, FORGOT_PASSWORD, REGISTER_ACCOUNT, CHANGE_EMAIL
     * @param otpObject - userId.
     * @param otpObject - purpose.
    */
    public async SendOtp(otpObject:SendOtpInterface):Promise<void> {
        const {purpose,userId,email} = otpObject;
        const user = await UserModel.findById(new mongoose.Types.ObjectId(userId));
        if(!user){
            throw new ApiError(STATUS_CODES.NOT_FOUND,ERROR_MESSAGES.USER.NOT_FOUND);
        }
        /** Note: Check old otp is exist */
        const oldOtpDocument = await OtpModel.findOne({
            purpose:purpose,
            userId:userId
        });
        const templatePath = await this.GetTemplatePath({filename:"otp.email.hbs"});
        const source = fs.readFileSync(templatePath,"utf-8");
        const html = hbs.compile(source);
        const otp = await this.GenerateOtp();
        
        /** Note: HashOtp and save otp in UserDocument */
        const salt_rounds = 10;
        const gen_salt = await bcrypt.genSalt(salt_rounds);
        const hashed_otp = await bcrypt.hash(otp,gen_salt);
        if(oldOtpDocument){
            console.log("old otp is exist");
            /** Note: using another method. */
            oldOtpDocument.otp = hashed_otp;
            oldOtpDocument.otpExpiry = new Date( Date.now() + ( 10 * 60 * 1000));
            await oldOtpDocument.save();
        }else {
            /** Note: Save hashed otp save in otpModel. */
            const created_otp = await OtpModel.create({
                userId:new mongoose.Types.ObjectId(userId),
                otp:hashed_otp,
                otpExpiry:new Date( Date.now() + ( 10 * 60 * 1000)),
                purpose:purpose
            });
        }
        /** Note: After save user send otp on the email service. */
        const body = OTP_EMAIL_CONTENT[purpose];
        const template = html({
            purposeDescription:body.description,
            purposeTitle:body.title,
            otp:otp,
            fullname: user?.fullname || user?.username
        });
        /** Note: Mail Options */
        /** Note: Send otp using nodemailer. */
        const mail_options = {
            to:email,
            subject:`Therifti Verifiction Code`,
            body:template
        };
        const send_mail = this.mailServices.SendMail(mail_options);
        return;
    }

}

export default OtpServices;