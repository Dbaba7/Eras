import React, { useState } from 'react';
import { Menu, X, Phone, Heart, Activity, AlertCircle, Droplet, MapPin, BookOpen, ChevronDown, Check } from 'lucide-react';
import { useApp } from '../i18n';

interface DashboardProps {
  onTriggerSOS: () => void;
  onOpenFirstAid: () => void;
}

export function Dashboard({ onTriggerSOS, onOpenFirstAid }: DashboardProps) {
  const { t, userName, lang, setLang } = useApp();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showEmergencyTypes, setShowEmergencyTypes] = useState(false);
  const [showLocalNumbers, setShowLocalNumbers] = useState(false);
  
  // Drawer Modals
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMedical, setShowMedical] = useState(false);
  const [showContacts, setShowContacts] = useState(false);

  const handleTypeSelect = (_type: string) => {
    setShowEmergencyTypes(false);
    onTriggerSOS(); // Could pass the type to parent if needed
  };

  return (
    <div className="animate-fade-in" style={styles.container}>
      {/* Side Drawer Overlay */}
      {drawerOpen && (
        <div 
          style={styles.drawerOverlay} 
          onClick={() => setDrawerOpen(false)}
        />
      )}
      
      {/* Side Drawer */}
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
            <h2 style={styles.greeting}>{t('greeting')}, {userName}</h2>
            <p style={styles.status}>
              <span style={styles.statusDot} /> {t('systemActive')}
            </p>
          </div>
        </div>
        <button style={styles.iconBtn}>
          <AlertCircle size={24} color="var(--text-muted)" />
        </button>
      </header>

      <div style={styles.sosContainer}>
        {!showEmergencyTypes ? (
          <button className="animate-slide-up delay-1" style={styles.sosButton} onClick={() => setShowEmergencyTypes(true)}>
            <div style={styles.sosInner}>
              <span style={styles.sosText}>SOS</span>
              <span style={styles.sosSubtext}>{t('tapEmergency')}</span>
            </div>
          </button>
        ) : (
          <div className="animate-fade-in glass" style={styles.emergencyTypeCard}>
            <h3 style={{marginTop: 0, textAlign: 'center'}}>Select Emergency Type</h3>
            <div style={styles.typeGrid}>
              <button style={{...styles.typeBtn, borderLeft: '4px solid var(--primary)'}} onClick={() => handleTypeSelect('Cardiac')}>
                <Activity size={24} color="var(--primary)" /> Cardiac / Medical
              </button>
              <button style={{...styles.typeBtn, borderLeft: '4px solid #ff9800'}} onClick={() => handleTypeSelect('Fire')}>
                <AlertCircle size={24} color="#ff9800" /> Fire Hazard
              </button>
              <button style={{...styles.typeBtn, borderLeft: '4px solid var(--secondary)'}} onClick={() => handleTypeSelect('Trauma')}>
                <Droplet size={24} color="var(--secondary)" /> Trauma / Injury
              </button>
              <button style={{...styles.typeBtn, borderLeft: '4px solid #9c27b0'}} onClick={() => handleTypeSelect('Security')}>
                <AlertCircle size={24} color="#9c27b0" /> Security Threat
              </button>
            </div>
            <button style={styles.cancelTypeBtn} onClick={() => setShowEmergencyTypes(false)}>Cancel</button>
          </div>
        )}
        {!showEmergencyTypes && <div style={styles.sosPulse} />}
      </div>

      <div className="glass delay-2 animate-slide-up" style={styles.vitalsCard}>
        <h3 style={styles.vitalsTitle}>{t('medicalId')}</h3>
        <div style={styles.vitalsGrid}>
          <div style={styles.vitalItem}>
            <Droplet size={20} color="var(--primary)" />
            <div style={styles.vitalInfo}>
              <span style={styles.vitalLabel}>{t('bloodType')}</span>
              <span style={styles.vitalValue}>O-</span>
            </div>
          </div>
          <div style={styles.vitalItem}>
            <Heart size={20} color="var(--primary)" />
            <div style={styles.vitalInfo}>
              <span style={styles.vitalLabel}>{t('allergies')}</span>
              <span style={styles.vitalValue}>Penicillin</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass delay-3 animate-slide-up" style={styles.quickActions}>
        <button style={styles.actionBtn} onClick={() => setShowLocalNumbers(true)}>
          <Phone size={20} color="var(--text-muted)" />
          <div style={{flex: 1, textAlign: 'left'}}>
            <div>{t('emergencyContacts')}</div>
            <div style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>112, NEMA, Police</div>
          </div>
        </button>
        <button style={styles.actionBtn} onClick={onOpenFirstAid}>
          <BookOpen size={20} color="var(--secondary)" />
          <span>{t('firstAid')}</span>
        </button>
        <button style={{...styles.actionBtn, borderBottom: 'none'}}>
          <MapPin size={20} color="var(--text-muted)" />
          <span>{t('hospitalsNearby')}</span>
        </button>
      </div>

      {showLocalNumbers && (
        <div className="animate-slide-up glass" style={styles.localNumbersModal}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
            <h3 style={{margin: 0}}>Nigeria Emergency Lines</h3>
            <button style={styles.iconBtn} onClick={() => setShowLocalNumbers(false)}><X size={20}/></button>
          </div>
          <a href="tel:112" style={styles.phoneLink}>
            <div style={styles.phoneIcon}><Phone size={20} color="#fff" /></div>
            <div style={{flex: 1}}>
              <div style={styles.phoneName}>National Emergency Number</div>
              <div style={styles.phoneNumber}>112</div>
            </div>
          </a>
          <a href="tel:199" style={styles.phoneLink}>
            <div style={{...styles.phoneIcon, background: 'var(--primary)'}}><Phone size={20} color="#fff" /></div>
            <div style={{flex: 1}}>
              <div style={styles.phoneName}>Fire & Rescue Service</div>
              <div style={styles.phoneNumber}>199</div>
            </div>
          </a>
        </div>
      )}

      {showMedical && (
        <div className="animate-fade-in" style={styles.modalOverlay}>
          <div className="animate-slide-up glass" style={styles.editModal}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px'}}>
              <h3 style={{margin: 0}}>Edit Medical ID</h3>
              <button style={styles.iconBtn} onClick={() => setShowMedical(false)}><X size={20}/></button>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <div>
                <label style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Blood Type</label>
                <select style={styles.select}><option>O-</option><option>O+</option><option>A+</option></select>
              </div>
              <div>
                <label style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Allergies</label>
                <input type="text" style={styles.input} defaultValue="Penicillin" />
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
                <input type="text" style={styles.input} defaultValue="Mother" />
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
    padding: '24px',
    gap: '32px',
    overflowY: 'auto',
    position: 'relative',
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
  select: {
    width: '100%',
    padding: '12px',
    background: 'var(--bg-glass)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-main)',
    fontFamily: 'inherit',
    outline: 'none'
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    zIndex: 10,
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
    transition: 'var(--transition)',
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
    backgroundColor: 'var(--success)',
    boxShadow: '0 0 8px var(--success-glow)',
  },
  iconBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
  },
  sosContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'relative',
    minHeight: '260px',
  },
  sosButton: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'linear-gradient(145deg, #f85149, #d03027)',
    border: 'none',
    boxShadow: '0 10px 30px rgba(248, 81, 73, 0.4), inset 0 2px 10px rgba(255,255,255,0.3)',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 10,
    transition: 'transform 0.2s',
  },
  sosInner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosText: {
    color: '#fff',
    fontSize: '3rem',
    fontWeight: 800,
    letterSpacing: '2px',
    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  sosSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '0.9rem',
    fontWeight: 500,
    marginTop: '4px',
  },
  sosPulse: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'var(--primary)',
    zIndex: 1,
    animation: 'pulse 2s infinite',
  },
  vitalsCard: {
    padding: '20px',
  },
  vitalsTitle: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    marginBottom: '16px',
    fontWeight: 500,
  },
  vitalsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  vitalItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'var(--bg-glass)',
    padding: '12px',
    borderRadius: 'var(--radius-md)',
  },
  vitalInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  vitalLabel: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  vitalValue: {
    fontSize: '1rem',
    fontWeight: 600,
  },
  quickActions: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    background: 'transparent',
    border: 'none',
    color: 'var(--text-main)',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    borderBottom: '1px solid var(--border)',
    textAlign: 'left',
  },
  emergencyTypeCard: {
    padding: '24px',
    borderRadius: 'var(--radius-lg)',
    width: '100%',
    zIndex: 20,
  },
  typeGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '12px',
    marginTop: '16px',
  },
  typeBtn: {
    padding: '16px',
    background: 'var(--bg-panel)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-main)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 600,
  },
  cancelTypeBtn: {
    marginTop: '16px',
    padding: '12px',
    width: '100%',
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
  },
  localNumbersModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '24px',
    background: 'var(--bg-main)',
    borderTopLeftRadius: 'var(--radius-lg)',
    borderTopRightRadius: 'var(--radius-lg)',
    borderTop: '1px solid var(--border)',
    zIndex: 50,
    boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
  },
  phoneLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    background: 'var(--bg-glass)',
    borderRadius: 'var(--radius-sm)',
    textDecoration: 'none',
    color: 'var(--text-main)',
    marginBottom: '12px',
  },
  phoneIcon: {
    width: '40px', height: '40px',
    borderRadius: '50%',
    background: 'var(--secondary)',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  phoneName: {
    fontWeight: 600,
    fontSize: '0.9rem',
  },
  phoneNumber: {
    color: 'var(--text-muted)',
    fontSize: '0.85rem'
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

