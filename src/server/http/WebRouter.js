import {Router} from 'express';
import {client} from '../utilities/Path';

const router = Router();

router.get('/', (request, response) => {
  response.sendFile(client('index.html'));
});

export default router;
