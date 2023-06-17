"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUsernameEmailTemplate = exports.updatePasswordEmailTemplate = exports.forgotPasswordEmailTemplate = exports.notifyAdminNewUserEmailTemplate = exports.newUserEmailTemplate = exports.emailer = exports.Emailer = void 0;
const nodemailer = __importStar(require("nodemailer"));
class Emailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "dundarburhann@gmail.com",
                pass: "cfxovwgkcnvcxlld" //process.env.GMAIL_PASSWORD,
            },
        });
    }
    sendEmail(mailOptions) {
        return this.transporter.sendMail(mailOptions);
    }
    notifyAdminForNewUser(email, username) {
        this.sendEmail((0, exports.notifyAdminNewUserEmailTemplate)(email, username));
    }
    notifyUserForSignup(email, username) {
        this.sendEmail((0, exports.newUserEmailTemplate)(email, username));
    }
}
exports.Emailer = Emailer;
exports.emailer = new Emailer();
const newUserEmailTemplate = (email, username) => {
    return {
        from: "dundarburhann@gmail.com",
        to: email,
        subject: `${username}, Welcome to the our app`,
        text: "Welcome to the our app",
        html: `
      <h1>Welcome to our app!</h1>
      <p>We're glad you've decided to join us. We hope you find everything you're looking for here and enjoy using our app.</p>
      <p>If you have any questions or need any help, please don't hesitate to contact us. Thank you for signing up!</p>
    `,
    };
};
exports.newUserEmailTemplate = newUserEmailTemplate;
const notifyAdminNewUserEmailTemplate = (email, username) => {
    return {
        from: "dundarburhann@gmail.com",
        to: "burhandundar2399@gmail.com",
        subject: `New User: ${username} - email: ${email}`,
        text: `New User: ${username} - email: ${email}`,
        html: `
      <h1>New User: ${username}</h1>
      <p>email: ${email}</p>
    `,
    };
};
exports.notifyAdminNewUserEmailTemplate = notifyAdminNewUserEmailTemplate;
const forgotPasswordEmailTemplate = (email, password) => {
    return {
        from: "dundarburhann@gmail.com",
        to: `${email}`,
        subject: `New Password - email: ${email}`,
        text: `New Password: ${password} - email: ${email}`,
        html: `
      <h1>New Password: ${password}</h1>
      <p>email: ${email}</p>
    `,
    };
};
exports.forgotPasswordEmailTemplate = forgotPasswordEmailTemplate;
const updatePasswordEmailTemplate = (email) => {
    console.log("email", email);
    return {
        from: "dundarburhann@gmail.com",
        to: `${email}`,
        subject: `Update Password`,
        text: "Your password is updated.",
        html: `
      <h1>Your password is updated.</h1>
      <p>If you did not change your password, please don't hesitate to contact us.</p>
    `,
    };
};
exports.updatePasswordEmailTemplate = updatePasswordEmailTemplate;
const updateUsernameEmailTemplate = (email, newUsername) => {
    return {
        from: "dundarburhann@gmail.com",
        to: `${email}`,
        subject: `Update Username`,
        text: "Your username is updated.",
        html: `
      <h1>Your username is updated.</h1>
      <p>If you did not change your username, please don't hesitate to contact us.</p>
    `,
    };
};
exports.updateUsernameEmailTemplate = updateUsernameEmailTemplate;
//# sourceMappingURL=mailService.js.map