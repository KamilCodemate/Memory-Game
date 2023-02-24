import uniqid from 'uniqid';
import { Games } from '../helpers/Games';
import { Request, Response } from 'express';

const JoinCode = (req: Request, res: Response) => {
  const playerId = uniqid();
  const joinableCode = req.body.joinCode;
  const correctGame = Games.findIndex((element) => element.joinCode === joinableCode);

  if (correctGame === -1) return res.status(404).json({ success: false, errorContent: 'Game not found' });
  if (Games[correctGame].ready) return res.status(409).json({ success: false, errorContant: 'This game has already started' });
  Games[correctGame].players[1] = playerId;
  Games[correctGame].ready = true;

  return res.status(200).json({ success: true, gameId: Games[correctGame].id, playerId: playerId });
};
export default JoinCode;
