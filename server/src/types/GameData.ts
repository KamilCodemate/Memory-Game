import { Card } from './Card';

export default interface GameData {
  id: string;
  players: [player1: string, player2?: string];
  joinCode: string;
  card?: Array<Card>;
  ready: boolean;
  playerPoints?: [p1Points: number, p2Points: number];
  playerTurn?: number;
}
