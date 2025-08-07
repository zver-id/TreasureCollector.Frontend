import {useEffect, useState} from "react";
import {ItemService} from "../../../services/coin.service.js";
import {Link, useParams} from "react-router-dom";
import CoinItem from "../home/coin-item/CoinItem.jsx";
import DetailCoinItem from "../home/coin-item/DetailCoinitem.jsx";

const ItemDetail = () => {

    const {id} = useParams( )
    const [item, setItem] = useState({})

    useEffect(() => {
        if (!id) return
        const fetchData = async () => {
            const data = await ItemService.getById(id)

            setItem(data)
        }
        fetchData()
    }, [id]);

  return <div>
      <Link className={'btn'} to ='/'>Back</Link>
      <DetailCoinItem coin={item} />
  </div>
}

export default ItemDetail
