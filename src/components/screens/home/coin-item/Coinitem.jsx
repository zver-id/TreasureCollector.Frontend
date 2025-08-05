import styles from '../Home.module.css'
import {Link} from "react-router-dom";

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
          <p>Year {coin.year}</p>
          <Link className='btn' to={`/Coin/${coin.id}`}>
              View
          </Link>
      </div>
  </div>
  )
}

export default CoinItem