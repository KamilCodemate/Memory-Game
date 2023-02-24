import React from 'react';
import '../assets/styles/ScoreBoard.scss';
type Props = {
  playerPoints: [p1Points: number, p2Points: number];
  actualTurn: number;
  playerNo: number;
};

const ScoreBoard: React.FC<Props> = ({ playerPoints, actualTurn, playerNo }): React.ReactElement => {
  return (
    <div className='scoreBoard'>
      <div className='player1'>
        <span className='points'>{playerPoints[0]}</span> <br />
        <span className='player' style={!actualTurn ? { textDecoration: `underline` } : {}}>
          Player 1{playerNo === 0 ? ` (You)` : ''}
        </span>
      </div>
      <div className='player2'>
        <span className='points'>{playerPoints[1]}</span>
        <br />
        <span className='player' style={actualTurn ? { textDecoration: `underline` } : {}}>
          Player 2{playerNo === 1 ? ` (You)` : ''}
        </span>
      </div>
    </div>
  );
};

export default ScoreBoard;
