import {Router} from 'express';
import {signIn, signOut} from './controllers/web/AuthenticationController';
import passport from 'passport';
import config from 'config';

const router = Router();

router.get('/sign-in', (request, response, next) => {
  request.session.targetUri = request.query.target || '/';
  next();
}, passport.authenticate('steam'));

router.get('/sign-in/return', passport.authenticate('steam', { failureRedirect: '/auth/sign-in' }), signIn);

export default router;
