import CoinItem from "./coin-item/CoinItem.jsx";
import { useEffect, useState } from "react";
import { ItemService } from "../../../services/coin.service.js";
import styles from './Home.module.css';
import {Link} from "react-router-dom";
import config from "../../../../config.js";

function Home() {
    const [coins, setItems] = useState([]);
    const reportUrl = `${config.apiUrl}/InventoryReport`;

    useEffect(() => {
        const fetchData = async () => {
            const data = await ItemService.getAll();
            setItems(data);
        };
        fetchData();
    }, []);

    return (
        <div className={styles.app}>
            <header className={styles.appHeader}>
                <h1 className={styles.logo}>Treasure Collector</h1>
            </header>

            <div className={styles.mainContent}>
                <div className={styles.buttonsContainer}>
                    <Link className={styles.button} to={`/Coin/stats`}>
                        View statistics
                    </Link>
                    <Link className={styles.button} to={`/Coin/new`}>
                        Create new
                    </Link>
                    <a
                        className={styles.button}
                        href={reportUrl}
                        download="CoinsInventoryReport.pdf"
                        >
                        Get Report
                    </a>

                </div>
                <div className={styles.itemsContainer}>
                    {coins.length ? (
                        coins.map(coin => (
                            <CoinItem key={coin.Id} coin={coin} />
                        ))
                    ) : <p>There are no items</p>}
                </div>
            </div>
        </div>
    );
}

export default Home;