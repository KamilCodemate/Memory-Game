import { Router } from 'express';
import RestartGame from '../controllers/RestartGame';
const RestartGameRouter = Router();

RestartGameRouter.put('/', RestartGame);

export default RestartGameRouter;
