import { useState, useEffect } from 'react';
import './CreateCoinForm.css';

const CreateCoinForm = ({ detailCoin }) => {
    const getSafeValue = (value, defaultValue) => {
        return value !== undefined ? value : defaultValue;
    };

    const defaultValues = {
        itemType: getSafeValue(detailCoin?.itemType, "Монета"),
        name: getSafeValue(detailCoin?.name, "Рубль"),
        nominal: getSafeValue(detailCoin?.nominal, "1"),
        currency: getSafeValue(detailCoin?.currency, "RUB"),
        country: getSafeValue(detailCoin?.country, "Россия"),
        year: getSafeValue(detailCoin?.year, new Date().getFullYear())
    };

    const [formData, setFormData] = useState(defaultValues);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (detailCoin) {
            setFormData({
                itemType: getSafeValue(detailCoin.itemType, ""),
                name: getSafeValue(detailCoin.name, ""),
                nominal: getSafeValue(detailCoin.nominal, ""),
                currency: getSafeValue(detailCoin.currency, ""),
                country: getSafeValue(detailCoin.country, ""),
                year: getSafeValue(detailCoin.year, new Date().getFullYear())
            });
        }
    }, [detailCoin]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'year' ? Number(value) || '' : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            if (!formData.name) {
                throw new Error('Название обязательно для заполнения');
            }

            const response = await fetch('http://localhost:5000/coin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemType: formData.itemType,
                    name: formData.name,
                    nominal: formData.nominal,
                    currency: formData.currency,
                    country: formData.country,
                    year: Number(formData.year) || new Date().getFullYear()
                }),
            });

            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }

            const result = await response.json();
            setSubmitStatus({
                success: true,
                message: detailCoin ? 'Монета успешно обновлена!' : 'Монета успешно создана!',
                data: result
            });

            if (!detailCoin) {
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
            <h2>{detailCoin ? 'Редактировать монету' : 'Создать новую монету'}</h2>

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
                        value={formData.itemType}
                        onChange={handleChange}
                        placeholder={defaultValues.itemType?.toString() || ""}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Название*</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={defaultValues.name?.toString() || ""}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="nominal">Номинал</label>
                    <input
                        type="text"
                        id="nominal"
                        name="nominal"
                        value={formData.nominal}
                        onChange={handleChange}
                        placeholder={defaultValues.nominal?.toString() || ""}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="currency">Валюта</label>
                    <input
                        type="text"
                        id="currency"
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        placeholder={defaultValues.currency?.toString() || ""}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="country">Страна</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder={defaultValues.country?.toString() || ""}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="year">Год выпуска</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        placeholder={defaultValues.year?.toString() || new Date().getFullYear().toString()}
                        min="0"
                        max={new Date().getFullYear()}
                    />
                </div>

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Сохранение...' : detailCoin ? 'Обновить' : 'Создать'}
                </button>
            </form>
        </div>
    );
};

export default CreateCoinForm;