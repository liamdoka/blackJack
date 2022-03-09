import styles from './controls.module.scss'

export default function Controls({ hit, stand }) {

    return (
     <div className={styles.controls}>
         <button className={styles.button} onClick={hit}>Hit</button>
         <button className={styles.button} onClick={stand}>Stand</button>
     </div>   
    )
}