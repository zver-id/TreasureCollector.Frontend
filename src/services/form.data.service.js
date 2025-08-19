/**
 * Сервис для работы с FormData
 * @class
 */
export class FormDataService {
    /**
     * Создает объект FormData из значений формы и превью изображений
     * @static
     * @param {Object} formValues - Значения формы
     * @param {Object} imagePreviews - Превью изображений
     * @param {string|null} imagePreviews.aversImage - Превью аверса
     * @param {string|null} imagePreviews.reversImage - Превью реверса
     * @param {string|null} imagePreviews.edgeImage - Превью гурта
     * @returns {FormData} Объект FormData готовый к отправке на сервер
     */
    static createFormData(formValues, imagePreviews) {
        const formData = new FormData();

        Object.entries(formValues).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        if (imagePreviews.aversImage?.startsWith('blob:')) {
            formData.append('AversImage', imagePreviews.aversImage);
        }
        if (imagePreviews.reversImage?.startsWith('blob:')) {
            formData.append('ReversImage', imagePreviews.reversImage);
        }
        if (imagePreviews.edgeImage?.startsWith('blob:')) {
            formData.append('EdgeImage', imagePreviews.edgeImage);
        }

        return formData;
    }
}