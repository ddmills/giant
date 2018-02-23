import path from 'path';
import {Router} from 'express';
import * as GameController from '../api/controllers/GameController';

const router = Router();

router.get('/game', GameController.getAll);
router.get('/game/:id', GameController.get);
router.post('/game', GameController.create);

export default router;
