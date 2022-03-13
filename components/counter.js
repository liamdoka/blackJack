import styles from './counter.module.scss'

export default function Counter({ count }) {

    return (
     <div className={styles.container}>
         <div className={styles.count}>{count || 0}</div>
     </div>   
    )
}