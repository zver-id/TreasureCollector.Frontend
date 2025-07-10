import styles from '../Home.module.css'

function CoinItem({ coin }){
  return (
    <div key={coin.id} className={styles.item}>
      <div className={styles.image}
           style={{
               backgroundImage: `url(${coin.Image})`,
           }}
      ></div>
      <div className={styles.info}>
          <h2>{coin.name}</h2>
          <p>Country {coin.country}</p>
          <p>Currency {coin.currency}</p>
          <p>Year {coin.year}</p>
          <button>View</button>
      </div>
  </div>
  )
}

export default CoinItem