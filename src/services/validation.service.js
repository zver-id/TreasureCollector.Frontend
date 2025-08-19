/**
 * Сервис валидации данных формы
 * @class
 */
export class ValidationService {
    /**
     * Валидирует данные формы монеты
     * @static
     * @param {Object} formData - Данные формы
     * @param {string} formData.name - Название монеты
     * @throws {Error} Если валидация не пройдена
     */
    static validateCoinForm(formData) {
        if (!formData.name?.trim()) {
            throw new Error('Название обязательно для заполнения');
        }
    }
}