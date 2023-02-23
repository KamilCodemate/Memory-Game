import React, { MouseEventHandler, Suspense } from 'react';
import Images, { ImgType } from '../assets/images/imgExport';
import '../assets/styles/Card.scss';

type Props = {
  identifier: number;
  isShowed: boolean;
  isDeleted: boolean;
  handleClick: MouseEventHandler;
};

type ImageKey = keyof ImgType;

const Card: React.FC<Props> = ({ identifier, isShowed, handleClick, isDeleted }): React.ReactElement => {
  let displayImage: string | null = null;
  let retElement: React.ReactNode;
  if (isShowed) {
    displayImage = Images[`img${identifier + 1}` as ImageKey];
  }

  if (!isDeleted)
    retElement = (
      <div className='card' style={{ backgroundImage: `url(${displayImage})` }} onClick={handleClick}>
        {!displayImage && (
          <Suspense fallback={<div>Loading...</div>}>
            <img src={Images[`img${identifier + 1}` as ImageKey]} alt={`Card`} style={{ display: 'none' }} />
          </Suspense>
        )}
      </div>
    );
  else retElement = <div className='card' style={{ backgroundColor: `#3a3a3a`, border: `1px solid #3a3a3a` }}></div>;
  return retElement;
};

export default Card;
