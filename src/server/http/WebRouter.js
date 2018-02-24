import path from 'path';
import {Router} from 'express';
import {login, logout} from './controllers/web/AuthenticationController';
import {client} from '../utilities/Path';

const router = Router();

router.get('/', (request, response) => {
  response.sendFile(client('index.html'));
});

router.post('/login', login);
router.post('/logout', logout);

export default router;
