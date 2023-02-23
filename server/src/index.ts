import express from 'express';
import uniqid from 'uniqid';

const app = express();
interface GameData {
  id: string;
  players: [player1: string, player2?: string];
  joinCode: string;
  card?: Array<card>;
  ready: boolean;
  playerPoints?: [p1Points: number, p2Points: number];
  playerTurn?: number;
}
let Games: Array<GameData> = [];
type card = {
  column: number;
  row: number;
  correctIndentifier: number;
  isShowed: boolean;
  isDeleted: boolean;
};

const generateCards = (): Promise<Array<card>> => {
  return new Promise((resolve, reject) => {
    let cardArray: Array<card> = [];
    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < 2; j++) {
        let card: card;
        do {
          card = {
            column: Math.floor(Math.random() * 7),
            row: Math.floor(Math.random() * 4),
            correctIndentifier: i,
            isShowed: false,
            isDeleted: false,
          };
        } while (cardArray.find((element) => element.column === card.column && element.row === card.row));
        cardArray.push(card);
      }
    }
    resolve(cardArray);
  });
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api/code', (req, res) => {
  const joinCode = uniqid();
  const playerId = uniqid();
  const gameId = uniqid();
  Games.push({ id: gameId, players: [playerId], joinCode: joinCode, ready: false, playerTurn: 0, playerPoints: [0, 0] });
  return res.status(200).json({ sucess: true, joinCode: joinCode, gameId: gameId, playerId: playerId, playerPoints: [0, 0] });
});

app.post('/api/join', (req, res) => {
  const playerId = uniqid();
  const joinableCode = req.body.joinCode;
  const correctGame = Games.findIndex((element) => element.joinCode === joinableCode);

  if (correctGame === -1) return res.status(404).json({ success: false, errorContent: 'Game not found' });
  if (Games[correctGame].ready) return res.status(409).json({ success: false, errorContant: 'This game has already started' });
  Games[correctGame].players[1] = playerId;
  Games[correctGame].ready = true;

  return res.status(200).json({ success: true, gameId: Games[correctGame].id, playerId: playerId });
});

app.post('/api/checkgame', (req, res) => {
  const gameId = req.body.gameId;

  if (gameId) {
    const correctGame = Games.findIndex((element) => element.id === gameId);

    if (correctGame === -1) return res.status(404).json({ success: false, errorContent: 'Invalid game identifier' });
    if (!Games[correctGame].ready) return res.status(200).json({ success: false, errorContent: 'Game has not started yet' });
    return res.json({ success: true });
  }
});

app.post('/api/game', (req, res) => {
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
});

app.put('/api/game', (req, res) => {
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
});

app.listen(5000);
