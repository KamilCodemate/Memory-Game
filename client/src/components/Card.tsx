import React from 'react';
import Images, { ImgType } from '../assets/images/imgExport';

type Props = {
  identifier: number;
  isShowed: boolean;
};

type ImageKey = keyof ImgType;

const Card: React.FC<Props> = ({ identifier, isShowed }): React.ReactElement => {
  let displayImage: string;
  if (isShowed) displayImage = Images[`img${identifier}` as ImageKey];
  if (isShowed) return <div className='card'></div>;
  return <></>;
};

export default Card;
