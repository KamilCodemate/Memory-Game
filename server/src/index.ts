import express from 'express';
import uniqid from 'uniqid';

const app = express();
interface GameData {
  id: string;
  players: [player1: string, player2?: string];
  joinCode: string;
  card?: Array<card>;
  ready: boolean;
}
let Games: Array<GameData> = [];
type card = {
  column: number;
  row: number;
  correctIndetifier: number;
  isShowed: boolean;
};
const generateCards = (): Array<card> => {
  let retArray: Array<card> = [];
  const positionsUsed: { [position: string]: boolean } = {};

  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 2; j++) {
      let cardPosition: string;
      do {
        const column = Math.floor(Math.random() * 7);
        const row = Math.floor(Math.random() * 6);
        cardPosition = `${column},${row}`;
      } while (positionsUsed[cardPosition]);

      positionsUsed[cardPosition] = true;
      const card: card = {
        column: Number(cardPosition.split(',')[0]),
        row: Number(cardPosition.split(',')[1]),
        correctIndetifier: i,
        isShowed: false,
      };
      retArray.push(card);
    }
  }

  return retArray;
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api/code', (req, res) => {
  const joinCode = uniqid();
  const playerId = uniqid();
  const gameId = uniqid();
  Games.push({ id: gameId, players: [playerId], joinCode: joinCode, ready: false });
  return res.status(200).json({ sucess: true, joinCode: joinCode, gameId: gameId, playerId: playerId });
});

app.post('/api/join', (req, res) => {
  const playerId = uniqid();
  const joinableCode = req.body.joinCode;
  const correctGame = Games.findIndex((element) => element.joinCode === joinableCode);

  if (correctGame === -1) return res.status(404).json({ success: false, errorContent: 'Game not found' });
  if (Games[correctGame].ready) return res.status(409).json({ success: false, errorContant: 'This game has already started' });
  Games[correctGame].players[1] = playerId;
  Games[correctGame].ready = true;

  console.log(Games[correctGame]);

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
  const playerId = req.body.playerId;
  const gameId = req.body.gameId;
});

app.listen(5000);
