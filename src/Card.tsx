import {TCard} from "./shared/types.ts";

const cardSuits = ["clubs", "spades", "diamonds", "hearts"];
const cardRanks = ["6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];

const getCardImage = (cardSuit: number, cardRank: number) => {
    return `/cards/${cardSuits[cardSuit]}_${cardRanks[cardRank]}.svg`;
}

export const Card = ({suit, rank}: TCard) => {
    return <img className="max-h-40" src={getCardImage(suit, rank)} />;
}
