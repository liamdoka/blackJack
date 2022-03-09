import Head from 'next/head'
import Board from '../components/board'
import Controls from '../components/controls'
import styles from '../styles/Home.module.scss'

export default function Home() {

  const playerHand = [{number: '8', suit: 'spades', value: 8}, {number: 'K', suit: 'hearts', value: 10}];
  const dealerHand = [{number: '8', suit: 'spades', value: 8}, {number: 'K', suit: 'hearts', value: 10}];

  for (let i = 0; i < playerHand.length; i++) {
    playerHand[i]['key'] = i + playerHand.length;
    dealerHand[i]['key'] = i;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>JackBlack Simulator</title>
        <meta name="description" content="blackjack simulator + card counting assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>Jack Black</h1>
      <section>
        <Board playerHand={playerHand} dealerHand={dealerHand} />
        <Controls />
      </section>
    </div>
  )
}
