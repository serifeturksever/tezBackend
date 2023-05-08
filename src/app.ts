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
//import { _get } from './routes/user/get';
import { router as userRouter } from './routes/user/routes';



export const app = express();
const http = require("http");


app.use('/user', userRouter)
// Configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure CORS
app.use(cors());

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Origin', 'Accept', 'Accept-Language', 'X-Requested-With', 'Content-Type', 'Authorization', 'Referer', 'Source', 'User-Agent', 'tkn', 'rtkn']
}

app.use('*', cors(corsOptions))


export const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('hi');
});

// app.post('/', (req,res)=>{
//    res.send('hi');
// })


// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});