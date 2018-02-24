import path from 'path';
import {Router} from 'express';
import {signIn, signOut} from './controllers/web/AuthenticationController';
import {client} from '../utilities/Path';

const router = Router();

router.get('/', (request, response) => {
  response.sendFile(client('index.html'));
});

router.post('/auth/sign-in', signIn);
router.post('/auth/sign-out', signOut);

export default router;
