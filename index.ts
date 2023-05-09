import {app} from './src/app';
const port = 3000; // 3001 olabilir

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});