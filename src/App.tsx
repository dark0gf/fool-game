import {Card} from "./Card.tsx";
import {useEffect, useState} from "react";
import {CardBack} from "./CardBack.tsx";
import {TCard, TCards} from "./shared/types.ts";

const createDeck = (): TCards => {
    const deck: TCards = [];

    for (let suit = 0; suit < 4; suit++) {
        for (let rank = 0; rank < 9; rank++) {
            deck.push({ suit, rank });
        }
    }

    return deck;
}

function createShuffleDeck(): TCards {
    const shuffledDeck: TCards = [];
    const tempDeck = createDeck();

    while (tempDeck.length > 0) {
        const randomIndex = Math.floor(Math.random() * tempDeck.length);
        const pickedCard = tempDeck.splice(randomIndex, 1)[0];
        shuffledDeck.push(pickedCard);
    }

    return shuffledDeck;
}

function App() {
    const [deck, setDeck] = useState<TCards>([]);
    const [player1Hand, setPlayer1Hand] = useState<TCards>([]);
    const [player2Hand, setPlayer2Hand] = useState<TCards>([]);
    const [trump, setTrump] = useState<TCard | undefined>();
    const [playerTurn, setPlayerTurn] = useState(1);

    useEffect(() => {
        const deck = createShuffleDeck();
        setPlayer1Hand(deck.splice(0, 6));
        setPlayer2Hand(deck.splice(0, 6));
        setTrump(deck.shift());
        setDeck(deck);
        setPlayerTurn(1);
    }, []);

    const playerAction = (playerNumber: number, cardNumber: number) => {
        if (playerNumber !== playerTurn) {
            return;
        }
        console.log(playerNumber, cardNumber);
        if (playerTurn === 1) {
            const playCard = player1Hand.splice(cardNumber, 1)[0];

            setPlayer1Hand([...player1Hand]);
            setPlayerTurn(2);
        } else {
            const playCard = player2Hand.splice(cardNumber, 1)[0];


            setPlayer2Hand([...player2Hand]);
            setPlayerTurn(1);
        }

        //TODO: continue to implement game logic / check if player can play this card / check if end game
    }




    return (
        <div className="w-full px-12">
            <h1 className="text-xl text-center">Fool Game</h1>
            <div className="flex gap-16 row">
                <div>
                    <div className="flex gap-1 mt-2">
                        {player1Hand.map((card: TCard, i) =>
                            <div
                                onClick={() => playerAction(1, i)}
                                key={card.suit + "-" + card.rank}
                                className="cursor-pointer"
                            >
                                <Card suit={card.suit} rank={card.rank}></Card>
                            </div>
                        )}
                    </div>

                    <div className="h-80"></div>

                    <div className="flex gap-1 mt-2">
                        {player2Hand.map((card: TCard, i) =>
                            <div
                                onClick={() => playerAction(2, i)}
                                key={card.suit + "-" + card.rank}
                                className="cursor-pointer"
                            >
                                <Card suit={card.suit} rank={card.rank}></Card>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    {trump && <div><Card suit={trump.suit} rank={trump.rank}></Card></div>}
                    {deck.length > 0 && <div><CardBack></CardBack></div>}
                </div>
            </div>
        </div>
    )
}

export default App
