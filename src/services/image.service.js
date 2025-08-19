import axios from "axios";
import config from "../../config.js";

export const ImageService = {
    async load(imagePath, imageType){
        if (!imagePath) return null;

        try {
            const response = await axios.get(imagePath, {
                responseType: 'blob'
            });
            return URL.createObjectURL(response.data);
        } catch (error) {
            console.error(`Ошибка загрузки изображения ${imageType}:`, error);
            return null;
        }
    },

    /**
     * Создает превью изображения из файла
     * @static
     * @param {File} file - Файл изображения
     * @returns {Promise<string>} URL объекта (blob URL)
     */
    getPreviewFromFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const blob = new Blob([reader.result], { type: file.type });
            resolve(URL.createObjectURL(blob));
        };
        reader.readAsArrayBuffer(file);
        });
    },

    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
}