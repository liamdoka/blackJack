import Card from "./card.js"
import styles from "./board.module.scss";

export default function Board({ playerHand, dealerHand }) {

    // Get the sum of cards in the hand
    function sumOfHand(hand) {
        let sum = 0;
        hand.forEach(card => {
            sum += card.value
        });
        return sum
    }

    return (
        <div className={styles.board}>
            <div className={styles.info}>Dealer Total: <span className={styles.value}>{sumOfHand(dealerHand)}</span></div>
            <div className={styles.dealer}>
                {dealerHand.map((card) => (
                    <Card props={card} key={card.key} />
                ))}
            </div>
            
            <div className={styles.info}>Player Total: <span className={styles.value}>{sumOfHand(playerHand)}</span></div>
            <div className={styles.player}>
                {playerHand.map((card) => (
                    <Card props={card} key={card.key} />
                ))}     
            </div>
        </div>
    )
}