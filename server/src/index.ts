import express from 'express';
import CodeRouter from './routes/code';
import JoinRouter from './routes/Join';
import GameRouter from './routes/Game';
import CheckGame from './controllers/CheckGame';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/code', CodeRouter);
app.use('/api/checkgame', CheckGame);
app.use('/api/join', JoinRouter);
app.use('/api/game', GameRouter);

app.listen(5000);
