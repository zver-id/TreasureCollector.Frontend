import styles from '../Home.module.css'
import {Link} from "react-router-dom";
import CreateNewItem from "../create-new-item/CreateNewItem.jsx";
import CreateNewItemAnywhere from "../create-new-item/CreateCoinForm.jsx";
import CreateCoinForm from "../create-new-item/CreateCoinForm.jsx";

function DetailCoinItem({ coin }){
  return (
    <div key={coin.id} className={styles.item}>
      <div className={styles.image}
           style={{
               backgroundImage: `url(${coin.Image})`,
           }}
      ></div>
        <div className={styles.coinFormContainer}>
            <CreateCoinForm detailCoin={coin}/>
        </div>
  </div>
  )
}

export default DetailCoinItem