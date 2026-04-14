import React, { useState } from 'react';
import { UserPlus, Navigation, Phone, MessageSquare, CheckCircle, Activity, X } from 'lucide-react';
import { useApp } from '../i18n';
import { ChatSystem } from './ChatSystem';

interface ActiveResponseProps {
  onResolve: () => void;
}

export function ActiveResponse({ onResolve }: ActiveResponseProps) {
  const { t } = useApp();
  const [chatOpen, setChatOpen] = useState(false);
  const [showLiveMap, setShowLiveMap] = useState(false);

  return (
    <div className="animate-fade-in" style={styles.container}>
      <div style={styles.mapBackground}>
        {/* Simulated map route */}
        <div style={styles.routeContainer}>
          <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="none">
            <path 
              d="M 50 350 C 150 300, 200 150, 350 50" 
              fill="none" 
              stroke="var(--secondary)" 
              strokeWidth="4" 
              strokeDasharray="8 8"
              style={{ animation: 'dash 20s linear infinite' }}
            />
          </svg>
          <div style={styles.responderMarker}>
            <div style={styles.markerPing} />
          </div>
          <div style={styles.userMarker} />
        </div>
      </div>

      <header style={styles.header}>
        <div style={styles.statusBadge}>
          <CheckCircle size={16} color="var(--success)" />
          <span style={{ color: 'var(--success)', fontWeight: 600 }}>{t('responderEnRoute')}</span>
        </div>
      </header>

      <div className="glass animate-slide-up delay-1" style={styles.responderCard}>
        <div style={styles.responderHeader}>
          <div style={styles.avatar}>
            <UserPlus size={28} color="var(--secondary)" />
          </div>
          <div style={styles.responderDetails}>
            <h3 style={styles.responderName}>Dr. Amina A.</h3>
            <p style={styles.responderCredential}>Certified Paramedic • 4.9 ★</p>
          </div>
          <div style={styles.etaContainer}>
            <span style={styles.etaTime}>3 min</span>
            <span style={styles.etaLabel}>ETA</span>
          </div>
        </div>

        <div style={styles.actionGrid}>
          <button style={styles.actionBtn}>
            <div style={{ ...styles.iconBtn, background: 'rgba(46, 160, 67, 0.15)' }}>
              <Phone size={24} color="var(--success)" />
            </div>
            <span>Call</span>
          </button>
          <button style={styles.actionBtn} onClick={() => setChatOpen(true)}>
            <div style={{ ...styles.iconBtn, background: 'rgba(88, 166, 255, 0.15)' }}>
              <MessageSquare size={24} color="var(--secondary)" />
            </div>
            <span>Chat</span>
          </button>
          <button style={styles.actionBtn} onClick={() => setShowLiveMap(true)}>
            <div style={{ ...styles.iconBtn, background: 'rgba(248, 81, 73, 0.15)' }}>
              <Navigation size={24} color="var(--primary)" />
            </div>
            <span>Live Map</span>
          </button>
        </div>

        <div style={styles.medicalDataCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Activity size={18} color="var(--primary)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Critical Data Shared</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Your blood type (O-) and allergies (Penicillin) have been securely shared with Dr. Amina A.
          </p>
        </div>

        <button className="btn btn-outline" style={{ width: '100%' }} onClick={onResolve}>
          {t('resolveEmergency')}
        </button>
      </div>

      {showLiveMap && (
        <div className="animate-slide-up" style={styles.liveMapOverlay}>
          <div style={styles.mapInner}>
            <div style={styles.mapHeader}>
              <h3 style={{margin: 0}}>Responder Approach</h3>
              <button style={{background: 'transparent', border: 'none', color: '#fff'}} onClick={() => setShowLiveMap(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div style={styles.simulatedMapArea}>
              <div style={styles.mapRoad} />
              <div style={styles.mapPatientMarker}>You</div>
              <div style={styles.mapResponderMarker}>
                <Navigation size={16} color="#fff" />
              </div>
            </div>

            <div style={{padding: '16px', background: 'var(--bg-panel)'}}>
              <div style={{fontSize: '1.2rem', fontWeight: 700}}>2 min remaining</div>
              <div style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>0.8 km distance</div>
            </div>
          </div>
        </div>
      )}

      {chatOpen && <ChatSystem onClose={() => setChatOpen(false)} />}
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
    justifyContent: 'space-between',
  },
  mapBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#161b22', // Slightly lighter than main bg
    zIndex: 0,
  },
  routeContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  responderMarker: {
    position: 'absolute',
    top: '50px',
    right: '50px',
    width: '16px',
    height: '16px',
    backgroundColor: 'var(--secondary)',
    borderRadius: '50%',
    boxShadow: '0 0 15px var(--secondary-glow)',
  },
  markerPing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--secondary)',
    borderRadius: '50%',
    animation: 'pulse 1.5s infinite',
  },
  userMarker: {
    position: 'absolute',
    bottom: '50px',
    left: '50px',
    width: '16px',
    height: '16px',
    backgroundColor: 'var(--primary)',
    borderRadius: '50%',
    boxShadow: '0 0 15px var(--primary-glow)',
    border: '3px solid #fff',
  },
  header: {
    padding: '24px',
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  statusBadge: {
    background: 'rgba(46, 160, 67, 0.1)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(46, 160, 67, 0.2)',
    padding: '8px 16px',
    borderRadius: 'var(--radius-full)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  responderCard: {
    margin: '16px',
    padding: '24px',
    position: 'relative',
    zIndex: 10,
    marginBottom: '32px',
  },
  resolveLabel: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-muted)'
  },
  liveMapOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'var(--bg-main)',
    zIndex: 90,
    display: 'flex', flexDirection: 'column'
  },
  mapInner: {
    flex: 1, display: 'flex', flexDirection: 'column', height: '100%'
  },
  mapHeader: {
    padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: 'var(--bg-panel)', borderBottom: '1px solid var(--border)'
  },
  simulatedMapArea: {
    flex: 1, background: '#1c242c', position: 'relative', overflow: 'hidden'
  },
  mapRoad: {
    position: 'absolute', top: 0, bottom: 0, left: '50%', width: '40px',
    background: '#2d3748', transform: 'translateX(-50%) rotate(15deg)',
    borderLeft: '2px solid rgba(255,255,255,0.1)', borderRight: '2px solid rgba(255,255,255,0.1)'
  },
  mapPatientMarker: {
    position: 'absolute', top: '20%', left: '46%',
    width: '40px', height: '40px', borderRadius: '50%',
    background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 800, fontSize: '0.8rem', color: '#fff',
    boxShadow: '0 0 10px var(--primary)'
  },
  mapResponderMarker: {
    position: 'absolute', bottom: '20%', left: '55%',
    width: '32px', height: '32px', borderRadius: '50%',
    background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    animation: 'approach 4s infinite alternate ease-in-out'
  },
  responderHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '16px',
  },
  avatar: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'var(--bg-panel)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid var(--secondary)',
  },
  responderDetails: {
    flex: 1,
  },
  responderName: {
    fontSize: '1.2rem',
    fontWeight: 700,
    margin: 0,
  },
  responderCredential: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    marginTop: '4px',
  },
  etaContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'rgba(88, 166, 255, 0.1)',
    padding: '8px 12px',
    borderRadius: '8px',
  },
  etaTime: {
    fontSize: '1.2rem',
    fontWeight: 800,
    color: 'var(--secondary)',
  },
  etaLabel: {
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    fontWeight: 600,
  },
  actionGrid: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '24px',
  },
  actionBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    background: 'transparent',
    border: 'none',
    color: 'var(--text-main)',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 500,
  },
  iconBtn: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition)',
  },
  medicalDataCard: {
    background: 'var(--bg-glass)',
    padding: '16px',
    borderRadius: 'var(--radius-md)',
    marginBottom: '24px',
    border: '1px solid rgba(248, 81, 73, 0.15)',
  }
};

// Add dash keyframes for the route animation
const styleSheet = document.createElement('style');
styleSheet.innerText = `
  @keyframes dash {
    from { stroke-dashoffset: 200; }
    to { stroke-dashoffset: 0; }
  }
`;
document.head.appendChild(styleSheet);
