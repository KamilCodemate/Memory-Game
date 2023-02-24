import { Request, Response } from 'express';
import { Games } from '../helpers/Games';
import generateCards from '../helpers/generateCards';

export const GamePost = (req: Request, res: Response) => {
  try {
    const { playerId, gameId, playerNo } = req.body;

    const correctGameId = Games.findIndex((element) => element.players[playerNo] === playerId && element.id === gameId);
    if (correctGameId === -1) return res.status(403).json({ success: false, errorContent: 'Player does not belong to any game' });
    if (!Games[correctGameId].card) {
      generateCards().then((cards) => (Games[correctGameId].card = cards));
    }

    console.log(Games[correctGameId].playerPoints);
    return res.status(200).json({
      success: true,
      cards: Games[correctGameId].card,
      playerTurn: Games[correctGameId].playerTurn,
      playerPoints: Games[correctGameId].playerPoints,
    });
  } catch (err) {
    console.log(err);
  }
};

export const GamePut = (req: Request, res: Response) => {
  {
    const { cardData, gameData } = req.body;
    let nextTurn: boolean | null | undefined;

    try {
      nextTurn = req.body.nextTurn;
    } catch (err) {
      console.log(err);
    }
    const correctGameId = Games.findIndex((element) => element.players[gameData.playerNo] === gameData.playerId && element.id === gameData.gameId);
    if (correctGameId === -1) return res.status(403).json({ success: false, errorContent: 'Player does not belong to any game' });

    Games[correctGameId].card = cardData;
    if (gameData.playerPoints) Games[correctGameId].playerPoints = gameData.playerPoints;
    console.log(gameData.playerPoints);

    if (nextTurn) {
      Games[correctGameId].playerTurn = Games[correctGameId].playerTurn === 0 ? 1 : 0;
    }
    return res.status(200).json({ success: true, playerTurn: Games[correctGameId].playerTurn });
  }
};
