import React, { useState, useEffect, useCallback } from 'react';
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
  const [lock, changeLock] = useState<boolean>(gameData.playerNo === 0);
  const [showedCount, setShowedCount] = useState<number>(0);

  const [cardsPos, setcardPos] = useState<Array<card>>([]);

  const handleClick = useCallback(
    (column: number, row: number): void => {
      if (lock && showedCount < 2) {
        const arrayIndex = cardsPos.findIndex((element) => element.column === column && element.row === row);
        const newCardsPos = [...cardsPos];
        newCardsPos[arrayIndex] = {
          ...newCardsPos[arrayIndex],
          isShowed: true,
        };

        if (showedCount === 1) {
          setTimeout(() => {
            setShowedCount(0);
            const firstCard = newCardsPos.findIndex((card) => card.isShowed === true);
            const secondCard = newCardsPos.findIndex(
              (card) => card.isShowed === true && card.correctIndentifier === newCardsPos[firstCard]?.correctIndentifier
            );

            if (firstCard !== -1) newCardsPos[firstCard].isShowed = false;
            if (secondCard !== -1) newCardsPos[secondCard].isShowed = false;
            newCardsPos.forEach((card) => {
              card.isShowed = false;
            });

            const updateGame = async () => {
              try {
                const response = await axios.put('/api/game', {
                  cardData: newCardsPos,
                  gameData: {
                    gameId: gameData.gameId,
                    playerId: gameData.playerId,
                    playerNo: gameData.playerNo,
                  },
                  nextTurn: true,
                });
                if (response.data.playerTurn === gameData.playerNo) {
                  changeLock(true);
                } else {
                  changeLock(false);
                }
              } catch (err) {
                console.log(err);
              }
            };
            updateGame();
          }, 3000);
        }

        setShowedCount(showedCount + 1);
        setcardPos(newCardsPos);

        const updateGame = async () => {
          try {
            await axios.put('/api/game', {
              cardData: newCardsPos,
              gameData: {
                gameId: gameData.gameId,
                playerId: gameData.playerId,
                playerNo: gameData.playerNo,
              },
            });
          } catch (err) {
            console.log(err);
          }
        };
        updateGame();
      }
    },
    [cardsPos, gameData.gameId, gameData.playerId, gameData.playerNo, lock, showedCount]
  );

  useEffect(() => {
    const updateGame = async () => {
      try {
        const response = await axios.post('/api/game', { gameId: gameData.gameId, playerId: gameData.playerId, playerNo: gameData.playerNo });

        if (response.data.playerTurn === gameData.playerNo) {
          changeLock(true);
        } else {
          changeLock(false);
        }

        const cards = response.data.cards;
        let cardSorted: Array<card> = [];
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 7; j++) {
            cardSorted.push(cards[cards.findIndex((element: card) => element.column === j && element.row === i)]);
          }
        }
        if (cardSorted !== cardsPos) setcardPos(cardSorted);
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
