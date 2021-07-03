import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server Started on port 3000');
});
