import config from 'config';
import path from 'path';
import express from 'express';
import session from 'express-session';
import {Server} from 'http';
import WebRouter from './http/WebRouter';
import ApiRouter from './http/ApiRouter';
import AuthRouter from './http/AuthRouter';
import {log} from './utilities/Logger';
import {client} from './utilities/Path';
import passport from 'passport';
import SteamStrategy from 'passport-steam';
import * as SocketServer from './SocketServer';

const app = express();
const server = Server(app);
const url = `${config.server.protocol}://${config.server.host}:${config.server.port}`;

SocketServer.listen(server);

passport.serializeUser((user, done) => done(undefined, user));
passport.deserializeUser((user, done) => done(undefined, user));

passport.use(new SteamStrategy({
  returnURL: `${url}/auth/sign-in/return`,
  realm: url,
  apiKey: config.steam.key,
}, (identifier, profile, done) => {
  const user = {
    id: profile.id,
    displayName: profile.displayName,
    avatar: profile._json.avatar,
    name: profile._json.realname,
    steamUrl: profile._json.profileurl,
  };
  done(null, user);
}));

app.disable('x-powered-by');
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', ApiRouter);
app.use('/client', express.static(client()));
app.use('/auth', AuthRouter);
app.use('/*', WebRouter);

export default server;
