import React from 'react';
import Images, { ImgType } from '../assets/images/imgExport';
import '../assets/styles/Card.scss';
type Props = {
  identifier: number;
  isShowed: boolean;
  handleClick: () => void;
};

type ImageKey = keyof ImgType;

const Card: React.FC<Props> = ({ identifier, isShowed, handleClick }): React.ReactElement => {
  let displayImage: string;
  let returnContent: React.ReactElement;
  if (isShowed) {
    displayImage = Images[`img${identifier}` as ImageKey];
    returnContent = <div className='card' style={{ backgroundImage: `url(${displayImage})` }} onClick={handleClick}></div>;
  } else {
    returnContent = <div className='card'></div>;
  }

  return returnContent;
};

export default Card;
