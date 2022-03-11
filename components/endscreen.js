import styles from "./endscreen.module.scss";


export default function EndScreen({ result, reset, shuffle, deckLen }) {

    const res = {
        'player-bust': "Bust!\nYou Lose",
        'dealer-bust': "Bust!\nYou Win!",
        'player-win': "Winner!",
        'dealer-win': "Loser!",
        'draw': "Draw!"
    }

    const win = ['player-win', 'dealer-bust']
    const bg_color = win.includes(result) ? 'win' : 'lose'

    return (
        <div className={styles.backdrop}>
            <div className={`${styles.result_container} ${styles[bg_color]}`} >
                <div className={styles.result_text}>{res[result]}</div>
                <div className={styles.buttonList}>
                    { deckLen > 10 && 
                        <button className={styles.button} onClick={reset}>New Hand</button>
                    }
                    <button className={styles.button} onClick={shuffle}>New Deck</button>
                </div>
            </div>
        </div>
    )
}