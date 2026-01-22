import nodemailer,{type Transporter} from "nodemailer";
/** Envorment Variavles */
import env from "../../constants/loadEnv.js";
import type { SendMail } from "../../interfaces/user.interfaces.js";

class Mailer {
    private transporter:Transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:env.MAILER_APP_EMAIL,
                pass:env.MAILER_APP_PASSWORD
            }
        })
    }

    /**
     * Note: Mail Sending with mutltpile services.
     * @params mailObject -> to, body, subject
     * @returns sendedAt information. 
    */
    public async Send(mailObject:SendMail):Promise<string> {
        const {body, subject, to} = mailObject;
        /** Mail Optopns */
        const mail_Options = {
            from:env.MAILER_APP_EMAIL,
            to:to,
            subject:subject,
            text:body            
        };
        const send_mail = await this.transporter.sendMail(mail_Options);
        return send_mail;
    }
}

export default Mailer;