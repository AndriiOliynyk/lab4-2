import React, { useState, useEffect } from 'react';

const ContactForm = () => {
  const [isOpen,    setIsOpen]    = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending,   setSending]   = useState(false);

  // Показати через 1 хвилину
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 60000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const formData = new FormData(e.target);

    try {
      const res = await fetch('https://formspree.io/f/mreojzdj', {
        method:  'POST',
        body:    formData,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setSubmitted(true);
        e.target.reset();
      }
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setIsOpen(false); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">

        <div className="modal-header">
          <div>
            <h3 id="modalTitle" style={{ margin: 0 }}>Зворотній зв'язок</h3>
            <p className="muted" style={{ margin: '4px 0 0', fontSize: 13 }}>Ми цінуємо вашу думку</p>
          </div>
          <button className="modal-close" onClick={() => setIsOpen(false)} aria-label="Закрити">✕</button>
        </div>

        {submitted ? (
          <p style={{ textAlign: 'center', color: 'var(--accent2)', padding: '1.5rem 0', fontWeight: 600 }}>
            ✓ Повідомлення відправлено!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cf-name">Ім'я</label>
                <input id="cf-name" type="text" name="name" placeholder="Іван Петренко" required />
              </div>
              <div className="form-group">
                <label htmlFor="cf-phone">Телефон</label>
                <input id="cf-phone" type="tel" name="phone" placeholder="+380 XX XXX XX XX" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="cf-email">Email</label>
              <input id="cf-email" type="email" name="email" placeholder="ivan@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="cf-message">Повідомлення</label>
              <textarea id="cf-message" name="message" rows={4} placeholder="Ваш відгук…" required />
            </div>
            <button type="submit" className="submit-btn" disabled={sending}>
              {sending ? 'Відправляємо…' : 'Відправити →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;