import CoinItem from "./coin-item/Coinitem.jsx";
import CreateNewItem from "./create-new-item/CreateNewItem.jsx";
import {useEffect, useState} from "react";
import {ItemService} from "../../../services/coin.service.js";

function Home() {
    const [coins , setItems] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            // нужна установка axios npm install axios
            const data = await ItemService.getAll()

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