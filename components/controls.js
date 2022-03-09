import styles from './controls.module.scss'

export default function Controls() {

    const hit = () => {
        console.log("hit")
    }

    const stand = () => {
        console.log("stand")
    }

    return (
     <div className={styles.controls}>
         <button className={styles.button} onClick={hit}>Hit</button>
         <button className={styles.button} onClick={stand}>Stand</button>
     </div>   
    )
}