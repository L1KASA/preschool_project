import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../api';

const NewsCard = ({ news }) => {
  return (
    <Link to={`/news/${news.id}`} className="news-card-link">
      <div className="news-card">
        <img 
          src={getImageUrl(news.image)} 
          alt={news.title}
          onError={(e) => {
            e.target.src = '/placeholder.jpg';
          }}
        />
        <h4>{news.title}</h4>
        <p className="news-date">{new Date(news.date).toLocaleDateString('ru-RU')}</p>
        <p>{news.content.substring(0, 100)}...</p>
        <span className="read-more">Читать далее →</span>
      </div>
    </Link>
  );
};

export default NewsCard;