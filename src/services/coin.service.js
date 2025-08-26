import axios from "axios";
import config from "../../config.js";

export const ItemService = {
    async getAll(){

        // нужна установка axios npm install axios
        const response = await axios.get(
            `${config.apiUrl}/coin`)
        return response.data
    },

    async getById(id){
        const response = await axios.get(
            `${config.apiUrl}/Coin/${id}`)

        return response.data
    },

    async pushNew(data){
        console.log(data)
        const response = await axios.post(
            `${config.apiUrl}/Coin/`, data, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error)
            });

        return response
    },

    async updateItem(data) {
        const response = await axios.put(`${config.apiUrl}/Coin/`, data,
            {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Response:', response.data);
        return response
    },

    async getStats(field = 'country') {
        const response = await axios.get(`${config.apiUrl}/CoinStatistics?field=${field}`);
        console.log('Response:', response.data);
        return response;
    },


}