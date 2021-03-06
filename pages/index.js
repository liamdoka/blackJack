import Head from 'next/head'
import Game from '../components/game'
import styles from '../styles/Home.module.scss'

export default function Home() {



  return (
    <div className={styles.container}>
      <Head>
        <title>JackBlack Simulator</title>
        <meta name="description" content="blackjack simulator + card counting assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>Jack Black</h1>
      <section>
        <Game />
      </section>
    </div>
  )
}
