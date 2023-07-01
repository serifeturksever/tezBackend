import express from 'express';
import { _getMemberNotifyUsers, _getNotifiedUsers, _updateFollow } from './post';

export const router = express.Router();

router
  .post('/update', _updateFollow)
  .post('/getMemberNotifyUsers', _getMemberNotifyUsers)
  .post('/getNotifiedUsers', _getNotifiedUsers)