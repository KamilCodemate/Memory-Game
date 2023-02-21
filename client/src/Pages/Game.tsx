import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
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
  const [cardsPos, setcardPos] = useState<Array<card>>([]);
  useEffect(() => {
    console.log(gameData);

    const updateGame = async () => {
      try {
        const response = await axios.post('/api/game', { gameId: gameData.gameId, playerId: gameData.playerId, playerNo: gameData.playerNo });

        const cards = response.data.cards;
        let cardSorted: Array<card> = [];
        for (let i = 0; i < 7; i++) {
          for (let j = 0; j < 4; j++) {
            cardSorted.push(cards[cards.findIndex((element: card) => element.column === i && element.row === j)]);
          }
        }
        console.log(cardSorted);
        setcardPos(cardSorted);
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
  return (
    <div className='gameContainer'>
      <div className='cardContainer'>
        {cardsPos.map((element) => {
          return <Card isShowed={element.isShowed} identifier={element.correctIndentifier} />;
        })}
      </div>
    </div>
  );
};

export default Game;
