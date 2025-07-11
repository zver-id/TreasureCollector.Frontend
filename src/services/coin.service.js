import axios from "axios";

export const ItemService = {
    async getAll(){
        // нужна установка axios npm install axios
        const response = await axios.get(
            'http://localhost:5000/coin')
        console.log(response)

        return response.data
    },

    async getById(id){
        // нужна установка axios npm install axios
        const response = await axios.get(
            `http://localhost:5000/Coin/${id}?itemId=${id}`)

        return response.data
    }
}