import React, { useState } from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { useApp } from '../i18n';

interface RatingProps {
  onComplete: () => void;
}

export function Rating({ onComplete }: RatingProps) {
  const { userName } = useApp();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating > 0) {
      setSubmitted(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  if (submitted) {
    return (
      <div className="animate-fade-in" style={styles.container}>
        <div style={styles.successCard}>
          <CheckCircle size={64} color="var(--success)" />
          <h2 style={{ marginTop: 24, marginBottom: 8 }}>Thank You!</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Your feedback helps keep the ERAS community safe and reliable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={styles.container}>
      <div className="glass" style={styles.card}>
        <h2 style={styles.title}>Rate your Responder</h2>
        <p style={styles.subtitle}>
          Glad you're safe, {userName}. How was your experience with Dr. Amina A.?
        </p>
        
        <div style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              style={styles.starBtn}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                size={40}
                color={(hover || rating) >= star ? '#ffb400' : 'var(--border)'}
                fill={(hover || rating) >= star ? '#ffb400' : 'none'}
                style={{ transition: 'var(--transition)' }}
              />
            </button>
          ))}
        </div>

        <div style={{ width: '100%' }}>
          <textarea 
            placeholder="Add a comment (optional)..." 
            style={styles.textarea}
            rows={3}
          />
        </div>

        <button 
          className="btn btn-primary" 
          disabled={rating === 0}
          onClick={handleSubmit}
          style={{ width: '100%', marginTop: 'auto' }}
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '24px',
    background: 'rgba(10, 12, 16, 0.8)',
    backdropFilter: 'blur(10px)',
  },
  card: {
    padding: '32px 24px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '24px',
    zIndex: 10,
  },
  successCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '32px',
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: 700,
    margin: 0,
  },
  subtitle: {
    color: 'var(--text-muted)',
    fontSize: '0.95rem',
  },
  starContainer: {
    display: 'flex',
    gap: '12px',
    margin: '16px 0',
  },
  starBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'transform 0.2s',
  },
  textarea: {
    width: '100%',
    background: 'var(--bg-main)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-main)',
    padding: '16px',
    fontFamily: 'inherit',
    resize: 'none',
    outline: 'none',
  }
};
