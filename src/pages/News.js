import React, { useState, useEffect } from 'react';
import api from '../api';
import NewsCard from '../components/NewsCard';

const News = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const newsPerPage = 6;

  useEffect(() => {
    setLoading(true);
    api.get('/news/')
      .then(res => {
        const allNews = res.data;
        const total = Math.ceil(allNews.length / newsPerPage);
        setTotalPages(total);
        
        const start = (currentPage - 1) * newsPerPage;
        const end = start + newsPerPage;
        setNews(allNews.slice(start, end));
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Новости</h1>
        {news.length === 0 ? (
          <p>Новостей пока нет.</p>
        ) : (
          <>
            <div className="news-grid">
              {news.map(item => <NewsCard key={item.id} news={item} />)}
            </div>
            
            {/* Пагинация */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  onClick={() => goToPage(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  ← Назад
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button 
                  onClick={() => goToPage(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  Вперёд →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default News;