import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Wind, Activity, Flame } from 'lucide-react';
import { useApp } from '../i18n';

interface FirstAidProps {
  onBack: () => void;
}

export function FirstAid({ onBack }: FirstAidProps) {
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState<'CPR' | 'Choking' | 'Burns' | null>(null);

  const renderContent = () => {
    switch(activeTab) {
      case 'CPR':
        return (
          <div className="animate-fade-in" style={styles.guideContent}>
            <h4>1. Check Responsiveness</h4>
            <p>Shake the person gently and shout. If no response, they need help.</p>
            <h4>2. Call for Help</h4>
            <p>You've already triggered ERAS. A responder is being notified.</p>
            <h4>3. Chest Compressions</h4>
            <p>Place the heel of one hand on the center of their chest. Put your other hand on top. Push hard and fast (100-120 compressions per minute).</p>
            <div style={styles.mockImage}>
              <Activity size={48} color="var(--primary)" />
            </div>
            <h4>4. Keep Going</h4>
            <p>Do not stop until the volunteer responder arrives or the person wakes up.</p>
          </div>
        );
      case 'Choking':
        return (
          <div className="animate-fade-in" style={styles.guideContent}>
            <h4>1. Stand Behind</h4>
            <p>Stand behind the person and wrap your arms around their waist.</p>
            <h4>2. Make a Fist</h4>
            <p>Place your fist just above their navel.</p>
            <h4>3. Upward Thrusts</h4>
            <p>Grab your fist with your other hand and give quick, upward thrusts (Heimlich maneuver).</p>
            <div style={styles.mockImage}>
              <Wind size={48} color="var(--secondary)" />
            </div>
          </div>
        );
      case 'Burns':
        return (
          <div className="animate-fade-in" style={styles.guideContent}>
            <h4>1. Cool the Burn</h4>
            <p>Hold the burned area under cool (not cold) running water for 10-15 mins.</p>
            <h4>2. Remove Tight Items</h4>
            <p>Quickly but gently remove rings or tight items from the burned area before it swells.</p>
            <h4>3. Cover</h4>
            <p>Cover the area loosely with a sterile, non-fluffy dressing.</p>
            <div style={styles.mockImage}>
              <Flame size={48} color="#ff9800" />
            </div>
          </div>
        );
      default:
        return (
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button style={styles.listCard} onClick={() => setActiveTab('CPR')}>
              <div style={{...styles.iconBox, background: 'rgba(248, 81, 73, 0.1)'}}>
                <Activity size={24} color="var(--primary)" />
              </div>
              <span style={styles.listTitle}>CPR (Cardiac Arrest)</span>
            </button>
            <button style={styles.listCard} onClick={() => setActiveTab('Choking')}>
              <div style={{...styles.iconBox, background: 'rgba(88, 166, 255, 0.1)'}}>
                <Wind size={24} color="var(--secondary)" />
              </div>
              <span style={styles.listTitle}>Choking Response</span>
            </button>
            <button style={styles.listCard} onClick={() => setActiveTab('Burns')}>
              <div style={{...styles.iconBox, background: 'rgba(255, 152, 0, 0.1)'}}>
                <Flame size={24} color="#ff9800" />
              </div>
              <span style={styles.listTitle}>Treating Burns</span>
            </button>
          </div>
        );
    }
  };

  return (
    <div className="animate-fade-in" style={styles.container}>
      <header style={styles.header}>
        <button style={styles.iconBtn} onClick={() => activeTab ? setActiveTab(null) : onBack()}>
          <ArrowLeft size={24} />
        </button>
        <span style={styles.headerTitle}>{activeTab ? activeTab + ' Guide' : t('firstAid')}</span>
        <div style={{ width: 24 }} /> {/* Spacer */}
      </header>
      
      <div style={styles.content}>
        {!activeTab && (
          <div style={styles.heroSection}>
            <BookOpen size={48} color="var(--secondary)" />
            <h3>Offline Emergency Guides</h3>
            <p>Crucial steps you can take to save a life while waiting for professional help.</p>
          </div>
        )}
        
        {renderContent()}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: 'var(--bg-main)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    borderBottom: '1px solid var(--border)',
    background: 'var(--bg-panel)',
  },
  headerTitle: {
    fontSize: '1.2rem',
    fontWeight: 600,
  },
  iconBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-main)',
    cursor: 'pointer',
    padding: '4px',
  },
  content: {
    padding: '24px',
    flex: 1,
    overflowY: 'auto',
  },
  heroSection: {
    textAlign: 'center',
    marginBottom: '32px',
    padding: '24px 0',
  },
  listCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    background: 'var(--bg-glass)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-main)',
    cursor: 'pointer',
    transition: 'var(--transition)',
    textAlign: 'left',
  },
  iconBox: {
    width: '48px',
    height: '48px',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listTitle: {
    fontSize: '1.1rem',
    fontWeight: 500,
  },
  guideContent: {
    background: 'var(--bg-glass)',
    padding: '24px',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border)',
  },
  mockImage: {
    width: '100%',
    height: '160px',
    background: 'var(--bg-panel)',
    borderRadius: 'var(--radius-md)',
    margin: '24px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--border)',
  }
};
