import React, { useEffect, useState } from 'react';
import { ShieldAlert, X } from 'lucide-react';
import { useApp } from '../i18n';

interface EmergencySearchProps {
  onCancel: () => void;
  onMatchFound: () => void;
}

export function EmergencySearch({ onCancel, onMatchFound }: EmergencySearchProps) {
  const { t } = useApp();
  const [radius, setRadius] = useState(500);

  useEffect(() => {
    // Simulate expanding search radius
    const timer1 = setTimeout(() => setRadius(1000), 2000);
    const timer2 = setTimeout(() => setRadius(2000), 4000);
    
    // Simulate finding a match
    const matchTimer = setTimeout(() => {
      onMatchFound();
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(matchTimer);
    };
  }, [onMatchFound]);

  return (
    <div className="animate-fade-in" style={styles.container}>
      <div style={styles.mapBackground}>
        <div style={styles.gridOverlay} />
      </div>

      <header style={styles.header}>
        <div style={styles.headerTitle}>
          <ShieldAlert color="var(--primary)" size={24} />
          <h2>Emergency Active</h2>
        </div>
      </header>

      <div style={styles.radarContainer}>
        {/* Radar animations */}
        <div style={{ ...styles.radarRing, animationDelay: '0s' }} />
        <div style={{ ...styles.radarRing, animationDelay: '1.5s' }} />
        <div style={{ ...styles.radarRing, animationDelay: '3s' }} />
        
        {/* Center dot */}
        <div style={styles.userDot}>
          <div style={styles.userDotInner} />
        </div>
      </div>

      <div className="glass animate-slide-up delay-1" style={styles.instructionCard}>
        <h4 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1rem', marginBottom: '8px' }}>Immediate Actions:</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
          <li>Ensure you are in a safe location</li>
          <li>Make yourself visible to responders</li>
          <li>Do not move the victim unless in immediate danger</li>
        </ul>
      </div>

      <div className="glass animate-slide-up" style={styles.infoCard}>
        <h3 style={styles.infoTitle}>{t('searching')}</h3>
        <p style={styles.infoText}>
          Proximity search expanding to <strong style={{ color: 'var(--primary)' }}>{radius}m</strong>
        </p>
        
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: radius === 500 ? '33%' : radius === 1000 ? '66%' : '100%' }} />
          </div>
        </div>

        <button className="btn btn-outline" style={styles.cancelBtn} onClick={onCancel}>
          <X size={20} /> {t('cancelAlert')}
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  mapBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#0d1117',
    zIndex: 0,
  },
  gridOverlay: {
    width: '100%',
    height: '100%',
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
  },
  header: {
    padding: '24px',
    position: 'relative',
    zIndex: 10,
    background: 'linear-gradient(to bottom, rgba(13,17,23,0.9), transparent)',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  radarContainer: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  radarRing: {
    position: 'absolute',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: '2px solid var(--primary)',
    animation: 'radar 4s linear infinite',
  },
  userDot: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'rgba(248, 81, 73, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  userDotInner: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'var(--primary)',
    boxShadow: '0 0 10px var(--primary-glow)',
  },
  infoCard: {
    margin: '24px',
    padding: '24px',
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
  },
  infoTitle: {
    fontSize: '1.2rem',
    fontWeight: 600,
    marginBottom: '8px',
  },
  instructionCard: {
    margin: '0 24px 16px',
    padding: '16px',
    position: 'relative',
    zIndex: 10,
    borderLeft: '4px solid var(--primary)',
    textAlign: 'left',
  },
  infoText: {
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    marginBottom: '20px',
  },
  progressContainer: {
    width: '100%',
    height: '6px',
    background: 'var(--bg-panel)',
    borderRadius: 'var(--radius-full)',
    overflow: 'hidden',
    marginBottom: '24px',
  },
  progressBar: {
    width: '100%',
    height: '100%',
  },
  progressFill: {
    height: '100%',
    background: 'var(--primary)',
    transition: 'width 2s ease-in-out',
    boxShadow: '0 0 10px var(--primary-glow)',
  },
  cancelBtn: {
    width: '100%',
    color: 'var(--text-main)',
  }
};
