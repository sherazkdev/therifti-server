import type { SendMailInterface } from "../interfaces/mail.interfaces.js";
declare class MailServices {
    private mailer;
    /**
     * Note: Send Mail using nodemailer with types.
     * @param mailObject - fullname, email, purpose.
     * @updates null.
     * @returns null.
    */
    SendMail(mailObject: SendMailInterface): Promise<string>;
}
export default MailServices;
//# sourceMappingURL=mail.services.d.ts.map