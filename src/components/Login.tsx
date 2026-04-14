import React, { useState } from 'react';
import { Activity, ArrowRight, ShieldAlert } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <div className="login-container" style={styles.container}>
      <div className="animate-slide-up" style={styles.content}>
        <div style={styles.logoContainer}>
          <div style={styles.iconWrapper}>
            <Activity size={48} color="var(--primary)" strokeWidth={2} />
          </div>
          <h1 style={styles.title}>ERAS</h1>
          <p style={styles.subtitle}>Emergency Response Alert System</p>
        </div>

        <div className="glass animate-fade-in delay-1" style={styles.formContainer}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>National ID / Email</label>
              <input type="text" placeholder="Enter your credentials" required />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '10px' }}>
              {loading ? (
                <div style={styles.spinner} />
              ) : (
                <>Sign In <ArrowRight size={20} /></>
              )}
            </button>
          </form>
          
          <div style={styles.footerInfo}>
            <ShieldAlert size={16} color="var(--text-muted)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Secure health connection established
            </span>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div style={styles.bgGlow1} />
      <div style={styles.bgGlow2} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '24px',
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    width: '100%',
    maxWidth: '360px',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  iconWrapper: {
    width: '80px',
    height: '80px',
    borderRadius: 'var(--radius-lg)',
    background: 'var(--bg-glass)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--border)',
    boxShadow: '0 8px 32px rgba(248, 81, 73, 0.15)',
    animation: 'float 6s ease-in-out infinite',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    letterSpacing: '2px',
    background: 'linear-gradient(135deg, #fff, #8b949e)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginTop: '12px',
  },
  subtitle: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    fontWeight: 300,
    letterSpacing: '0.5px',
  },
  formContainer: {
    padding: '28px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: 'var(--text-main)',
  },
  footerInfo: {
    marginTop: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255,255,255,0.3)',
    borderRadius: '50%',
    borderTopColor: '#fff',
    animation: 'spin 1s ease-in-out infinite',
  },
  bgGlow1: {
    position: 'absolute',
    top: '-10%',
    left: '-20%',
    width: '60%',
    height: '40%',
    background: 'var(--primary-glow)',
    filter: 'blur(100px)',
    opacity: 0.15,
    borderRadius: '50%',
    zIndex: 1,
  },
  bgGlow2: {
    position: 'absolute',
    bottom: '-10%',
    right: '-20%',
    width: '60%',
    height: '40%',
    background: 'var(--secondary-glow)',
    filter: 'blur(100px)',
    opacity: 0.1,
    borderRadius: '50%',
    zIndex: 1,
  }
};

// Add spinner keyframes just for login
const styleSheet = document.createElement('style');
styleSheet.innerText = `
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(styleSheet);
