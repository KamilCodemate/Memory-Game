import { Router } from 'express';
import CheckGame from '../controllers/CheckGame';

const CheckGameRouter = Router();

CheckGameRouter.post('/api/checkgame', CheckGame);
export default CheckGameRouter;
