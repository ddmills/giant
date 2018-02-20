import express from 'express';
import path from 'path';

const app = express();

app.use('/client', express.static(path.join(__dirname, '..', 'client')));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen('8080', () => console.log(`listening 8080`));
