import axios from "axios";

export const ItemService = {
    async getAll(){
        // нужна установка axios npm install axios
        const response = await axios.get(
            'http://localhost:5186/coin')

        return response.data
    }
}