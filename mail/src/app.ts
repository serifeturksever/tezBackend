import express from 'express';
//import { Emailer, newUserEmailTemplate } from './services/mailService';

export const app = express();
const port = 3002;

// let emailer = new Emailer()
// emailer.sendEmail(newUserEmailTemplate("burhandundar2399@gmail.com","Burhan Dündar"));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Mail server started on port ${port}`);
});