import express from 'express';
import { _get } from './get';
import { _filter, _getCompanyUsersAsUserObj, _getFilteredUsers, _getUsersWithUserIds } from './post';

export const router = express.Router();

router
  .get('/', _get)
  .post('/filter', _filter)
  .post('/getCompanyUsersAsUserObj', _getCompanyUsersAsUserObj)
  .post('/getFilteredUsers', _getFilteredUsers)
  .post('/getUsersWithUserIds', _getUsersWithUserIds)