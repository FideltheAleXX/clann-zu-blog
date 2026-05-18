import express from 'express';

const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello. Server is ready.');
});
app.listen(PORT, () => {
  console.log(`Server is ready on http://localhost:${PORT}`);
});
