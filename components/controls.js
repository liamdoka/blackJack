import styles from './controls.module.scss'

export default function Controls({ hit, stand, reset, gameState }) {

    return (
     <div className={styles.controls}>
         <button className={styles.button} onClick={hit} disabled={gameState != 'in-game'}>Hit</button>
         <button className={styles.button} onClick={stand} disabled={gameState != 'in-game'}>Stand</button>
         { gameState == 'game-over' &&
            <button className={styles.button} onClick={reset}>Reset</button>
         }
     </div>   
    )
}