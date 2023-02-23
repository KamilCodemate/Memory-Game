import React, { MouseEventHandler, Suspense } from 'react';
import Images, { ImgType } from '../assets/images/imgExport';
import '../assets/styles/Card.scss';

type Props = {
  identifier: number;
  isShowed: boolean;
  handleClick: MouseEventHandler;
};

type ImageKey = keyof ImgType;

const Card: React.FC<Props> = ({ identifier, isShowed, handleClick }): React.ReactElement => {
  let displayImage: string | null = null;

  if (isShowed) {
    displayImage = Images[`img${identifier + 1}` as ImageKey];
  }

  return (
    <div className='card' style={{ backgroundImage: `url(${displayImage})` }} onClick={handleClick}>
      {!displayImage && (
        <Suspense fallback={<div>Loading...</div>}>
          <img src={Images[`img${identifier + 1}` as ImageKey]} alt={`Card ${identifier}`} style={{ display: 'none' }} />
        </Suspense>
      )}
    </div>
  );
};

export default Card;
