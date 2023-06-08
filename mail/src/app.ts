import express from 'express';
export const app = express();
const port = 3002;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Mail server started on port ${port}`);
});