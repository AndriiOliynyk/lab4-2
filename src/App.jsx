import React, { useState, useEffect } from 'react';
import Header       from './components/Header';
import Summary      from './components/Summary';
import TechSkills   from './components/TechSkills';
import Projects     from './components/Projects';
import Education    from './components/Education';
import AdditionalInfo from './components/AdditionalInfo';
import Reviews      from './components/Reviews';
import ContactForm  from './components/Contactform';
import Footer       from './components/Footer';

function getAutoTheme() {
  const h = new Date().getHours();
  return h >= 7 && h < 21 ? 'light' : 'dark';
}

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || getAutoTheme();
  });

  // Застосувати тему до <body>
  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <div className={`page ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <div className="layout">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Summary />
        <TechSkills />
        <Projects />
        <Education />
        <AdditionalInfo />
        <Reviews />
        <Footer />
      </div>

      {/* Модальне вікно зворотнього зв'язку — з'явиться через 1 хвилину */}
      <ContactForm />
    </div>
  );
}

export default App;