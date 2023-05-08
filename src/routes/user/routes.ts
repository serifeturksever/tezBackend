import express from 'express';
import { _get } from './get';
import { _filterUsers } from './post';

export const router = express.Router();

router
  .get('/', _get)
  .post('filterUsers', _filterUsers)