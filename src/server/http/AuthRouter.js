import {Router} from 'express';
import {signIn, signOut} from './controllers/web/AuthenticationController';

const router = Router();

router.post('/sign-in', signIn);

router.get('/sign-in', (request, response) => {
  response.json({'test': 'test'});
});

export default router;
