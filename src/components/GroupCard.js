import React from 'react';

const GroupCard = ({ group }) => {
  const occupancy = Math.round((group.current_children / group.capacity) * 100);
  
  // Определяем цвет прогресс-бара
  let fillClass = '';
  if (occupancy > 85) fillClass = 'danger';
  else if (occupancy > 60) fillClass = 'warning';

  return (
    <div className="group-card">
      <div className="group-info">
        <h3>{group.name}</h3>
        <p>Возраст: {group.age_from}–{group.age_to} лет</p>
        <p>Вместимость: {group.capacity} чел.</p>
        <p>
          <strong>Сейчас в группе:</strong> {group.current_children} чел.
          <span className="occupancy">
            ({occupancy}% заполнена)
          </span>
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
};

export default GroupCard;