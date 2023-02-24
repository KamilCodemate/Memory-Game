import uniqid from 'uniqid';
import { Games } from '../helpers/Games';
import { Request, Response } from 'express';

const CreateGame = (req: Request, res: Response) => {
  const joinCode = uniqid();
  const playerId = uniqid();
  const gameId = uniqid();
  Games.push({ id: gameId, players: [playerId], joinCode: joinCode, ready: false, playerTurn: 0, playerPoints: [0, 0] });
  return res.status(200).json({ sucess: true, joinCode: joinCode, gameId: gameId, playerId: playerId, playerPoints: [0, 0] });
};

export default CreateGame;
