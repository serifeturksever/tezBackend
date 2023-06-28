import express from 'express';
import { _get } from './get';
import { _createExperience, _deleteExperience, _filter, _getCompanyExperienceCount, _getCompanyUsers, _getUserExperiences, _updateExperience } from './post';

export const router = express.Router();

router
  .get('/', _get)
  .post('/filter', _filter)
  .post('/getUserExperiences', _getUserExperiences)
  .post('/getCompanyUsers', _getCompanyUsers)
  .post('/createExperience', _createExperience)
  .post('/delete', _deleteExperience)
  .post('/update', _updateExperience)
  .post('/companyExperienceCount', _getCompanyExperienceCount)
  