# Установка и запуск
## 1. Клонирование репозитория
```bash
git clone <ссылка на репозиторий>
cd preschool_project
```
## 2. Настройка Backend (Django)
### 2.1. Создание и активация виртуального окружения

#### Windows
```bash
python -m venv venv
venv\Scripts\activate
```

#### Mac/Linux
```bash
python3 -m venv venv
source venv/bin/activate
```
### 2.2. Установка зависимостей
```bash
pip install -r requirements.txt
```
### 2.3. Применение миграций
```bash
python manage.py makemigrations
python manage.py migrate
```
### 2.4. Создание суперпользователя (администратора)
```bash
python manage.py createsuperuser
```
### 2.5. Запуск сервера
```bash
python manage.py runserver
```

Backend будет доступен по адресу: http://localhost:8000
Админ-панель: http://localhost:8000/admin

## 3. Настройка Frontend (React)
### 3.1. Переход в папку frontend
```bash
cd frontend
```
### 3.2. Установка зависимостей
```bash
npm install
```
### 3.3. Запуск приложения
```bash
npm start```


Frontend будет доступен по адресу: http://localhost:3000
