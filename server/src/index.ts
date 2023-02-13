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
const genrateCards = (): Array<card> => {
  let retArray: Array<card> = [];

  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 2; j++) {
      const card: card = {
        column: Math.floor(Math.random() * 7),
        row: Math.floor(Math.random() * 6),
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

  Games.push({ id: uniqid(), players: [playerId], joinCode: joinCode, ready: false });
  return res.status(200).json({ sucess: true, joinCode: joinCode });
});

app.post('/api/join', (req, res) => {
  const playerId = uniqid();
  const joinableCode = req.body.joinCode;
  const correctGame = Games.findIndex((element) => element.joinCode === joinableCode);
  if (correctGame) {
    Games[correctGame].players[1] = playerId;
    Games[correctGame].ready = true;
  }
});

app.listen(5000);
