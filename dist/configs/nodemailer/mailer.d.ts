import { type Transporter } from "nodemailer";
declare class Mailer {
    private _transporter;
    constructor();
    get transporter(): Transporter;
}
export default Mailer;
//# sourceMappingURL=mailer.d.ts.map