import React, { useState, useEffect } from 'react';

const Reviews = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/20/comments')
      .then(res => {
        if (!res.ok) throw new Error('Помилка завантаження');
        return res.json();
      })
      .then(data => {
        setComments(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section className="card">
      <h2>Reviews</h2>

      {loading && <p className="muted">Завантаження відгуків…</p>}
      {error   && <p className="muted" style={{ color: 'var(--accent)' }}>Помилка: {error}</p>}

      <div className="reviews-grid">
        {comments.map(comment => (
          <div key={comment.id} className="review-card">
            <div className="review-name">{comment.name}</div>
            <div className="review-email">{comment.email}</div>
            <div className="review-body">{comment.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;