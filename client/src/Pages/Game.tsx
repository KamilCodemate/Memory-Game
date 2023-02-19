import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/Game.scss';

const Game: React.FC<{}> = (): React.ReactElement => {
  const [gameData, setGameData] = useState<{ gameId: string; playerId: string; playerNo: number | string }>(
    JSON.parse(localStorage.getItem('gameData') as string)
  );

  useEffect(() => {
    console.log(gameData);
    const updateGame = async () => {
      try {
        const response = await axios.post('/api/game', { gameId: gameData.gameId, playerId: gameData.playerId, playerNo: gameData.playerNo });
      } catch (err) {
        console.log(err);
      }
    };
  }, []);
  return <div></div>;
};

export default Game;
