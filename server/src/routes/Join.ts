import { Router } from 'express';
import JoinCode from '../controllers/JoinGame';
const JoinRouter = Router();

JoinRouter.post('/', JoinCode);

export default JoinRouter;
