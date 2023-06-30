
import * as nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
import { createMail } from "../models/mail";

export class Emailer {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dundarburhann@gmail.com",
        pass: "cfxovwgkcnvcxlld"
      },
    });
  }

  public sendEmail(mailOptions: MailOptions) {
    return this.transporter.sendMail(mailOptions);
  }

  public async notifyAdminForNewUser(email: string, username: string) {
    return this.sendEmail(await notifyAdminNewUserEmailTemplate(email, username));
  }

  public async notifyUserForSignup(email: string, username: string) {
    this.sendEmail(await newUserEmailTemplate(email, username));
  }
}

export const emailer = new Emailer();

export const newUserEmailTemplate = async (email: string, username: string) => {
  let mail = {
    from: "dundarburhann@gmail.com",
    to: email,
    subject: `${username}, Welcome to the our app`,
    text: "Welcome to the our app",
    html: `
      <h1>Welcome to our app!</h1>
      <p>We're glad you've decided to join us. We hope you find everything you're looking for here and enjoy using our app.</p>
      <p>If you have any questions or need any help, please don't hesitate to contact us. Thank you for signing up!</p>
    `,
  } as MailOptions
  await createMail(mail);
  return mail;
};

export const notifyAdminNewUserEmailTemplate = async (
  email: string,
  username: string
) => {
  let mail = {
    from: "dundarburhann@gmail.com",
    to: "burhandundar2399@gmail.com",
    subject: `New User: ${username} - email: ${email}`,
    text: `New User: ${username} - email: ${email}`,
    html: `
      <h1>New User: ${username}</h1>
      <p>email: ${email}</p>
    `,
  } as MailOptions
  await createMail(mail);
  return mail;
};

export const forgotPasswordEmailTemplate = async (
  email: string,
  password: string
) => {
  let mail = {
    from: "dundarburhann@gmail.com",
    to: `${email}`,
    subject: `New Password - email: ${email}`,
    text: `New Password: ${password} - email: ${email}`,
    html: `
      <h1>New Password: ${password}</h1>
      <p>email: ${email}</p>
    `,
  } as MailOptions;
  await createMail(mail);
  return mail
};

export const updatePasswordEmailTemplate = async (email: string) => {
  let mail = {
    from: "dundarburhann@gmail.com",
    to: `${email}`,
    subject: `Update Password`,
    text: "Your password is updated.",
    html: `
      <h1>Your password is updated.</h1>
      <p>If you did not change your password, please don't hesitate to contact us.</p>
    `,
  } as MailOptions;
  await createMail(mail);
  return mail
};

export const updateUsernameEmailTemplate = async (email: string, newUsername: string) => {
  let mail = {
    from: "dundarburhann@gmail.com",
    to: `${email}`,
    subject: `Update Username`,
    text: "Your username is updated.",
    html: `
      <h1>Your username is updated.</h1>
      <p>If you did not change your username, please don't hesitate to contact us.</p>
    `,
  } as MailOptions;
  await createMail(mail);
  return mail;
};

export const informMemberFollowersAboutExperienceUpdate = async (email: string, memberName, experience: any) => {
  let mail = {
    from: "dundarburhann@gmail.com",
    to: `${email}`,
    subject: `${memberName} Yeni bir deneyim ekledi!`,
    text: `${memberName} ${experience.experienceCompany} şirketinde işe başladı`,
    html: `
      <h1>Takip ettiğin ${memberName} yeni bir işe girdi detayları seninle paylaştık...</h1>
      <p> ${memberName} ${experience.establishment} şirketinde ${experience.name} alanında ${experience.range} tarihinde ${experience.location} konumunda işe başladı. Ege Üniversitesi değerli üyesini tebrik etmeyi unutma 🎉🎉🎉 </p>
    `,
  } as MailOptions;
  await createMail(mail);
  return mail;
};

export const notifyUserFollowersAboutUpdates = async (
  email: string, 
  userName: string,
  experiences: Array<any>,
  skills: Array<any>,
  courses: Array<any>,
  educations: Array<any>,
  languages: Array<any>) => {

  let [experiencesText,skillsText,coursesText,educationsText,languagesText] = await Promise.all([
    createExperiencesNotification(experiences),
    createSkillsNotification(skills),
    createCoursesNotification(courses),
    createEducationsNotification(educations),
    createLanguagesNotification(languages),
  ]);

  let mail = {
    from: "dundarburhann@gmail.com",
    to: `${email}`,
    subject: `${userName} hakkında yeni güncellemeler var!`,
    text: `${userName} LinkedIn hesabında güncellemeler yaptı`,
    html: `
      ${experiencesText}
      ${skillsText}
      ${coursesText}
      ${educationsText}
      ${languagesText}
    `,
  } as MailOptions;
  await createMail(mail);
  return mail;
};

export const createExperiencesNotification = async (experiences: Array<any>) => {
  // sub experiencelılar için ne olacak düşünmedim
  if (experiences.length > 0) {
    let text = "<h1>Deneyim Güncellemeleri</h1>"
    for (let i = 0; i < experiences.length; i++) {
      text += `
    <h3>Experience Establishment: ${experiences[i].establishment}</h3>
    <div>Experience Name: ${experiences[i].name ?? "alt deneyimlerde güncelleme yapıldı"}</div>
    <div>Experience Range: ${experiences[i].range}</div>
    <div>Experience Location: ${experiences[i].location}</div>
    <br/>
    <hr/>
    `
    }
    return text;
  }
};

export const createSkillsNotification = async (skills: Array<any>) => {
  if (skills.length > 0) {
    let text = "<h1>Yetenek Güncellemeleri</h1>"
    for (let i = 0; i < skills.length; i++) {
      text += `
    <h3>Skill Title: ${skills[i].title}</h3>
    <br/>
    <hr/>
    `
    }
    return text;
  } else {
    return ""
  }
};

export const createCoursesNotification = async (courses: Array<any>) => {
  if (courses.length > 0) {
    let text = "<h1>Kurs Güncellemeleri</h1>"
    for (let i = 0; i < courses.length; i++) {
      text += `
    <h3>Course Title: ${courses[i].title}</h3>
    <br/>
    <hr/>
    `
    }
    return text;
  } else {
    return ""
  }
};

export const createEducationsNotification = async (educations: Array<any>) => {
  if (educations.length > 0) {
    let text = "<h1>Eğitim Güncellemeleri</h1>"
    for (let i = 0; i < educations.length; i++) {
      text += `
      <h3>Education Establishment: ${educations[i].establishment}</h3>
      <div>Education Degree: ${educations[i].degree}</div>
      <div>Education Range: ${educations[i].start_date}</div>
    <br/>
    <hr/>
    `
    }
    return text;
  } else {
    return ""
  }
};

export const createLanguagesNotification = async (languages: Array<any>) => {
  if (languages.length > 0) {
    let text = "<h1>Dil Güncellemeleri</h1>"
    for (let i = 0; i < languages.length; i++) {
      text += `
    <h3>Language Title: ${languages[i].title}</h3>
    <div>Language Level: ${languages[i].level}</div>
    <br/>
    <hr/>
    `
    }
    return text;
  } else {
    return ""
  }
};