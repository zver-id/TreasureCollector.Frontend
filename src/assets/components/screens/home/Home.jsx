import CoinItem from "./coin-item/Coinitem.jsx";
import CreateNewItem from "./create-new-item/CreateNewItem.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

function Home() {
    const [coins , setItems] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            // нужна установка axios npm install axios
            const response = await axios.get(
                'http://localhost:5186/coin')

            setItems(response.data)
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