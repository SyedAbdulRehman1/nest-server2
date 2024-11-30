"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const sendEmail = async (to, subject, text, html) => {
    console.log(process.env.EMAIL_USERNAME, 'process.env.EMAIL_USERNAME');
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'fast33210@gmail.com',
            pass: 'fwnp azjg exgf bunc',
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        text,
        html,
    };
    return transporter.sendMail(mailOptions);
};
exports.default = sendEmail;
//# sourceMappingURL=sendEmail.js.map