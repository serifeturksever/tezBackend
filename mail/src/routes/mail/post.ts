import express from 'express';
import { Emailer,forgotPasswordEmailTemplate,informMemberFollowersAboutExperienceUpdate,newUserEmailTemplate, notifyUserFollowersAboutUpdates, updatePasswordEmailTemplate } from '../../services/mailService';

let emailer = new Emailer()
export const _sendRegisterMail = async (req,res) => {
    
    emailer.sendEmail(await newUserEmailTemplate(req.body.email,req.body.username));

    res.send({"status": "ok"})
 }

 export const _sendForgotPasswordMail = async (req,res) => {
    emailer.sendEmail(await forgotPasswordEmailTemplate(req.body.email,req.body.password));

    res.send({"status": "ok"})
 }

 export const _sendUpdatePasswordMail = async (req,res) => {
   emailer.sendEmail(await updatePasswordEmailTemplate(req.body.email));

   res.send({"status": "ok"})
}

export const _informFollowerMembers = async (req,res) => {
   let emails = req.body.emails
   let memberName = req.body.memberName
   let newExperience = req.body.newExperience

   for(let i=0;i < emails.length;i++){
      emailer.sendEmail(await informMemberFollowersAboutExperienceUpdate(emails[i],memberName,newExperience));
   }
   res.send({"status": "ok"})
}


export const _notifyUserFollowersAboutUpdates = async (req,res) => {
   let emails = req.body.emails
   let userName = req.body.userName
   let updatedExperiences = req.body.updatedExperiences
   let updatedSkills = req.body.updatedSkills
   let updatedCourses = req.body.updatedCourses
   let updatedEducations = req.body.updatedEducations
   let updatedLanguages = req.body.updatedLanguages

   for(let i=0;i < emails.length;i++){
      emailer.sendEmail(await notifyUserFollowersAboutUpdates(emails[i],userName,updatedExperiences,updatedSkills,updatedCourses,updatedEducations,updatedLanguages));
   }
   res.send({"status": "ok","msg": "mails have sent successfully!"})
}