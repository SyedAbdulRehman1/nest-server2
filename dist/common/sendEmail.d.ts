declare const sendEmail: (to: string, subject: string, text: string, html?: string) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export default sendEmail;
