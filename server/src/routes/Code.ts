import { Router } from 'express';
import CreateGame from '../controllers/CreateGame';
const CodeRouter = Router();

CodeRouter.get('/', CreateGame);

export default CodeRouter;
