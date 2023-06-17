import dotenv from 'dotenv';
import { ServicesRequest } from './services/microServices';

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
  import { Emailer, forgotPasswordEmailTemplate, newUserEmailTemplate } from './services/mailService';

import { router as mailRouter } from './routes/mail/routes';

const port = 3002;
export const app = express();
const http = require("http");
export const server = http.createServer(app); // FIXME: Is this neccessary ?

// Configure express
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors())
  .use('/mail', mailRouter)
// let emailer = new Emailer()
// emailer.sendEmail(newUserEmailTemplate("burhandundar2399@gmail.com","Burhan Dündar"));



app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.listen(port, () => {
//   return console.log(`Mail server started on port ${port}`);
// });

server.listen(port, () => {
  console.log(`Mail server started on port ${port}`);
}); 