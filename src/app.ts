import dotenv from 'dotenv';

export const VARIABLES = process.env;
if (process.env.NODE_ENV != "production") {
    dotenv.config();
  }
import { Db, Decimal128, MongoClient, ObjectId } from 'mongodb';
const mongoClient: MongoClient = new MongoClient("mongodb+srv://serifeturksever:lm3vvXWJLBfrYhmh@cluster0.pgszwa5.mongodb.net/test");
export const mongodbRead: Db = mongoClient.db("bitirmetezi");
export const mongodbWrite: Db = mongoClient.db("bitirmetezi");

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { getCompanies } from './models/companies';
import { getCourses } from './models/courses';
import { getEducations } from './models/educations';
import { getLanguages } from './models/languages';
import { getSkills } from './models/skills';
import { getUsers } from './models/users';


export const app = express();

// Configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure CORS
app.use(cors());

setTimeout(async () => {
    // console.time("dbsave")
    let skill = await getSkills()
    // console.timeEnd("dbsave")
  });

// Define a route
app.get('/', (req, res) => {
  res.send('hi');
});

// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});