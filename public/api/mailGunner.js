"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_sendgrid_transport_1 = __importDefault(require("nodemailer-sendgrid-transport"));
var options = {
    auth: {
        api_user: 'rsbear',
        api_key: 'wasder123'
    }
};
var mailer = nodemailer_1.default.createTransport(nodemailer_sendgrid_transport_1.default(options));
function default_1(userEmail, subjectTitle, content) {
    return mailer.sendMail({
        from: 'auth@typefeel.com',
        to: userEmail,
        subject: subjectTitle,
        text: content,
    }, function (err, info) {
        if (err) {
            console.log("Error: " + err);
        }
        else {
            console.log("Response: " + info);
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=mailGunner.js.map