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
          <h2>{coin.Name}</h2>
          <p>Country {coin.Country}</p>
          <p>Mint {coin.Mint}</p>
          <button>View</button>
      </div>
  </div>
  )
}

export default CoinItem