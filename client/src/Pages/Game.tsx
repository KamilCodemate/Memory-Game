import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/Game.scss';
type card = {
  column: number;
  row: number;
  correctIndentifier: number;
  isShowed: boolean;
};
const Game: React.FC<{}> = (): React.ReactElement => {
  const [gameData, setGameData] = useState<{ gameId: string; playerId: string; playerNo: number | string }>(
    JSON.parse(localStorage.getItem('gameData') as string)
  );
  const [cardsPos, setcardPos] = useState<Array<card>>(null as any);
  useEffect(() => {
    console.log(gameData);

    const updateGame = async () => {
      try {
        const response = await axios.post('/api/game', { gameId: gameData.gameId, playerId: gameData.playerId, playerNo: gameData.playerNo });
        console.log(response);
        const cards = response.data.cards;
        setcardPos(cards);
      } catch (err) {
        console.log(err);
      }
    };
    const sendReq = setInterval(updateGame, 200);
    updateGame();
    return () => {
      clearInterval(sendReq);
    };
  }, []);
  return <div></div>;
};

export default Game;
