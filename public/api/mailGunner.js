"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(process.env.SENDGRID_KEY);
function default_1(userEmail, subjectTitle, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const msg = {
            to: userEmail,
            from: 'auth@typefeel.com',
            subject: subjectTitle,
            text: 'and easy to do anywhere, even with Node.js',
            html: content,
        };
        yield mail_1.default.send(msg)
            .then(() => {
            console.log('email success');
        })
            .catch(() => {
            console.log('email failed');
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=mailGunner.js.map