import express from 'express';
import { _createFollow } from './post';

export const router = express.Router();

router
  .post('/create', _createFollow)