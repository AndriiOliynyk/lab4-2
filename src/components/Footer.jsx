import React, { useEffect, useState } from 'react';

const SYS_KEYS = {
  userAgent:     'User Agent',
  platform:      'Платформа',
  language:      'Мова',
  cookieEnabled: 'Cookies',
  screenWidth:   'Ширина екрану',
  screenHeight:  'Висота екрану',
  colorDepth:    'Глибина кольору',
  timezone:      'Часовий пояс',
  online:        'Онлайн',
  cores:         'CPU ядра',
  visitedAt:     'Час візиту',
};

const Footer = () => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    const sysInfo = {
      userAgent:     navigator.userAgent,
      platform:      navigator.platform,
      language:      navigator.language,
      cookieEnabled: String(navigator.cookieEnabled),
      screenWidth:   String(screen.width),
      screenHeight:  String(screen.height),
      colorDepth:    screen.colorDepth + ' bit',
      timezone:      Intl.DateTimeFormat().resolvedOptions().timeZone,
      online:        String(navigator.onLine),
      cores:         String(navigator.hardwareConcurrency || 'невідомо'),
      visitedAt:     new Date().toLocaleString('uk-UA'),
    };

    // Зберегти в localStorage
    Object.entries(sysInfo).forEach(([k, v]) => localStorage.setItem(k, v));

    // Зчитати з localStorage для відображення
    const fromStorage = {};
    Object.keys(SYS_KEYS).forEach(k => {
      fromStorage[k] = localStorage.getItem(k) || '—';
    });
    setInfo(fromStorage);
  }, []);

  return (
    <footer className="footer card" id="footer-info">
      <p className="tag" style={{ marginBottom: 12 }}>Системна інформація (localStorage)</p>
      <div className="footer-info-grid">
        {Object.entries(SYS_KEYS).map(([k, label]) => (
          <div key={k} className="footer-info-item">
            <span className="footer-info-key">{label}</span>
            <span className="footer-info-val">{info[k] || '…'}</span>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 14 }}>© {new Date().getFullYear()} Andrii Oliynyk — Лабораторна робота №4</p>
    </footer>
  );
};

export default Footer;