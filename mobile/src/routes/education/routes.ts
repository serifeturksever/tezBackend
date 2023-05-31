import express from 'express';
import { _get } from './get';
import { _filter, _getUserEducations } from './post';

export const router = express.Router();

router
  .get('/', _get)
  .post('/filter', _filter)
  .post('/getUserEducations', _getUserEducations)