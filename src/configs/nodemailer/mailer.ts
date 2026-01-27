import nodemailer,{type Transporter} from "nodemailer";
/** Envorment Variavles */
import env from "../../constants/loadEnv.js";
import type { SendMailInterface } from "../../interfaces/user.interfaces.js";

class Mailer {
    private _transporter:Transporter;

    constructor(){
        this._transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:env.MAILER_APP_EMAIL,
                pass:env.MAILER_APP_PASSWORD
            }
        })
    }
    get transporter():Transporter {
        return this._transporter;
    }
}

export default Mailer;