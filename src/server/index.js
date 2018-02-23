import config from 'config';
import path from 'path';
import express from 'express';
import session from 'express-session';
import {Server} from 'http';
import WebRouter from './routes/WebRouter';
import ApiRouter from './routes/ApiRouter';

const app = express();
const server = Server(app);

app.use(session({
  secret: config.session.secret
}));
app.use('/', WebRouter);
app.use('/api', ApiRouter);
app.use('/client', express.static(path.join(__dirname, '..', 'client')));


server.listen(config.server.port, () => console.log(`${config.server.protocol}://${config.server.host}:${config.server.port}`));
