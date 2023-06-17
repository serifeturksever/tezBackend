import express from 'express';
import { _get } from './get';
import { _connectAccountWithLinkedIn } from './post';
// import { _filter, _getCompanyUsersAsUserObj } from './post';

export const router = express.Router();

router
  .get('/', _get)
  .post('/connectAccountWithLinkedIn', _connectAccountWithLinkedIn)
  // .post('/filter', _filter)
  // .post('/getCompanyUsersAsUserObj', _getCompanyUsersAsUserObj)