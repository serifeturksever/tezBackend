import express from 'express';
import { _get } from './get';
import { _sendRegisterMail,_sendForgotPasswordMail,_sendUpdatePasswordMail } from './post';

export const router = express.Router();

router
  .get('/', _get)
  .post('/register',_sendRegisterMail)
  .post('/forgotPassword',_sendForgotPasswordMail)
  .post('/updatePassword',_sendUpdatePasswordMail)
