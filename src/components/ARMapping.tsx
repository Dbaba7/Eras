import React, { useEffect, useState } from 'react';
import { Navigation, ShieldCheck, MapPin, Search } from 'lucide-react';

interface ARMappingProps {
  onArrive: () => void;
}

export function ARMapping({ onArrive }: ARMappingProps) {
  const [distance, setDistance] = useState(800); // 800m

  useEffect(() => {
    // Simulate walking towards the victim
    const timer = setInterval(() => {
      setDistance(prev => {
        if (prev <= 50) {
          clearInterval(timer);
          setTimeout(() => onArrive(), 1500);
          return 0;
        }
        return prev - 150;
      });
    }, 1200);
    
    return () => clearInterval(timer);
  }, [onArrive]);

  return (
    <div className="animate-fade-in" style={styles.container}>
      {/* Simulated Camera Background */}
      <div style={styles.cameraBg}>
        <div style={styles.roadMockup} />
      </div>

      <header style={styles.header}>
        <div className="glass" style={styles.navInstruction}>
          <Navigation size={24} color="var(--secondary)" />
          <div>
            <h3 style={{fontSize: '1rem', margin: 0}}>Proceed North</h3>
            <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>On Main Street</p>
          </div>
        </div>
      </header>

      {/* AR Overlays */}
      <div style={styles.arContent}>
        <div style={{...styles.arMarker, animationDuration: '2s'}}>
          <div style={styles.arDistanceBadge}>
            <MapPin size={16} color="#fff" />
            <span>{distance}m</span>
          </div>
          <div style={styles.arAvatar}>
            <Search size={24} color="#fff" />
          </div>
          <div style={styles.arLine} />
          <div style={styles.arPing} />
        </div>
      </div>

      <div style={styles.footer}>
        <div className="glass" style={styles.patientInfoCard}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div style={styles.avatarMock}>Pt</div>
            <div style={{flex: 1}}>
              <h3 style={{margin: 0, fontSize: '1.1rem'}}>Patient</h3>
              <p style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>O- • Penicillin Allergy</p>
            </div>
            <ShieldCheck size={24} color="var(--success)" />
          </div>
        </div>
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
  cameraBg: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'linear-gradient(to bottom, #2b3a4a, #0d1117)',
    zIndex: 0,
    filter: 'blur(3px)', // Simulates camera out of focus back drop
    transform: 'scale(1.1)',
  },
  roadMockup: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%) perspective(500px) rotateX(60deg)',
    width: '200px',
    height: '500px',
    borderLeft: '4px dashed rgba(255,255,255,0.2)',
    borderRight: '4px dashed rgba(255,255,255,0.2)',
  },
  header: {
    padding: '24px',
    position: 'relative',
    zIndex: 10,
  },
  navInstruction: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 20px',
    borderRadius: 'var(--radius-lg)',
  },
  arContent: {
    flex: 1,
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arMarker: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: 'float infinite ease-in-out',
  },
  arDistanceBadge: {
    background: 'var(--primary)',
    color: '#fff',
    padding: '6px 16px',
    borderRadius: 'var(--radius-full)',
    fontSize: '1rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    boxShadow: '0 4px 20px rgba(248,81,73,0.5)',
    marginBottom: '8px',
  },
  arAvatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'rgba(248,81,73,0.2)',
    border: '3px solid var(--primary)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arLine: {
    width: '2px',
    height: '100px',
    background: 'linear-gradient(to bottom, var(--primary), transparent)',
    marginTop: '4px',
  },
  arPing: {
    width: '40px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid var(--primary)',
    transform: 'rotateX(70deg)',
    animation: 'radar 2s infinite linear',
    marginTop: '-10px',
  },
  footer: {
    padding: '24px',
    position: 'relative',
    zIndex: 10,
  },
  patientInfoCard: {
    padding: '16px',
    borderRadius: 'var(--radius-lg)',
  },
  avatarMock: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '1.2rem',
  }
};
