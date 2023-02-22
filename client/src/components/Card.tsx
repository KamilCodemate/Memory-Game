import React, { MouseEventHandler, useEffect } from 'react';
import Images, { ImgType } from '../assets/images/imgExport';
import '../assets/styles/Card.scss';
type Props = {
  identifier: number;
  isShowed: boolean;
  handleClick: MouseEventHandler;
};

type ImageKey = keyof ImgType;

const Card: React.FC<Props> = ({ identifier, isShowed, handleClick }): React.ReactElement => {
  useEffect(() => {
    console.log(Images);
  }, []);

  let displayImage: string;
  let returnContent: React.ReactElement;
  if (isShowed) {
    displayImage = Images[`img${identifier + 1}` as ImageKey];
    returnContent = <div className='card' style={{ backgroundImage: `url(${displayImage})` }} onClick={handleClick}></div>;
  } else {
    returnContent = <div className='card' onClick={handleClick}></div>;
  }

  return returnContent;
};

export default Card;
