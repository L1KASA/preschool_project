import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          <strong>МБДОУ ДСКВ № 3</strong> – посёлок Комсомолец, Ейский район
        </p>
        <p>
          © 2026 Все права защищены. 
          <a href="tel:+78613267397" style={{ color: 'white', textDecoration: 'none' }}>
            +7 (861) 326-73-97
          </a>
        </p>
        <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>
          улица Гагарина, дом 12 | Пн–Пт: 7:00 – 19:00
        </p>
      </div>
    </footer>
  );
};

export default Footer;