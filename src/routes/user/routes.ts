import express from 'express';
import { _get } from './get';

export const router = express.Router();

router
  .get('/', _get)