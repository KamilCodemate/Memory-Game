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

  const handleClick = (column: number, row: number): void => {
    const arrayIndex = cardsPos.findIndex((element) => element.column === column && element.row === row);

    const newCardsPos = [...cardsPos];
    newCardsPos[arrayIndex] = {
      ...newCardsPos[arrayIndex],
      isShowed: true,
    };

    setcardPos(newCardsPos);
    console.log(column, row);
  };

  useEffect(() => {
    const updateGame = async () => {
      try {
        const response = await axios.post('/api/game', { gameId: gameData.gameId, playerId: gameData.playerId, playerNo: gameData.playerNo });

        const cards = response.data.cards;
        let cardSorted: Array<card> = [];
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 7; j++) {
            cardSorted.push(cards[cards.findIndex((element: card) => element.column === j && element.row === i)]);
          }
        }

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
          return (
            <Card
              key={`SingleCard:Column${element.column}:Row${element.row}`}
              isShowed={element.isShowed}
              identifier={element.correctIndentifier}
              handleClick={() => handleClick(element.column, element.row)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Game;