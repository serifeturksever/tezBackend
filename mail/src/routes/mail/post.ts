import express from 'express';
import { Emailer,forgotPasswordEmailTemplate,newUserEmailTemplate, updatePasswordEmailTemplate } from '../../services/mailService';

let emailer = new Emailer()


// Bu sistemler promise ile nasıl yapılacak kontrol et, bulunduğunda belki ona çeviririz
export const _sendRegisterMail = async (req,res) => {
    
    emailer.sendEmail(newUserEmailTemplate(req.body.email,req.body.username));

    res.send({"status": "ok"})
 }

 export const _sendForgotPasswordMail = async (req,res) => {
    emailer.sendEmail(forgotPasswordEmailTemplate(req.body.email,req.body.password));

    res.send({"status": "ok"})
 }

 export const _sendUpdatePasswordMail = async (req,res) => {
   console.log("postmail**********",req.body)
   emailer.sendEmail(updatePasswordEmailTemplate(req.body.email));

   res.send({"status": "ok"})
}
