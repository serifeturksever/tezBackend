import express from 'express';
import { Emailer,forgotPasswordEmailTemplate,newUserEmailTemplate, updatePasswordEmailTemplate } from '../../services/mailService';

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
