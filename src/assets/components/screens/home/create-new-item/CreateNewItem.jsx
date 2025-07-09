import styles from './CreateNewItem.module.css'
import {useState} from "react";

const clearData = {
    Name:'',
    Country:'',
    Mint:''
}

const CreateNewItem = ({setItems}) => {
    const [data, setData] = useState(clearData)

    const createItem = (e) => {
        e.preventDefault()

        setItems(prev => [{Id: prev.length+1,
            ...data},
            ...prev])

        setData(clearData)
    }

    return <form className={styles.form}>
        <input placeholder='Name'
               onChange={e=>setData(
                   prev => ({
                       ...prev, Name: e.target.value
                   }))}
               value={data.Name}/>
        <input placeholder='Country'
               onChange={e=>setData(
                   prev => ({
                       ...prev, Country: e.target.value
                   }))}
               value={data.Country}/>
        <input placeholder='Mint'
               onChange={e=>setData(
                   prev => ({
                       ...prev, Mint: e.target.value
                   }))}
               value={data.Mint}/>
        <button className='btn' onClick={e => createItem(e)}>Create</button>
    </form>
}

export default CreateNewItem