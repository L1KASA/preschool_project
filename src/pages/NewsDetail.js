import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api, { getImageUrl } from '../api';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/news/${id}/`)
      .then(res => {
        setNews(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="page">
        <div className="container">
          <h1>Новость не найдена</h1>
          <Link to="/news">← Вернуться к списку новостей</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <Link to="/news" className="back-link">← Назад к новостям</Link>
        <h1>{news.title}</h1>
        <p className="news-date">{new Date(news.date).toLocaleDateString('ru-RU')}</p>
        {news.image && (
          <img 
            src={getImageUrl(news.image)} 
            alt={news.title} 
            className="news-detail-image"
            onError={(e) => {
              e.target.src = '/placeholder.jpg';
            }}
          />
        )}
        <div className="news-content">
          <p>{news.content}</p>
        </div>
        <p className="news-author">Автор: {news.author}</p>
      </div>
    </div>
  );
};

export default NewsDetail;