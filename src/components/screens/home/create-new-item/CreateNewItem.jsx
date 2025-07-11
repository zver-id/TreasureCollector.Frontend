import styles from './CreateNewItem.module.css'
import {useState} from "react";
import {ItemService} from "../../../../services/coin.service.js";

const clearData = {
    name:'',
    country:'',
    currency:'',
    year:''
}

const CreateNewItem = ({setItems}) => {
    const [data, setData] = useState(clearData)

    const createItem = async (e) => {
        e.preventDefault()

        setItems(prev => [{id: prev.length+1,
            ...data},
            ...prev])

        const pushData = {
            name: data.name,
            currency: data.currency,
            year: data.year,
            country: data.country
        }

        await ItemService.pushNew(pushData)

        setData(clearData)
    }

    return <form className={styles.form}>
        <input placeholder='Name'
               onChange={e=>setData(
                   prev => ({
                       ...prev, name: e.target.value
                   }))}
               value={data.name}/>
        <input placeholder='Country'
               onChange={e=>setData(
                   prev => ({
                       ...prev, country: e.target.value
                   }))}
               value={data.Country}/>
        <input placeholder='Currency'
               onChange={e=>setData(
                   prev => ({
                       ...prev, currency: e.target.value
                   }))}
               value={data.currency}/>
        <input placeholder='Year'
               onChange={e=>setData(
                   prev => ({
                       ...prev, year: e.target.value
                   }))}
               value={data.year}/>
        <button className='btn' onClick={e => createItem(e)}>Create</button>
    </form>
}

export default CreateNewItem