import express from 'express';
//import { _get } from './get';
import { _updateFav } from './post';
import { _getUserFavs,_getUserAsFav } from './get';

export const router = express.Router();

router
  .get('/getUserFavs', _getUserFavs)
  .get('/getUserAsFav', _getUserAsFav)
  .post('/update', _updateFav)
