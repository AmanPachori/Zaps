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
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Ensure your environment variables are properly set
const transport = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
});
function sendEmail(to, body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield transport.sendMail({
                from: "lonewolf.1002684@gmail.com",
                sender: "lonewolf.1002684@gmail.com",
                to: to,
                subject: "Hello from Zapier",
                text: body,
            });
            console.log("Email sent successfully");
        }
        catch (error) {
            console.error("Error sending email:", error);
        }
    });
}
