import styles from "./card.module.scss";

export default function Card({ props }) {
    
    const suits = ['♠', '♥', '♦', '♣']
    return (
        <div className={styles.card}>
            <div className={styles.data}>
                <span>{props.number}</span>
                <i>{suits[props.suit]}</i>
            </div>
        </div>
    )
}