import React, { useState, useEffect } from 'react';
import api from '../api';
import { getImageUrl } from '../api';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const perPage = 6;

  useEffect(() => {
    setLoading(true);
    api.get('/groups/')
      .then(res => {
        const allGroups = res.data;
        const total = Math.ceil(allGroups.length / perPage);
        setTotalPages(total);
        
        const start = (currentPage - 1) * perPage;
        const end = start + perPage;
        setGroups(allGroups.slice(start, end));
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
    <div className="page groups-page">
      <div className="container">
        <h1>Наши группы</h1>
        <div className="groups-grid">
          {groups.map(group => {
            const occupancy = Math.round((group.current_children / group.capacity) * 100);
            let fillClass = '';
            if (occupancy > 85) fillClass = 'danger';
            else if (occupancy > 60) fillClass = 'warning';

            return (
              <div key={group.id} className="group-card">
                {group.photo && (
                  <img 
                    src={getImageUrl(group.photo)} 
                    alt={group.name}
                    className="group-photo"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <div className="group-info">
                  <h3>{group.name}</h3>
                  <p>Возраст: {group.age_from}–{group.age_to} лет</p>
                  <p>Вместимость: {group.capacity} чел.</p>
                  <p>
                    <strong>Сейчас в группе:</strong> {group.current_children} чел.
                    <span className="occupancy">({occupancy}%)</span>
                  </p>
                  <div className="progress-bar">
                    <div 
                      className={`progress-fill ${fillClass}`}
                      style={{ width: `${Math.min(occupancy, 100)}%` }}
                    ></div>
                  </div>
                  <p>{group.description}</p>
                </div>
              </div>
            );
          })}
        </div>
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
    </div>
  );
};

export default Groups;