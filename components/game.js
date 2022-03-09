import { useState } from 'react';
import Board from '../components/board'
import Controls from '../components/controls'

export default function Game() {

    const [deck, setDeck] = useState(createDeck())
    const [dealerHand, setDealerHand] = useState([{number: '8', suit: 0, value: 8}, {number: 'K', suit: 1, value: 10}])
    const [playerHand, setPlayerHand] = useState([{number: '8', suit: 0, value: 8}, {number: 'K', suit: 1, value: 10}])

    // Grab a random card from the deck
    function randomCard() {
        let activeCard = deck[deck.length-1];
        setDeck((prevDeck) => prevDeck.slice(0, -1));
        return activeCard
    }

    // initalize the deck, then shuffle
    function createDeck() {
        let init_deck = [];
        const valueList = {"A": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 10, "Q": 10, "K": 10};
        Object.keys(valueList).forEach(key => {
            for (let i = 0; i < 4; i++) {
                init_deck.push({number: key, suit: i, value: valueList[key]});
            }
        });

        init_deck.sort(() => Math.random() - 0.5);
        return init_deck
    }

    // Add a card to the players hand
    const hit = () => {
        let newCard = randomCard();
        setPlayerHand((prev) => [...prev, newCard]);
    }

    // Init Dealer Turn
    const stand = () => {
        console.log("stand");
    }

    return (
        <>
            <Board playerHand={playerHand} dealerHand={dealerHand} />
            <Controls hit={hit} stand={stand} />
        </>
    )
}

