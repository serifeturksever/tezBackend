import express from 'express';
import { _get } from './get';
import { _filter } from './post';

export const router = express.Router();

router
  .get('/', _get)
  .post('/filter', _filter)