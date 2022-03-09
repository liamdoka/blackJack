import styles from "./card.module.scss";

export default function Card({ props }) {
    
    const handleClick = ({ target }) => {
        console.log(target)
    }

    return (
        <div className={styles.card} onClick={handleClick}>
            <div className={styles.data}>
                <span>{props.number}</span>
                <i className={`${styles.suit} ${styles[props.suit]}`}></i>
            </div>
        </div>
    )
}