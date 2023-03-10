import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import ScoreBoard from '../components/ScoreBoard';
import Summary from '../components/Summary';
import '../assets/styles/Game.scss';
type card = {
  column: number;
  row: number;
  correctIndentifier: number;
  isShowed: boolean;
  isDeleted: boolean;
};
const Game: React.FC<{}> = (): React.ReactElement => {
  const [gameData, setGameData] = useState<{ gameId: string; playerId: string; playerNo: number | string }>(
    JSON.parse(localStorage.getItem('gameData') as string)
  );
  const [lock, changeLock] = useState<boolean>(gameData.playerNo === 0);
  const [showedCount, setShowedCount] = useState<number>(0);
  const [lockRender, setLockRender] = useState<boolean>(false);
  const [points, setPoints] = useState<[p1Points: number, p2Points: number]>([0, 0]);

  const [cardsPos, setcardPos] = useState<Array<card>>([]);
  const [turn, setTurn] = useState<number>(0);

  const handleClick = useCallback(
    (column: number, row: number): void => {
      if (lock && showedCount < 2) {
        const arrayIndex = cardsPos.findIndex((element) => element.column === column && element.row === row);
        const newCardsPos = [...cardsPos];
        setLockRender(true);
        newCardsPos[arrayIndex] = {
          ...newCardsPos[arrayIndex],
          isShowed: true,
        };

        if (showedCount === 1) {
          setTimeout(() => {
            setShowedCount(0);

            const firstCard = newCardsPos.find((card) => card.isShowed === true);
            const secondCard = newCardsPos.find(
              (card) => card.isShowed === true && card.correctIndentifier === firstCard?.correctIndentifier && card !== firstCard
            );

            newCardsPos.forEach((card) => {
              card.isShowed = false;
            });
            let newPoints = points;
            if (secondCard && firstCard) {
              firstCard.isDeleted = true;
              secondCard.isDeleted = true;

              newPoints[gameData.playerNo as number] += 1;
            }

            const updateGame = async () => {
              try {
                const response = await axios.put('/api/game', {
                  cardData: newCardsPos,
                  gameData: {
                    gameId: gameData.gameId,
                    playerId: gameData.playerId,
                    playerNo: gameData.playerNo,
                    playerPoints: newPoints,
                  },
                  nextTurn: !(secondCard && firstCard),
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
    console.log(lockRender);
    if (!lockRender) {
      const updateGame = async () => {
        try {
          const response = await axios.post('/api/game', { gameId: gameData.gameId, playerId: gameData.playerId, playerNo: gameData.playerNo });
          console.log(response);
          setTurn(response.data.playerTurn);
          if (response.data.playerTurn === gameData.playerNo) {
            changeLock(true);
          } else {
            changeLock(false);
          }

          setPoints(response.data.playerPoints || [0, 0]);

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
    }
  }, []);

  const handleRevengeClick = useCallback((): void => {
    const updateGame = async () => {
      try {
        const response = await axios.put('/api/restartgame', { gameId: gameData.gameId });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    updateGame();
  }, []);

  return (
    <div className='gameContainer'>
      <ScoreBoard playerPoints={points} actualTurn={turn} playerNo={gameData.playerNo as number} />
      {cardsPos.every((card) => card.isDeleted === true) && <Summary playerPoints={points} handleRevengeClick={handleRevengeClick} />}
      <div className='cardContainer'>
        {!cardsPos.every((card) => card.isDeleted === true) &&
          cardsPos.map((element) => {
            return (
              <Card
                key={`SingleCard:Column${element.column}:Row${element.row}`}
                isShowed={element.isShowed}
                isDeleted={element.isDeleted}
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
