import path from 'path';
import {Router} from 'express';
import * as GameController from './controllers/api/GameController';
import {requireAuthentication} from './middleware/Authentication';

const router = Router();

router.get('/game', requireAuthentication, GameController.getAll);
router.get('/game/:id', requireAuthentication, GameController.get);
router.post('/game', requireAuthentication, GameController.create);

export default router;
