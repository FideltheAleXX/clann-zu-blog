import express from 'express';
import { postRouter } from './src/routes/routes';

const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello. Server is ready.');
});

app.use('/posts', postRouter);

app.listen(PORT, () => {
  console.log(`Server is ready on http://localhost:${PORT}`);
});
