import { useState, useEffect } from 'react';
import Board from '../components/board';
import Controls from '../components/controls';
import EndScreen from '../components/endscreen';
import Counter from '../components/counter';

export default function Game() {

    const [gameState, setGameState] = useState('');
    const [deck, setDeck] = useState([]);
    const [lastMove, setLastMove] = useState('');
    const [dealerHand, setDealerHand] = useState([]);
    const [playerHand, setPlayerHand] = useState([]);
    const [result, setResult] = useState(null);
    const [count, setCount] = useState(0);
    const [countedCards, setCountedCards] = useState([]);
    const counterArr = {"A": -1, "2": 1, "3": 1, "4": 1, "5": 1, "6": 1, "7": 0, "8": 0, "9": 0, "10": -1, "J": -1, "Q": -1, "K": -1};

    // Grab a random card from the deck
    function randomCard() {
        let activeCard = deck[0];
        setDeck((prevDeck) => prevDeck.slice(1));
        return activeCard
    }

    // Get the sum of cards in the hand
    function sumOfHand(hand) {
        let sum = 0;
        hand.forEach(card => {
            if (!card.hasOwnProperty('hidden') || !card.hidden) {
                sum += card.value;
            }
        });
        // If theres an Ace, assume it's worth 11
        if (hand.some(card => card.number === "A")) {
            sum = sum + 10 <= 21 ? sum + 10 : sum
        }
        return sum
    }

    // initalize the deck, then shuffle
    async function createDeck() {
        let init_deck = [];
        const valueList = {"A": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 10, "Q": 10, "K": 10};
        Object.keys(valueList).forEach(key => {
            for (let i = 0; i < 4; i++) {
                init_deck.push({number: key, suit: i, value: valueList[key], key: init_deck.length, counted: false});
            }
        });

        init_deck.sort(() => Math.random() - 0.5);
        return init_deck
    }

    const createGame = () => {

        createDeck().then((newDeck) => {
            setDeck(newDeck.slice(4));
            setDealerHand(newDeck.slice(0,2));
            setPlayerHand(newDeck.slice(2,4));
            setDealerHand(prevHand => [prevHand[0], {...prevHand[1], hidden: true}])
        });

        setCount(0);
        setCountedCards([]);
        setResult(null);
        setLastMove('');
        setGameState('in-game');
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
        setResult(null);
        setGameState('init');
    }

    // INTIALIZE GAME ONLY ONCE
    useEffect(() => {
        createGame()
    }, [])

    // INITALIZE EVERY HAND
    useEffect(() => {
        if (gameState == 'init') {
            setDealerHand(deck.slice(0,2));       
            setPlayerHand(deck.slice(2,4));
            setDeck(prevDeck => prevDeck.slice(4));
            
            // Hide the dealer's second card
            setDealerHand(prevHand => [prevHand[0], {...prevHand[1], hidden: true}])
            
            setLastMove('');
            setGameState('in-game');
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
                    setGameState('game-over');
                    setTimeout(() => {
                        setResult('player-bust')
                    }, 700);
                }
            } else if (lastMove == 'stand') {

                if (dealerHand.length == 2 && dealerHand[1]['hidden']) {
                    
                    setTimeout(() => {
                        setDealerHand((prevHand) => (
                            [prevHand[0], {...prevHand[1], hidden: false}]
                        ));
                    }, 300)
                } else {

                    if (dealerSum > 21) {
                        // Dealer Bust!
                        setGameState('game-over');
                        setTimeout(() => {
                            setResult('dealer-bust')
                        }, 700);
                        
                    } else if (dealerSum < 17) {
                        // dealer draws another card
                        let newCard = randomCard();
                        setTimeout(() => setDealerHand((prev) => [...prev, newCard]), 700)
                    
                    } else {
                        // neither busts
                        if (dealerSum > playerSum) {
                            // Dealer Win!
                            setTimeout(() => {
                                setResult('dealer-win')
                            }, 700);
                        } else if (dealerSum == playerSum) {
                            // Draw!!']
                            setTimeout(() => {
                                setResult('draw')
                            }, 700);
                        } else {
                            // Player Win
                            setTimeout(() => {
                                setResult('player-win')
                            }, 700);
                        }

                        setGameState('game-over');
                    }
                }
            }
        }
    }, [lastMove, dealerHand, playerHand])



    useEffect(() => {

        dealerHand.forEach(card => {
            if (!countedCards.includes(card.key) && !card.hidden) {
                setCount(prevCount => prevCount + counterArr[card.number])
                setCountedCards(prevCards => prevCards + [card.key])

                console.log(card.number, counterArr[card.number])
            } 
        });

        playerHand.forEach(card => {
            if (!countedCards.includes(card.key)) {
                setCount(prevCount => prevCount + counterArr[card.number])
                setCountedCards(prevCards => prevCards + [card.key])
                
                console.log(card.number, counterArr[card.number])
            }
        });

    }, [dealerHand, playerHand])


    return (
        <>
            <Counter count={count} />
            <Board playerHand={playerHand} dealerHand={dealerHand} />
            <Controls hit={hit} stand={stand} />
            {result && 
                <EndScreen result={result} reset={reset} shuffle={createGame} deckLen={deck.length}/>
            }
        </>
    )
}

