import React, { useState } from 'react';
import api from '../api';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/feedback/', formData);
      setStatus('✅ Сообщение отправлено!');
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('❌ Ошибка отправки. Попробуйте позже.');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Ваше имя" value={formData.name} onChange={handleChange} required />
      <input type="tel" name="phone" placeholder="Телефон" value={formData.phone} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="text" name="subject" placeholder="Тема" value={formData.subject} onChange={handleChange} required />
      <textarea name="message" placeholder="Сообщение" rows="5" value={formData.message} onChange={handleChange} required />
      <button type="submit">Отправить</button>
      {status && <p className="status">{status}</p>}
    </form>
  );
};

export default FeedbackForm;