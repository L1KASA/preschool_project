import React, { useState, useEffect } from 'react';
import api from '../api';
import GroupCard from '../components/GroupCard';
import NewsCard from '../components/NewsCard';

const Home = () => {
  const [allGroups, setAllGroups] = useState([]);
  const [groups, setGroups] = useState([]);
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const groupsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupsRes = await api.get('/groups/');
        const newsRes = await api.get('/news/');
        
        setAllGroups(groupsRes.data);
        setNews(newsRes.data.slice(0, 3));
        
        // Рассчитываем пагинацию для групп
        const total = Math.ceil(groupsRes.data.length / groupsPerPage);
        setTotalPages(total);
        
        // Показываем первую страницу
        const start = 0;
        const end = groupsPerPage;
        setGroups(groupsRes.data.slice(start, end));
        
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Переключение страницы
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const start = (page - 1) * groupsPerPage;
      const end = start + groupsPerPage;
      setGroups(allGroups.slice(start, end));
      window.scrollTo(0, 0);
    }
  };

  if (loading) {
    return (
      <div className="home">
        <div className="container">
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <section className="banner">
        <div className="container">
          <h1>Добро пожаловать в наш детский сад!</h1>
          <p>Мы создаём уют и радость для ваших детей.</p>
        </div>
      </section>
      
      <section className="groups-preview">
        <div className="container">
          <h2>Наши группы</h2>
          <div className="groups-grid">
            {groups.map(group => <GroupCard key={group.id} group={group} />)}
          </div>
          
          {/* Пагинация для групп */}
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
        </div>
      </section>
      
      <section className="news-preview">
        <div className="container">
          <h2>Последние новости</h2>
          <div className="news-grid">
            {news.length === 0 ? (
              <p>Новостей пока нет.</p>
            ) : (
              news.map(item => <NewsCard key={item.id} news={item} />)
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;