import axios from "axios";

export const ItemService = {
    async getAll(){
        // нужна установка axios npm install axios
        const response = await axios.get(
            'http://localhost:5186/coin')
        console.log(response)

        return response.data
    },

    async getById(id){
        const response = await axios.get(
            `http://localhost:5186/Coin/${id}?itemId=${id}`)

        return response.data
    },

    async pushNew(data){
        const response = await axios.post(
            `http://localhost:5186/Coin/`, data)
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error)
            });

        return response.data
    }
}