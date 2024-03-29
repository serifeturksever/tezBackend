import express from 'express';
import { _getBookmarkedUsers, _getMemberFavAsUserIds, _memberFollowers, _updateFav } from './post';
import { _getUserFavs,_getUserAsFav } from './get';

export const router = express.Router();

router
  .get('/getUserFavs', _getUserFavs)
  .get('/getUserAsFav', _getUserAsFav)
  .post('/update', _updateFav)
  .post('/getMemberFavAsUserIds', _getMemberFavAsUserIds)
  .post('/getBookmarkedUsers',_getBookmarkedUsers)
  .post('/getMemberFollowers',_memberFollowers)
