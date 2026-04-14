import { useState } from 'react';
import { ArrowRight, MapPin, Bell, CheckCircle, Shield, Heart, FileText, Check } from 'lucide-react';
import { useApp } from '../i18n';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const { t, setLang, setUserName, setUserRole, userRole } = useApp();
  const [step, setStep] = useState(0); 
  const [name, setName] = useState('');
  
  // Verification states
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'scanning' | 'verified'>('idle');
  const [progress, setProgress] = useState(0);

  const handleRoleSelect = (role: 'patient' | 'responder') => {
    setUserRole(role);
    setStep(1);
  };
  
  const handleNext = () => {
    if (step === 1 && name) {
      setUserName(name);
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      onComplete();
    }
  };

  const startVerification = () => {
    if (uploadState !== 'idle') return;
    setUploadState('uploading');
    setProgress(0);
    
    // Simulate upload (1.5s)
    const uploadInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(uploadInterval);
          setUploadState('scanning');
          
          // Simulate scanning (1.5s)
          setTimeout(() => {
            setUploadState('verified');
          }, 1500);
          return 100;
        }
        return p + 10;
      });
    }, 150);
  };

  if (step === 0) {
    return (
      <div className="animate-fade-in" style={styles.container}>
        <div style={{...styles.card, justifyContent: 'center'}}>
          <h2 className="animate-slide-down" style={{...styles.title, textAlign: 'center', marginBottom: 24}}>How will you use ERAS?</h2>
          
          <button className="animate-slide-right delay-1" style={styles.roleCard} onClick={() => handleRoleSelect('patient')}>
            <div style={{...styles.iconBoxLg, background: 'rgba(248, 81, 73, 0.15)'}}>
              <Heart size={32} color="var(--primary)" />
            </div>
            <div style={{textAlign: 'left', flex: 1}}>
              <h3 style={styles.roleTitle}>{t('iNeedHelp')}</h3>
              <p style={styles.roleDesc}>I want to be able to request emergency assistance.</p>
            </div>
            <ArrowRight size={20} color="var(--text-muted)" />
          </button>

          <button className="animate-slide-right delay-2" style={styles.roleCard} onClick={() => handleRoleSelect('responder')}>
            <div style={{...styles.iconBoxLg, background: 'rgba(88, 166, 255, 0.15)'}}>
              <Shield size={32} color="var(--secondary)" />
            </div>
            <div style={{textAlign: 'left', flex: 1}}>
              <h3 style={styles.roleTitle}>{t('iCanHelp')}</h3>
              <p style={styles.roleDesc}>I am a trained volunteer/professional responder.</p>
            </div>
            <ArrowRight size={20} color="var(--text-muted)" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={styles.container}>
      <div style={styles.progressContainer}>
        <div style={{ ...styles.progressBar, width: `${(step / 3) * 100}%` }} />
      </div>
      
      <div className="glass" style={styles.card}>
        {step === 1 && (
          <div className="animate-slide-up" style={styles.stepContent}>
            <h2 style={styles.title}>Basic Details</h2>
            <p style={styles.subtitle}>Let's set up your {userRole} profile.</p>
            
            <div className="delay-1 animate-scale-in" style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
            
            <div className="delay-2 animate-scale-in" style={styles.inputGroup}>
              <label style={styles.label}>Preferred Language</label>
              <select style={styles.select} onChange={(e) => setLang(e.target.value as any)}>
                <option value="en">English</option>
                <option value="ha">Hausa</option>
                <option value="yo">Yoruba</option>
                <option value="ig">Igbo</option>
                <option value="fu">Fulani</option>
              </select>
            </div>
          </div>
        )}
        
        {step === 2 && userRole === 'patient' && (
          <div className="animate-slide-up" style={styles.stepContent}>
            <h2 style={styles.title}>Medical ID</h2>
            <p style={styles.subtitle}>This helps responders treat you faster.</p>
            
            <div className="delay-1 animate-scale-in" style={styles.inputGroup}>
              <label style={styles.label}>Blood Type</label>
              <select style={styles.select}>
                <option>A+</option><option>A-</option>
                <option>B+</option><option>B-</option>
                <option>AB+</option><option>AB-</option>
                <option>O+</option><option>O-</option>
                <option>Unknown</option>
              </select>
            </div>
            
            <div className="delay-2 animate-scale-in" style={styles.inputGroup}>
              <label style={styles.label}>Allergies / Conditions</label>
              <input type="text" placeholder="e.g. Penicillin, Asthma" />
            </div>
          </div>
        )}

        {step === 2 && userRole === 'responder' && (
          <div className="animate-slide-up" style={styles.stepContent}>
            <h2 style={styles.title}>Verification</h2>
            <p style={styles.subtitle}>Verify your medical credentials to join the network.</p>
            
            <div 
              style={{
                ...styles.uploadBox, 
                borderColor: uploadState === 'verified' ? 'var(--success)' : 'var(--border)',
                background: uploadState === 'verified' ? 'rgba(46, 160, 67, 0.1)' : 'var(--bg-glass)'
              }}
              onClick={startVerification}
            >
              {uploadState === 'idle' && (
                <div className="animate-fade-in" style={{textAlign: 'center'}}>
                  <FileText size={32} color="var(--text-muted)" style={{marginBottom: 8}}/>
                  <div style={{fontWeight: 600}}>Upload License / ID</div>
                  <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Tap to scan document</div>
                </div>
              )}
              {uploadState === 'uploading' && (
                <div className="animate-fade-in" style={{width: '100%', textAlign: 'center'}}>
                  <div style={styles.uploadProgressOuter}>
                    <div style={{...styles.uploadProgressInner, width: `${progress}%`}} />
                  </div>
                  <div style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 8}}>Uploading {progress}%...</div>
                </div>
              )}
              {uploadState === 'scanning' && (
                <div className="animate-fade-in" style={{textAlign: 'center'}}>
                  <div style={styles.scanningBar} />
                  <div style={{fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: 600, marginTop: 12}}>Scanning Document...</div>
                </div>
              )}
              {uploadState === 'verified' && (
                <div className="animate-scale-in" style={{textAlign: 'center'}}>
                  <div style={{...styles.iconBox, background: 'var(--success)', margin: '0 auto 8px'}}>
                    <Check size={20} color="#fff" />
                  </div>
                  <div style={{fontWeight: 600, color: 'var(--success)'}}>Document Verified</div>
                  <div style={{fontSize: '0.8rem', color: 'var(--success)'}}>Ready for response</div>
                </div>
              )}
            </div>

            <div className="delay-2 animate-scale-in" style={styles.inputGroup}>
              <label style={styles.label}>Response Radius</label>
              <select style={styles.select}>
                <option>5 km (Recommended)</option>
                <option>10 km</option>
                <option>20 km</option>
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-slide-up" style={styles.stepContent}>
            <h2 style={styles.title}>Permissions</h2>
            <p style={styles.subtitle}>ERAS needs these to function effectively.</p>
            
            <div className="delay-1 animate-scale-in" style={styles.permissionItem}>
              <div style={styles.iconBox}><MapPin size={20} color="var(--primary)" /></div>
              <div style={{ flex: 1 }}>
                <div style={styles.permTitle}>Precise Location</div>
                <div style={styles.permDesc}>Required to match patients with responders.</div>
              </div>
              <CheckCircle size={20} color="var(--success)" />
            </div>

            <div className="delay-2 animate-scale-in" style={styles.permissionItem}>
              <div style={styles.iconBox}><Bell size={20} color="var(--secondary)" /></div>
              <div style={{ flex: 1 }}>
                <div style={styles.permTitle}>Notifications</div>
                <div style={styles.permDesc}>To receive critical emergency alerts.</div>
              </div>
              <CheckCircle size={20} color="var(--success)" />
            </div>
          </div>
        )}

        <div className="delay-3 animate-slide-up" style={styles.footer}>
          <button 
            className="btn btn-primary" 
            onClick={handleNext} 
            disabled={(step === 1 && !name) || (step === 2 && userRole === 'responder' && uploadState !== 'verified')}
            style={{width: '100%'}}
          >
            {step === 3 ? "Complete Setup" : "Continue"} <ArrowRight size={20} />
          </button>
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
    padding: '24px',
    justifyContent: 'center',
    position: 'relative',
  },
  progressContainer: {
    position: 'absolute',
    top: '32px',
    left: '24px',
    right: '24px',
    height: '4px',
    background: 'var(--bg-glass)',
    borderRadius: 'var(--radius-full)',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    background: 'var(--secondary)',
    transition: 'width 0.3s ease',
  },
  card: {
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    minHeight: '450px',
    justifyContent: 'space-between',
  },
  stepContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 700,
    margin: 0,
  },
  subtitle: {
    color: 'var(--text-muted)',
    fontSize: '0.95rem',
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
  select: {
    width: '100%',
    padding: '14px 16px',
    background: 'var(--bg-panel)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-main)',
    fontFamily: 'inherit',
    fontSize: '1rem',
    outline: 'none',
    appearance: 'none',
  },
  permissionItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    background: 'var(--bg-glass)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border)',
  },
  iconBox: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'var(--bg-panel)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxLg: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  permTitle: {
    fontWeight: 600,
    fontSize: '0.95rem',
  },
  permDesc: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    marginTop: '2px',
  },
  roleCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '24px 16px',
    background: 'var(--bg-glass)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    cursor: 'pointer',
    color: 'var(--text-main)',
    marginBottom: '16px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    width: '100%',
  },
  roleTitle: {
    fontSize: '1.2rem',
    fontWeight: 700,
    marginBottom: '4px',
  },
  roleDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
  },
  uploadBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px',
    border: '2px dashed var(--border)',
    borderRadius: 'var(--radius-lg)',
    background: 'var(--bg-glass)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minHeight: '130px',
  },
  uploadProgressOuter: {
    height: '8px',
    width: '100%',
    background: 'var(--bg-main)',
    borderRadius: 'var(--radius-full)',
    overflow: 'hidden',
  },
  uploadProgressInner: {
    height: '100%',
    background: 'var(--secondary)',
    transition: 'width 0.15s linear',
  },
  scanningBar: {
    height: '40px',
    width: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(88, 166, 255, 0.2), transparent)',
    animation: 'scan 1.5s infinite linear',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--secondary)'
  },
  footer: {
    marginTop: 'auto',
  }
};

const styleSheet = document.createElement('style');
styleSheet.innerText = `
  @keyframes scan {
    0% { transform: translateY(-10px) scaleY(0.1); opacity: 0; }
    50% { transform: translateY(0) scaleY(1); opacity: 1; }
    100% { transform: translateY(10px) scaleY(0.1); opacity: 0; }
  }
`;
document.head.appendChild(styleSheet);
