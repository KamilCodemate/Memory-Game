import React from 'react';
import '../assets/styles/Summary.scss';

type Props = {
  playerPoints: [p1Points: number, p2Points: number];
  handleRevengeClick: () => void;
};

const Summary: React.FC<Props> = ({ playerPoints, handleRevengeClick }): React.ReactElement => {
  const win = playerPoints[0] > playerPoints[1] ? 'Player 1' : 'Player 2';

  return (
    <div className={'summary'}>
      <div className='whoWon'>{`${win} Won!`}</div>
      <div className='revenge'>
        <button onClick={handleRevengeClick}>Revenge</button>
      </div>
    </div>
  );
};

export default Summary;
