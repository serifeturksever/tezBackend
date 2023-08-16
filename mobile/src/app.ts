import dotenv from 'dotenv';

export const VARIABLES = process.env;
if (process.env.NODE_ENV != "production") {
    dotenv.config();
  }
import { Db, Decimal128, MongoClient, ObjectId } from 'mongodb';
const mongoClient: MongoClient = new MongoClient("<mongodb-connection-url");
export const mongodbRead: Db = mongoClient.db("<database-name>");
export const mongodbWrite: Db = mongoClient.db("<database-name>");

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { getCompanies } from './models/companies';
import { getCourses } from './models/courses';
import { getEducations } from './models/educations';
import { getLanguages } from './models/languages';
import { getSkills } from './models/skills';
import { getUsers } from './models/users';
import { router as userRouter } from './routes/user/routes';
import { router as favouriteRouter } from './routes/favourite/routes';
import { router as authRouter } from './routes/auth/routes';
import { router as skillRouter } from './routes/skill/routes';
import { router as experienceRouter } from './routes/experience/routes';
import { router as educationRouter } from './routes/education/routes';
import { router as courseRouter } from './routes/course/routes';
import { router as languageRouter } from './routes/language/routes';
import { router as companyRouter } from './routes/company/routes';
import { router as memberRouter } from './routes/member/routes';
import { router as followRouter } from './routes/follow/routes';
import { router as notificationRouter } from './routes/notification/routes';

export const app = express();
const http = require("http");
export const server = http.createServer(app);

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors())
  .use('/user', userRouter)
  .use('/favourite', favouriteRouter)
  .use('/auth', authRouter)
  .use('/skill', skillRouter)
  .use('/experience', experienceRouter)
  .use('/education', educationRouter)
  .use('/course', courseRouter)
  .use('/language', languageRouter)
  .use('/company', companyRouter)
  .use('/member', memberRouter)
  .use('/follow', followRouter)
  .use('/notification', notificationRouter)

app.get('/', (req, res) => {
  res.send('hii');
});

server.listen(3001, () => {
  console.log('Mobile server started on port 3001');
}); 