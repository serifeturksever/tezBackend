import express from 'express';
import { _get } from './get';
import { _filter, _getUserLanguages } from './post';

export const router = express.Router();

router
  .get('/', _get)
  .post('/filter', _filter)
  .post('/getUserLanguages', _getUserLanguages)