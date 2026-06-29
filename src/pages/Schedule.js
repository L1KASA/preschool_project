import React, { useState, useEffect } from 'react';
import api from '../api';

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');

  // Словарь для перевода дней недели
  const dayTranslations = {
    'monday': 'Понедельник',
    'tuesday': 'Вторник',
    'wednesday': 'Среда',
    'thursday': 'Четверг',
    'friday': 'Пятница',
    'saturday': 'Суббота',
    'sunday': 'Воскресенье'
  };

  useEffect(() => {
    api.get('/groups/').then(res => setGroups(res.data)).catch(console.error);
    api.get('/schedules/').then(res => setSchedules(res.data)).catch(console.error);
  }, []);

  const filtered = selectedGroup 
    ? schedules.filter(s => s.group === parseInt(selectedGroup))
    : schedules;

  return (
    <div className="page">
      <div className="container">
        <h1>Расписание занятий</h1>
        <select onChange={(e) => setSelectedGroup(e.target.value)} value={selectedGroup}>
          <option value="">Все группы</option>
          {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Группа</th>
              <th>День недели</th>
              <th>Занятие</th>
              <th>Время</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td>{groups.find(g => g.id === s.group)?.name || s.group}</td>
                <td>{dayTranslations[s.day_of_week] || s.day_of_week}</td>
                <td>{s.activity}</td>
                <td>{s.time_start} – {s.time_end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;