import { Request, Response } from 'express';
import { Games } from '../helpers/Games';
import generateCards from '../helpers/generateCards';

const RestartGame = async (req: Request, res: Response) => {
  const { gameId } = req.body;

  const correctGameId = Games.findIndex((element) => (element.id = gameId));

  if (correctGameId === -1) return res.status(404).json({ errorConent: 'Game not found' });

  Games[correctGameId].playerPoints = [0, 0];
  Games[correctGameId].playerTurn = 0;
  Games[correctGameId].card = await generateCards();
  return res.status(200).json({ success: true, gameId: gameId, playerTurn: 0, playerPoints: [0, 0], cards: Games[correctGameId].card });
};

export default RestartGame;
