import path from 'path';
import {Router} from 'express';

const router = Router();

router.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '..', '..', 'client', 'index.html'));
});

export default router;
