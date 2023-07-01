import express from 'express';
import { _notifyFollowersByEmail } from './post';

export const router = express.Router();

router
  .post('/notifyFollowersByEmail', _notifyFollowersByEmail)