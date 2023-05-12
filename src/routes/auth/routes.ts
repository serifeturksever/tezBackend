import express from 'express';
import { _signup } from './post';

export const router = express.Router();

router
  //.get('/', _get)
  .post('/signup', _signup)