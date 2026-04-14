import React, { useState } from 'react';
import { Menu, X, Shield, Activity, MapPin, Power, ShieldCheck, ChevronDown, Check } from 'lucide-react';
import { useApp } from '../i18n';

interface ResponderDashboardProps {
  onAcceptEmergency: () => void;
}

export function ResponderDashboard({ onAcceptEmergency }: ResponderDashboardProps) {
  const { t, userName, lang, setLang } = useApp();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [onDuty, setOnDuty] = useState(false);
  const [incomingAlert, setIncomingAlert] = useState(false);
  
  // Drawer Modals
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMedical, setShowMedical] = useState(false);
  const [showContacts, setShowContacts] = useState(false);

  const toggleDuty = () => {
    setOnDuty(!onDuty);
    if (!onDuty) {
      // Simulate incoming emergency randomly after going on duty
      setTimeout(() => {
        setIncomingAlert(true);
      }, 3000);
    } else {
      setIncomingAlert(false);
    }
  };

  return (
    <div className="animate-fade-in" style={styles.container}>
      {drawerOpen && (
        <div style={styles.drawerOverlay} onClick={() => setDrawerOpen(false)} />
      )}
      
      <div style={{ ...styles.drawer, transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
        <div style={styles.drawerHeader}>
          <h2>Settings</h2>
          <button style={styles.iconBtn} onClick={() => setDrawerOpen(false)}>
            <X size={24} color="var(--text-main)" />
          </button>
        </div>
        
        <div style={styles.drawerSection}>
          <label style={styles.drawerLabel}>Language</label>
          <div style={styles.customSelectBox} onClick={() => setShowLangMenu(!showLangMenu)}>
            <span>{lang === 'en' ? 'English' : lang === 'ha' ? 'Hausa' : lang === 'yo' ? 'Yoruba' : lang === 'ig' ? 'Igbo' : 'Fulani'}</span>
            <ChevronDown size={16} />
          </div>
          {showLangMenu && (
            <div className="animate-slide-down" style={styles.customSelectList}>
              {['en', 'ha', 'yo', 'ig', 'fu'].map((l) => (
                <div 
                  key={l} 
                  style={{...styles.customSelectOption, color: lang === l ? 'var(--secondary)' : 'var(--text-main)'}}
                  onClick={() => { setLang(l as any); setShowLangMenu(false); }}
                >
                  {l === 'en' ? 'English' : l === 'ha' ? 'Hausa' : l === 'yo' ? 'Yoruba' : l === 'ig' ? 'Igbo' : 'Fulani'}
                  {lang === l && <Check size={16} />}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={styles.drawerSection}>
          <label style={styles.drawerLabel}>Profile Settings</label>
          <button style={styles.drawerBtn} onClick={() => setShowMedical(true)}>
            Edit Medical ID
          </button>
          <button style={styles.drawerBtn} onClick={() => setShowContacts(true)}>
            Manage Contacts
          </button>
        </div>
      </div>

      <header style={styles.header}>
        <div style={styles.userInfo}>
          <div style={styles.avatar} onClick={() => setDrawerOpen(true)}>
            <Menu size={20} color="var(--text-main)" />
          </div>
          <div>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <h2 style={styles.greeting}>{t('greeting')}, {userName}</h2>
              <ShieldCheck size={18} color="var(--secondary)" />
            </div>
            <p style={styles.status}>
              <span style={{...styles.statusDot, backgroundColor: onDuty ? 'var(--success)' : 'var(--text-muted)', boxShadow: onDuty ? '0 0 8px var(--success-glow)' : 'none'}} /> 
              {onDuty ? t('onDuty') : t('offDuty')}
            </p>
          </div>
        </div>
        <div style={styles.shieldBadge}>
          <Shield size={20} color="var(--secondary)" />
        </div>
      </header>

      <div style={styles.mainContent}>
        {!incomingAlert ? (
          <div className="animate-fade-in" style={styles.dutyToggleContainer}>
            <button 
              style={{
                ...styles.dutyBtn,
                background: onDuty ? 'rgba(88, 166, 255, 0.15)' : 'var(--bg-glass)',
                borderColor: onDuty ? 'var(--secondary)' : 'var(--border)'
              }}
              onClick={toggleDuty}
            >
              <Power size={48} color={onDuty ? 'var(--secondary)' : 'var(--text-muted)'} style={{ marginBottom: 16 }} />
              <h2 style={{ margin: 0, fontSize: '1.5rem', color: onDuty ? 'var(--secondary)' : 'var(--text-main)' }}>
                {onDuty ? "You are on Duty" : "Go on Duty"}
              </h2>
              <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>
                {onDuty ? "Waiting for nearby emergencies..." : "Tap to start receiving alerts in your area"}
              </p>
            </button>
            {onDuty && (
              <div style={styles.radarPulse}>
                <div style={{ ...styles.radarRing, animationDelay: '0s' }} />
                <div style={{ ...styles.radarRing, animationDelay: '1.5s' }} />
              </div>
            )}
          </div>
        ) : (
          <div className="animate-slide-up" style={styles.alertCard}>
            <div style={styles.glowBg} />
            <div style={styles.alertHeader}>
              <div style={styles.alertIconPulse}>
                <Activity size={32} color="#fff" />
              </div>
              <h2 style={styles.alertTitle}>Emergency Nearby!</h2>
            </div>
            
            <div style={styles.alertDetails}>
              <div style={styles.detailRow}>
                <MapPin size={20} color="var(--text-muted)" />
                <div>
                  <span style={{ fontWeight: 600 }}>0.8 km away</span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Location precisely established</p>
                </div>
              </div>
            </div>

            <button className="btn btn-danger" style={{ width: '100%', marginTop: 24, fontSize: '1.2rem', padding: '16px', position: 'relative', zIndex: 10 }} onClick={onAcceptEmergency}>
              Accept & Navigate
            </button>
          </div>
        )}
      </div>

      {showMedical && (
        <div className="animate-fade-in" style={styles.modalOverlay}>
          <div className="animate-slide-up glass" style={styles.editModal}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px'}}>
              <h3 style={{margin: 0}}>Edit Responder ID</h3>
              <button style={styles.iconBtn} onClick={() => setShowMedical(false)}><X size={20}/></button>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <div>
                <label style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Credential ID</label>
                <input type="text" style={styles.input} defaultValue="MED-8492-XX" disabled />
              </div>
              <div>
                <label style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Status</label>
                <div style={{...styles.input, color: 'var(--success)', fontWeight: 600}}>Verified</div>
              </div>
              <button className="btn btn-outline" style={{marginTop: 16}} onClick={() => setShowMedical(false)}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {showContacts && (
        <div className="animate-fade-in" style={styles.modalOverlay}>
          <div className="animate-slide-up glass" style={styles.editModal}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px'}}>
              <h3 style={{margin: 0}}>Manage Contacts</h3>
              <button style={styles.iconBtn} onClick={() => setShowContacts(false)}><X size={20}/></button>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <div>
                <label style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Primary Contact</label>
                <input type="text" style={styles.input} defaultValue="+234 800 000 0000" />
              </div>
              <div>
                <label style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Relationship</label>
                <input type="text" style={styles.input} defaultValue="Spouse" />
              </div>
              <button className="btn btn-outline" style={{marginTop: 16}} onClick={() => setShowContacts(false)}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    background: 'var(--bg-main)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    zIndex: 10,
    borderBottom: '1px solid var(--border)',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'var(--bg-panel)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--border)',
    cursor: 'pointer',
  },
  greeting: {
    fontSize: '1.2rem',
    fontWeight: 600,
    margin: 0,
  },
  status: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '4px',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  shieldBadge: {
    padding: '8px',
    background: 'rgba(88, 166, 255, 0.1)',
    borderRadius: '50%',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  dutyToggleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  dutyBtn: {
    width: '100%',
    padding: '48px 24px',
    borderRadius: '24px',
    border: '2px solid',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'var(--transition)',
    zIndex: 10,
  },
  radarPulse: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 0,
    pointerEvents: 'none',
  },
  radarRing: {
    position: 'absolute',
    top: '-150px',
    left: '-150px',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    border: '2px solid var(--secondary)',
    animation: 'radar 3s linear infinite',
  },
  alertCard: {
    background: 'var(--bg-panel)',
    border: '1px solid var(--primary)',
    borderRadius: 'var(--radius-lg)',
    padding: '32px 24px',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(248, 81, 73, 0.2)',
  },
  glowBg: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'radial-gradient(circle at center, rgba(248, 81, 73, 0.15), transparent 70%)',
    zIndex: 0,
  },
  alertHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  alertIconPulse: {
    width: '80px', height: '80px',
    borderRadius: '50%',
    background: 'var(--primary)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: '16px',
    animation: 'pulse 1.5s infinite',
  },
  alertTitle: {
    fontSize: '1.6rem',
    fontWeight: 700,
    color: 'var(--text-main)',
  },
  alertDetails: {
    background: 'var(--bg-glass)',
    padding: '16px',
    borderRadius: 'var(--radius-md)',
    marginTop: '24px',
    border: '1px solid var(--border)',
    position: 'relative',
    zIndex: 1,
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  drawerOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 99,
  },
  drawer: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0,
    width: '280px',
    background: 'var(--bg-main)',
    borderRight: '1px solid var(--border)',
    zIndex: 100,
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    flexDirection: 'column',
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '24px',
    borderBottom: '1px solid var(--border)',
  },
  drawerSection: {
    padding: '24px',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  drawerLabel: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    fontWeight: 600,
  },
  iconBtn: {
    background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px'
  },
  select: {
    width: '100%', padding: '12px', background: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)', fontFamily: 'inherit', outline: 'none'
  },
  input: {
    width: '100%',
    padding: '12px',
    background: 'var(--bg-glass)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-main)',
    fontFamily: 'inherit',
    outline: 'none',
    marginTop: '4px',
  },
  customSelectBox: {
    padding: '12px',
    background: 'var(--bg-glass)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-main)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  },
  customSelectList: {
    background: 'var(--bg-panel)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    marginTop: '4px',
    overflow: 'hidden',
  },
  customSelectOption: {
    padding: '12px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--border)',
  },
  drawerBtn: {
    margin: 0,
    background: 'var(--bg-glass)',
    border: '1px solid var(--border)',
    color: 'var(--text-main)',
    padding: '12px',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'var(--transition)'
  },
  modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'var(--bg-main)', // opaque to cover Dashboard
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  editModal: {
    width: '100%',
    background: 'var(--bg-panel)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
  }
};
