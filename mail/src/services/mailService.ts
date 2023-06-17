
import * as nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

export class Emailer {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dundarburhann@gmail.com",//process.env.GMAIL_USER,
        pass: "cfxovwgkcnvcxlld" //process.env.GMAIL_PASSWORD,
      },
    });
  }

  public sendEmail(mailOptions: MailOptions) {
    return this.transporter.sendMail(mailOptions);
  }

  public notifyAdminForNewUser(email: string, username: string) {
    this.sendEmail(notifyAdminNewUserEmailTemplate(email, username));
  }

  public notifyUserForSignup(email: string, username: string) {
    this.sendEmail(newUserEmailTemplate(email, username));
  }
}

export const emailer = new Emailer();

export const newUserEmailTemplate = (email: string, username: string) => {
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
  } as MailOptions;
};

export const notifyAdminNewUserEmailTemplate = (
  email: string,
  username: string
) => {
  return {
    from: "dundarburhann@gmail.com",
    to: "burhandundar2399@gmail.com",
    subject: `New User: ${username} - email: ${email}`,
    text: `New User: ${username} - email: ${email}`,
    html: `
      <h1>New User: ${username}</h1>
      <p>email: ${email}</p>
    `,
  } as MailOptions;
};

export const forgotPasswordEmailTemplate = (
  email: string,
  password: string
) => {
  return {
    from: "dundarburhann@gmail.com",
    to: `${email}`,
    subject: `New Password - email: ${email}`,
    text: `New Password: ${password} - email: ${email}`,
    html: `
      <h1>New Password: ${password}</h1>
      <p>email: ${email}</p>
    `,
  } as MailOptions;
};

export const updatePasswordEmailTemplate = (email: string) => {
  console.log("email",email)
  return {
    from: "dundarburhann@gmail.com",
    to: `${email}`,
    subject: `Update Password`,
    text: "Your password is updated.",
    html: `
      <h1>Your password is updated.</h1>
      <p>If you did not change your password, please don't hesitate to contact us.</p>
    `,
  } as MailOptions;
};

export const updateUsernameEmailTemplate = (email: string,newUsername:string) => {
  return {
    from: "dundarburhann@gmail.com",
    to: `${email}`,
    subject: `Update Username`,
    text: "Your username is updated.",
    html: `
      <h1>Your username is updated.</h1>
      <p>If you did not change your username, please don't hesitate to contact us.</p>
    `,
  } as MailOptions;
};