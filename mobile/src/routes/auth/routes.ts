import express from 'express';
import { _signup,_login,_forgotPassword,_updatePassword } from './post';

export const router = express.Router();

router
  //.get('/', _get)
  .post('/signup', _signup)
  .post('/login', _login)
  .post('/forgotPassword', _forgotPassword)
  .post('/updatePassword', _updatePassword)