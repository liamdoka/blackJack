import Card from "./card.js"
import styles from "./board.module.scss";

export default function Board({ playerHand, dealerHand }) {

    return (
        <div className={styles.board}>
            <div className={styles.dealer}>
                {dealerHand.map((card) => (
                    <Card props={card} key={card.key} />
                ))}
            </div>
            <div className={styles.player}>
                {playerHand.map((card) => (
                    <Card props={card} key={card.key} />
                ))}     
            </div>
        </div>
    )
}