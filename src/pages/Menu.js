import React, { useState, useEffect } from 'react';
import api from '../api';

const Menu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    api.get('/menus/').then(res => setMenu(res.data)).catch(console.error);
  }, []);

  const mealTypes = {
    breakfast: 'Завтрак',
    lunch: 'Обед',
    snack: 'Полдник'
  };

  return (
    <div className="page">
      <div className="container">
        <h1>Меню на неделю</h1>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Приём пищи</th>
              <th>Блюдо</th>
              <th>Описание</th>
            </tr>
          </thead>
          <tbody>
            {menu.map(m => (
              <tr key={m.id}>
                <td>{m.date}</td>
                <td>{mealTypes[m.meal_type] || m.meal_type}</td>
                <td>{m.dish}</td>
                <td>{m.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Menu;