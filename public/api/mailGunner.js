"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(process.env.SENDGRID_KEY);
function default_1(userEmail, subjectTitle, content) {
    const msg = {
        to: userEmail,
        from: 'auth@typefeel.com',
        subject: subjectTitle,
        text: 'and easy to do anywhere, even with Node.js',
        html: content,
    };
    mail_1.default.send(msg)
        .then(() => {
        console.log('email success');
    })
        .catch(() => {
        console.log('email failed');
    });
}
exports.default = default_1;
//# sourceMappingURL=mailGunner.js.map