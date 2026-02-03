import ApiError from "../utils/ApiError.js";
/** Response Constants */
import { ERROR_MESSAGES, STATUS_CODES, SUCCESS_MESSAGES } from "../constants/responseConstants.js";
import path from "node:path";
import hbs from "handlebars";
import { fileURLToPath } from 'node:url';
import fs from "fs";
/** Mail Services */
import Mailer from "../configs/nodemailer/mailer.js";
class MailServices {
    mailer = new Mailer();
    /**
     * Note: Send Mail using nodemailer with types.
     * @param mailObject - fullname, email, purpose.
     * @updates null.
     * @returns null.
    */
    async SendMail(mailObject) {
        const { body, subject, to } = mailObject;
        /** Note: Send mail. */
        const sendMailObject = {
            html: body,
            subject: subject,
            to: to
        };
        const send_mail = await this.mailer.transporter.sendMail(sendMailObject);
        return send_mail;
    }
}
export default MailServices;
//# sourceMappingURL=mail.services.js.map