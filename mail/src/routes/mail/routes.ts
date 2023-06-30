import express from 'express';
import { _get, _getAllMails } from './get';
import { _sendRegisterMail,_sendForgotPasswordMail,_sendUpdatePasswordMail, _informFollowerMembers, _notifyUserFollowersAboutUpdates } from './post';

export const router = express.Router();

router
  .get('/', _get)
  .get('/getAllMails', _getAllMails)
  .post('/register',_sendRegisterMail)
  .post('/forgotPassword',_sendForgotPasswordMail)
  .post('/updatePassword',_sendUpdatePasswordMail)
  .post('/informFollowerMembers',_informFollowerMembers)
  .post('/notifyUserFollowersAboutUpdates', _notifyUserFollowersAboutUpdates)
