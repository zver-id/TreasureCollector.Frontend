import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {ItemService} from "../../../../services/coin.service.js";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import styles from './StatisticsChart.module.css';
import {Link} from "react-router-dom";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const StatisticsChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedField, setSelectedField] = useState('country');

    const fieldOptions = [
        { value: 'country', label: 'Страна' },
        { value: 'year', label: 'Год' }
    ];

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Статистика элементов',
                font: {
                    size: 16
                }
            },
            tooltip: {
                callbacks: {
                    label: context => `${context.dataset.label}: ${context.raw}`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    const fetchStatistics = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await ItemService.getStats(selectedField);

            const data = await response.data;

            if (typeof data !== 'object' || data === null) {
                throw new Error('Некорректный формат данных статистики');
            }

            const labels = Object.keys(data);
            const values = Object.values(data).map(Number);

            if (values.some(isNaN)) {
                throw new Error('Данные статистики содержат нечисловые значения');
            }

            setChartData({
                labels,
                datasets: [{
                    label: 'Количество',
                    data: values,
                    backgroundColor: labels.map((_, i) =>
                        `hsl(${i * 360 / labels.length}, 70%, 50%)`),
                    borderColor: labels.map((_, i) =>
                        `hsl(${i * 360 / labels.length}, 70%, 30%)`),
                    borderWidth: 1,
                    borderRadius: 4
                }]
            });

        } catch (err) {
            setError(err.message);
            setChartData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatistics();
    }, [refreshKey, selectedField]);

    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    const handleFieldChange = (event) => {
        setSelectedField(event.target.value);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Визуализация статистики</h2>

            {/* Поле выбора типа статистики */}
            <div className={styles.selectContainer}>
                <label htmlFor="field-select" className={styles.selectLabel}>
                    Выберите тип статистики:
                </label>
                <select
                    id="field-select"
                    value={selectedField}
                    onChange={handleFieldChange}
                    className={styles.select}
                    disabled={loading}
                >
                    {fieldOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {loading && <div className={styles.loading}>Загрузка данных...</div>}

            {error && <div className={styles.error}>{error}</div>}

            {chartData && (
                <div className={styles.chart}>
                    <Bar
                        data={chartData}
                        options={chartOptions}
                        height={400}
                    />
                </div>
            )}

            <button
                className={styles.button}
                onClick={handleRefresh}
                disabled={loading}
            >
                Обновить данные
            </button>
            <Link className={'btn'} to ='/'>Back</Link>

            <div className={styles.footer}>
                Данные загружены: {new Date().toLocaleString()}
            </div>
        </div>
    );
};

export default StatisticsChart;