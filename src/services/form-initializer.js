/**
 * Сервис инициализации значений формы
 * @class
 */
export class FormInitializer {
    /**
     * Возвращает значения формы по умолчанию
     * @static
     * @param {Object|null} detailCoin - Данные существующей монеты
     * @returns {Object} Значения по умолчанию для формы
     */
    static getDefaultValues(detailCoin) {
        /**
         * Безопасно получает значение или возвращает значение по умолчанию
         * @param {*} value - Проверяемое значение
         * @param {*} defaultValue - Значение по умолчанию
         * @returns {*}
         */
        const getSafeValue = (value, defaultValue = "") => {
            return value !== undefined && value !== null ? value : defaultValue;
        };

        return {
            itemType: getSafeValue(detailCoin?.itemType, "coin"),
            name: getSafeValue(detailCoin?.name, ""),
            nominal: getSafeValue(detailCoin?.nominal, ""),
            currency: getSafeValue(detailCoin?.currency, ""),
            country: getSafeValue(detailCoin?.country, ""),
            year: getSafeValue(detailCoin?.year, ""),
            aversImagePath: getSafeValue(detailCoin?.aversImagePath, null),
            reversImagePath: getSafeValue(detailCoin?.reversImagePath, null),
            edgeImagePath: getSafeValue(detailCoin?.edgeImagePath, null)
        };
    }
}