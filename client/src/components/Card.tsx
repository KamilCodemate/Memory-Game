import React from 'react';
import Images, { ImgType } from '../assets/images/imgExport';
import '../assets/styles/Card.scss';
type Props = {
  identifier: number;
  isShowed: boolean;
};

type ImageKey = keyof ImgType;

const Card: React.FC<Props> = ({ identifier, isShowed }): React.ReactElement => {
  let displayImage: string;
  let returnContent: React.ReactElement;
  if (isShowed) {
    displayImage = Images[`img${identifier}` as ImageKey];
    returnContent = <div className='card' style={{ backgroundImage: `url(${displayImage})` }}></div>;
  } else {
    returnContent = <div className='card'></div>;
  }

  return returnContent;
};

export default Card;
