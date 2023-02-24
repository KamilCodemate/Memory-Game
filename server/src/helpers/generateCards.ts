import { Card } from '../types/Card';

const generateCards = (): Promise<Array<Card>> => {
  return new Promise((resolve, reject) => {
    let cardArray: Array<Card> = [];
    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < 2; j++) {
        let card: Card;
        do {
          card = {
            column: Math.floor(Math.random() * 7),
            row: Math.floor(Math.random() * 4),
            correctIndentifier: i,
            isShowed: false,
            isDeleted: false,
          };
        } while (cardArray.find((element) => element.column === card.column && element.row === card.row));
        cardArray.push(card);
      }
    }
    resolve(cardArray);
  });
};
export default generateCards;
