import { useState, useEffect } from 'react';
import './CreateCoinForm.css';
import {ItemService} from "../../../../services/coin.service.js";

const CreateCoinForm = ({ detailCoin }) => {
    const getSafeValue = (value, defaultValue = "") => {
        return value !== undefined && value !== null ? value : defaultValue;
    };

    // Значения по умолчанию с гарантией строковых значений
    const defaultValues = {
        itemType: getSafeValue(detailCoin?.itemType, "coin"),
        name: getSafeValue(detailCoin?.name, ""),
        nominal: getSafeValue(detailCoin?.nominal, ""),
        currency: getSafeValue(detailCoin?.currency, ""),
        country: getSafeValue(detailCoin?.country, ""),
        year: getSafeValue(detailCoin?.year, "")
    };

    const [formData, setFormData] = useState(defaultValues);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (detailCoin?.id) {
            setFormData({
                itemType: getSafeValue(detailCoin.itemType),
                name: getSafeValue(detailCoin.name),
                nominal: getSafeValue(detailCoin.nominal),
                currency: getSafeValue(detailCoin.currency),
                country: getSafeValue(detailCoin.country),
                year: getSafeValue(detailCoin.year, new Date().getFullYear())
            });
        } else {
            setFormData(defaultValues);
        }
    }, [detailCoin]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'year' ? (value === "" ? "" : Number(value)) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            if (!formData.name.trim()) {
                throw new Error('Название обязательно для заполнения');
            }

            const dataToSend = {
                ...(detailCoin?.id && { id: detailCoin.id }),
                itemType: formData.itemType,
                name: formData.name,
                nominal: formData.nominal,
                currency: formData.currency,
                country: formData.country,
                year: formData.year === "" ? new Date().getFullYear() : Number(formData.year)
            };

            const response = detailCoin?.id
                ? await ItemService.updateItem(JSON.stringify(dataToSend))
                : await ItemService.pushNew(JSON.stringify(dataToSend));

            if (!response || response.status >= 400) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }

            const result = await response.data;
            setSubmitStatus({
                success: true,
                message: detailCoin?.id ? 'Монета успешно обновлена!' : 'Монета успешно создана!',
                data: result
            });

            if (!detailCoin?.id) {
                setFormData(defaultValues);
            }
        } catch (err) {
            setSubmitStatus({
                success: false,
                message: err.message
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-coin-form">
            <h2>{detailCoin?.id ? `${formData.name}` : 'Создать новую монету'}</h2>

            {submitStatus && (
                <div className={`alert ${submitStatus.success ? 'success' : 'error'}`}>
                    {submitStatus.message}
                    {submitStatus.success && (
                        <div className="response-data">
                            <pre>{JSON.stringify(submitStatus.data, null, 2)}</pre>
                        </div>
                    )}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="itemType">Тип предмета</label>
                    <input
                        type="text"
                        id="itemType"
                        name="itemType"
                        value={formData.itemType || ""}
                        onChange={handleChange}
                        placeholder="Монета"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Название*</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name || ""}
                        onChange={handleChange}
                        placeholder="Введите название"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="nominal">Номинал</label>
                    <input
                        type="text"
                        id="nominal"
                        name="nominal"
                        value={formData.nominal || ""}
                        onChange={handleChange}
                        placeholder="Введите номинал"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="currency">Валюта</label>
                    <input
                        type="text"
                        id="currency"
                        name="currency"
                        value={formData.currency || ""}
                        onChange={handleChange}
                        placeholder="RUB"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="country">Страна</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country || ""}
                        onChange={handleChange}
                        placeholder="Россия"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="year">Год выпуска</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={formData.year === undefined ? "" : formData.year}
                        onChange={handleChange}
                        placeholder={new Date().getFullYear().toString()}
                        min="0"
                        max={new Date().getFullYear()}
                    />
                </div>

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Сохранение...' : detailCoin?.id ? 'Обновить' : 'Создать'}
                </button>
            </form>
        </div>
    );
};

export default CreateCoinForm;