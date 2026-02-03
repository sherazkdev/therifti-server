import nodemailer, {} from "nodemailer";
/** Envorment Variavles */
import env from "../../constants/loadEnv.js";
class Mailer {
    _transporter;
    constructor() {
        this._transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: env.MAILER_APP_EMAIL,
                pass: env.MAILER_APP_PASSWORD
            }
        });
    }
    get transporter() {
        return this._transporter;
    }
}
export default Mailer;
//# sourceMappingURL=mailer.js.map