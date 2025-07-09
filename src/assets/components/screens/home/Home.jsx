import {coins as coinsData} from "./coins.data.js";
import CoinItem from "./coin-item/Coinitem.jsx";
import CreateNewItem from "./create-new-item/CreateNewItem.jsx";
import {useEffect, useState} from "react";

function Home() {
    const [coins , setItems] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                'http://localhost:5186/coin')
            const data =await response.json()

            setItems(data)
        }
        fetchData()
    }, []);

    return (
        <div>
            <h1>Treasure Collector</h1>
            <CreateNewItem setItems={setItems}/>
            <div>
                {coins.length ? (
                    coins.map(coin => (
                        <CoinItem key={coin.Id} coin ={coin}/>
                )))
                : <p>There are no items</p>}
            </div>

        </div>

    )
}

export default Home