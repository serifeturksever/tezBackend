import express from 'express';
import { _signup,_login } from './post';

export const router = express.Router();

router
  //.get('/', _get)
  .post('/signup', _signup)
  .post('/login', _login)