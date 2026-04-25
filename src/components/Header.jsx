import React from 'react';

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="card header">
      <div className="header-top">
        <div>
          <p className="tag">Security Engineer / Security Analyst</p>
          <h1>Andrii Oliynyk</h1>
        </div>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Перемкнути тему"
          title={theme === 'dark' ? 'Денний режим' : 'Нічний режим'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      <nav aria-label="Contact links">
        <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0 0', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <li>
            <a href="mailto:andrijolijnik462@gmail.com">andrijolijnik462@gmail.com</a>
          </li>
          <li>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;