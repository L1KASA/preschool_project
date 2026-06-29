import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">
          <Link to="/">МБДОУ ДСКВ № 3</Link>
        </div>
        <nav className={menuOpen ? 'nav open' : 'nav'}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Главная</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>О нас</Link>
          <Link to="/groups" onClick={() => setMenuOpen(false)}>Группы</Link>
          <Link to="/schedule" onClick={() => setMenuOpen(false)}>Расписание</Link>
          <Link to="/menu" onClick={() => setMenuOpen(false)}>Меню</Link>
          <Link to="/news" onClick={() => setMenuOpen(false)}>Новости</Link>
          <Link to="/contacts" onClick={() => setMenuOpen(false)}>Контакты</Link>
        </nav>
        <div className="burger" onClick={toggleMenu}>
          <span></span><span></span><span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;