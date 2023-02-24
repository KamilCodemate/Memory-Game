import { Router } from 'express';
const GameRouter = Router();
import { GamePost, GamePut } from '../controllers/Game';

GameRouter.post('/', GamePost);
GameRouter.put('/', GamePut);

export default GameRouter;
