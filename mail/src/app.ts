import dotenv from 'dotenv';
import { ServicesRequest } from './services/microServices';

export const VARIABLES = process.env;
if (process.env.NODE_ENV != "production") {
    dotenv.config();
  }

  import { Db, Decimal128, MongoClient, ObjectId } from 'mongodb';
  const mongoClient: MongoClient = new MongoClient("mongodb+srv://serifeturksever:5TuhBQ0KmdHfQ6cx@cluster0.9ioa5np.mongodb.net/");
                                                    
  export const mongodbRead: Db = mongoClient.db("bitirmeteziMail");
  export const mongodbWrite: Db = mongoClient.db("bitirmeteziMail");
  
  import express from 'express';
  import cors from 'cors';
  import bodyParser from 'body-parser';
  import { Emailer, forgotPasswordEmailTemplate, newUserEmailTemplate } from './services/mailService';

import { router as mailRouter } from './routes/mail/routes';

const port = 3002;
export const app = express();
const http = require("http");
export const server = http.createServer(app);

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors())
  .use('/mail', mailRouter)



app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(port, () => {
  console.log(`Mail server started on port ${port}`);
}); 