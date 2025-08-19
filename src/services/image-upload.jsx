/**
 * Компонент для загрузки и отображения превью изображений
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {string|null} props.preview - URL превью изображения
 * @param {Function} props.onChange - Обработчик изменения изображения
 * @param {Function} props.onRemove - Обработчик удаления изображения
 * @param {string} props.label - Подпись для поля загрузки
 * @returns {JSX.Element}
 */
export const ImageUpload = ({ preview, onChange, onRemove, label }) => (
    <div className="image-upload-item">
        {preview ? (
            <div className="image-preview-wrapper">
                <img src={preview} alt={label} className="image-preview" />
                <button
                    type="button"
                    className="remove-image-btn"
                    onClick={onRemove}
                    aria-label={`Удалить ${label}`}
                >
                    ×
                </button>
            </div>
        ) : (
            <label className="image-upload-label">
                <input
                    type="file"
                    accept="image/*"
                    onChange={onChange}
                    style={{ display: 'none' }}
                />
                <span>+ {label}</span>
            </label>
        )}
    </div>
);