import { useState, useEffect } from 'react';
import Board from '../components/board'
import Controls from '../components/controls'

export default function Game() {

    const [gameState, setGameState] = useState('init');
    const [deck, setDeck] = useState([]);
    const [lastMove, setLastMove] = useState('');
    const [dealerHand, setDealerHand] = useState([]);
    const [playerHand, setPlayerHand] = useState([]);

    // Grab a random card from the deck
    function randomCard() {
        let activeCard = deck[deck.length-1];
        setDeck((prevDeck) => prevDeck.slice(0, -1));
        return activeCard
    }

    // Get the sum of cards in the hand
    function sumOfHand(hand) {
        let sum = 0;
        hand.forEach(card => {
            sum += card.value
        });
        return sum
    }

    // initalize the deck, then shuffle
    async function createDeck() {
        let init_deck = [];
        const valueList = {"A": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 10, "Q": 10, "K": 10};
        Object.keys(valueList).forEach(key => {
            for (let i = 0; i < 4; i++) {
                init_deck.push({number: key, suit: i, value: valueList[key], key: init_deck.length});
            }
        });

        init_deck.sort(() => Math.random() - 0.5);
        return init_deck
    }

    // Add a card to the players hand
    const hit = () => {
        let newCard = randomCard();
        setPlayerHand((prev) => [...prev, newCard]);
        setLastMove('hit')
    }

    // Init Dealer Turn
    const stand = () => {
        setLastMove('stand')
    }

    const reset = () => {
        setGameState('init')
    }

    // intialize game
    useEffect(() => {
        console.log(gameState);
        if (gameState == 'init') {
            createDeck().then((newDeck) => {
                setDeck(newDeck.slice(4));
                setDealerHand(deck.slice(0,2));
                setPlayerHand(deck.slice(2,4));
            });

            setLastMove('')
            setGameState('in-game');
        } else if (gameState == 'in-game') {

        
        }
    }, [gameState])

    // run after every render
    useEffect(() => {

        if (gameState == 'in-game') {
            let dealerSum = sumOfHand(dealerHand);
            let playerSum = sumOfHand(playerHand);

            if (lastMove == 'hit') {
                if (playerSum > 21) {
                    // Bust!
                    console.log("PLAYER BUST");
                    setGameState('game-over');
                }
            } else if (lastMove == 'stand') {
                if (dealerSum > 21) {
                    // Dealer Bust!
                    console.log("dealer busts!")
                    setGameState('game-over');
                    
                } else if (dealerSum < 17) {
                    // dealer draws another card
                    let newCard = randomCard();
                    setDealerHand((prev) => [...prev, newCard])
                
                } else {
                    // neither busts
                    if (dealerSum > playerSum) {
                        // Dealer Win!
                        console.log("dealer win")
                    } else if (dealerSum == playerSum) {
                        // Draw!!
                        console.log("draw")
                    } else {
                        // Player Win
                        console.log("player win")
                    }

                    setGameState('game-over');
                }
            }
        }
    })


    return (
        <>
            <Board playerHand={playerHand} dealerHand={dealerHand} />
            <Controls hit={hit} stand={stand} reset={reset} gameState={gameState} />
        </>
    )
}

