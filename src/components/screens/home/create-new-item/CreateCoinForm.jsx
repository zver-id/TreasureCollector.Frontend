import { useState, useEffect } from 'react';
import { FormDataService } from '../../../../services/form.data.service.js';
import { ValidationService } from '../../../../services/validation.service.js';
import { FormInitializer } from '../../../../services/form-initializer.js';
import { ImageUpload } from '../../../../services/image-upload.jsx';
import { ItemService } from '../../../../services/coin.service.js';
import { ImageService } from '../../../../services/image.service.js';
import './CreateCoinForm.css';


const CreateCoinForm = ({ detailCoin }) => {
    const [formData, setFormData] = useState(FormInitializer.getDefaultValues(detailCoin));
    const [submitStatus, setSubmitStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreviews, setImagePreviews] = useState({
        aversImage: null,
        reversImage: null,
        edgeImage: null
    });
    const [imageFiles, setImageFiles] = useState({
        aversImage: null,
        reversImage: null,
        edgeImage: null
    });

    useEffect(() => {
        const loadImages = async () => {
            if (detailCoin?.id) {
                setFormData(FormInitializer.getDefaultValues(detailCoin));

                const [aversPreview, reversPreview, edgePreview] = await Promise.all([
                    ImageService.load(detailCoin.aversImagePath, 'aversImage'),
                    ImageService.load(detailCoin.reversImagePath, 'reversImage'),
                    ImageService.load(detailCoin.edgeImagePath, 'edgeImage')
                ]);

                setImagePreviews({
                    aversImage: aversPreview,
                    reversImage: reversPreview,
                    edgeImage: edgePreview
                });
            }
        };

        loadImages();
    }, [detailCoin]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'year' ? (value === "" ? "" : Number(value)) : value
        }));
    };

    const handleImageChange = async (e, imageType) => {
        const file = e.target.files[0];
        if (!file) return;

        const preview = await ImageService.getPreviewFromFile(file);
        setImagePreviews(prev => ({ ...prev, [imageType]: preview }));
        setImageFiles(prev => ({ ...prev, [imageType]: file }));
    };

    const removeImage = (imageType) => {
        setImagePreviews(prev => ({ ...prev, [imageType]: null }));
        setImageFiles(prev => ({ ...prev, [imageType]: null }));
    };

    const convertImagesToBase64 = async () => {
        const images = {};

        for (const [key, file] of Object.entries(imageFiles)) {
            if (file) {
                images[key] = await ImageService.fileToBase64(file);
            } else if (imagePreviews[key] && detailCoin?.id) {
                // Если изображение не изменилось, оставляем существующий путь
                images[key] = detailCoin[`${key}Path`];
            }
        }

        return images;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            ValidationService.validateCoinForm(formData);

            const images = await convertImagesToBase64();

            const requestData = {
                ...formData,
                ...images,
                id: detailCoin?.id || undefined
            };

            // ДЕБАГ: посмотрите что отправляется
            console.log('Отправляемые данные:', JSON.stringify(requestData, null, 2));
            console.log('Типы данных:', {
                itemType: typeof requestData.itemType,
                name: typeof requestData.name,
                nominal: typeof requestData.nominal,
                currency: typeof requestData.currency,
                country: typeof requestData.country
            });

            const response = detailCoin?.id
                ? await ItemService.updateItem(requestData)
                : await ItemService.pushNew(requestData);

            if (!response || response.status >= 400) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }

            setSubmitStatus({
                success: true,
                message: detailCoin?.id ? 'Монета успешно обновлена!' : 'Монета успешно создана!',
                data: await response.data
            });

            if (!detailCoin?.id) {
                setFormData(FormInitializer.getDefaultValues());
                setImagePreviews({ aversImage: null, reversImage: null, edgeImage: null });
                setImageFiles({ aversImage: null, reversImage: null, edgeImage: null });
            }
        } catch (err) {
            setSubmitStatus({ success: false, message: err.message });
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

                <div className="form-group">
                    <label>Изображения монеты</label>
                    <div className="image-upload-container">
                        <ImageUpload
                            preview={imagePreviews.aversImage}
                            onChange={(e) => handleImageChange(e, 'aversImage')}
                            onRemove={() => removeImage('aversImage')}
                            label="Аверс"
                        />
                        <ImageUpload
                            preview={imagePreviews.reversImage}
                            onChange={(e) => handleImageChange(e, 'reversImage')}
                            onRemove={() => removeImage('reversImage')}
                            label="Реверс"
                        />
                        <ImageUpload
                            preview={imagePreviews.edgeImage}
                            onChange={(e) => handleImageChange(e, 'edgeImage')}
                            onRemove={() => removeImage('edgeImage')}
                            label="Гурт"
                        />
                    </div>
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