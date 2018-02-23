import path from 'path';
import {Router} from 'express';
import * as AuthenticationController from './controllers/web/AuthenticationController';

const router = Router();

router.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '..', '..', 'client', 'index.html'));
});

router.post('/login', AuthenticationController.login);
router.post('/logout', AuthenticationController.logout);

export default router;
