import axios from 'axios';

// Базовый URL для API (Django бэкенд)
const API_URL = 'http://localhost:8000/api/';

// Создаём экземпляр axios с настройками по умолчанию
const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Экспортируем настроенный экземпляр для использования в компонентах
export default instance;

// Вспомогательная функция для получения полного URL изображения
export const getImageUrl = (path) => {
  if (!path) return '/placeholder.jpg';          // если пути нет – заглушка
  if (path.startsWith('http')) return path;      // если уже полный URL – оставляем
  return `http://localhost:8000${path}`;         // добавляем адрес бэкенда
};