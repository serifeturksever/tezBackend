import express from 'express';
import { _get } from './get';
import { _sendMail } from './post';

export const router = express.Router();

router
  .get('/', _get)
  .post("/sendMail",_sendMail)