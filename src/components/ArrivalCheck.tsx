import React, { useState } from 'react';
import { UserCheck, UserX, AlertTriangle, Phone, Map, CheckCircle } from 'lucide-react';
import { useApp } from '../i18n';

interface ArrivalCheckProps {
  onComplete: () => void;
  onResumeSearch: () => void;
}

export function ArrivalCheck({ onComplete, onResumeSearch }: ArrivalCheckProps) {
  const { } = useApp();
  const [step, setStep] = useState<'initial' | 'found-form' | 'not-found' | 'success'>('initial');

  // Form states
  const [condition, setCondition] = useState('');
  const [safe, setSafe] = useState<boolean | null>(null);
  const [backup, setBackup] = useState<boolean | null>(null);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const handleFalseAlarm = () => {
    setStep('success');
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div className="animate-fade-in" style={styles.container}>
      <header style={styles.header}>
        <h1 style={{margin: 0, fontSize: '1.5rem', fontWeight: 600}}>Arrival Checklist</h1>
        <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px'}}>
          Please report the situation on the ground.
        </p>
      </header>

      <div style={styles.content}>
        {step === 'initial' && (
          <div className="animate-slide-up" style={styles.card}>
            <div style={styles.iconPulseWrapper}>
              <Map size={32} color="#fff" />
            </div>
            <h2 style={{fontSize: '1.3rem', marginBottom: '8px'}}>Destination Reached</h2>
            <p style={{color: 'var(--text-muted)', marginBottom: '32px', textAlign: 'center'}}>
              You are within the 50m radius of the reported incident. Have you located the patient?
            </p>
            
            <div style={styles.actionGrid}>
              <button style={{...styles.actionBtn, borderColor: 'var(--success)', background: 'rgba(46, 160, 67, 0.1)'}} onClick={() => setStep('found-form')}>
                <UserCheck size={32} color="var(--success)" style={{marginBottom: '8px'}} />
                <span style={{color: 'var(--success)', fontWeight: 600}}>Yes, Located</span>
              </button>
              
              <button style={{...styles.actionBtn, borderColor: 'var(--primary)', background: 'rgba(248, 81, 73, 0.1)'}} onClick={() => setStep('not-found')}>
                <UserX size={32} color="var(--primary)" style={{marginBottom: '8px'}} />
                <span style={{color: 'var(--primary)', fontWeight: 600}}>No, Cannot Find</span>
              </button>
            </div>
          </div>
        )}

        {step === 'found-form' && (
          <div className="animate-slide-right" style={styles.formContainer}>
            <h2 style={{fontSize: '1.2rem', marginBottom: '16px'}}>Initial Assessment</h2>
            <form onSubmit={handleSubmitReport} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <div>
                <label style={styles.label}>What is the primary visible condition?</label>
                <select style={styles.select} value={condition} onChange={(e) => setCondition(e.target.value)} required>
                  <option value="" disabled>Select condition...</option>
                  <option value="unconscious">Unconscious / Unresponsive</option>
                  <option value="bleeding">Severe Bleeding</option>
                  <option value="breathing">Breathing Difficulty</option>
                  <option value="mobile">Stable / Mobile</option>
                  <option value="other">Other / Trapped</option>
                </select>
              </div>

              <div>
                <label style={styles.label}>Is the immediate area safe for rescue?</label>
                <div style={styles.radioGroup}>
                  <button type="button" style={{...styles.radioBtn, background: safe === true ? 'var(--secondary)' : 'var(--bg-panel)'}} onClick={() => setSafe(true)}>Yes</button>
                  <button type="button" style={{...styles.radioBtn, background: safe === false ? 'var(--primary)' : 'var(--bg-panel)'}} onClick={() => setSafe(false)}>No</button>
                </div>
              </div>

              <div>
                <label style={styles.label}>Do you need advanced medical backup (Ambulance)?</label>
                <div style={styles.radioGroup}>
                  <button type="button" style={{...styles.radioBtn, background: backup === true ? 'var(--secondary)' : 'var(--bg-panel)'}} onClick={() => setBackup(true)}>Yes, Dispatch Now</button>
                  <button type="button" style={{...styles.radioBtn, background: backup === false ? 'var(--secondary)' : 'var(--bg-panel)'}} onClick={() => setBackup(false)}>No, Handleable</button>
                </div>
              </div>

              <div style={{marginTop: 'auto', paddingTop: '24px'}}>
                <button type="submit" className="btn btn-primary">Transmit Report</button>
              </div>
            </form>
          </div>
        )}

        {step === 'not-found' && (
          <div className="animate-slide-right" style={styles.card}>
            <div style={{...styles.iconPulseWrapper, background: '#ff9800'}}>
              <AlertTriangle size={32} color="#fff" />
            </div>
            <h2 style={{fontSize: '1.3rem', marginBottom: '8px'}}>Victim Not Located</h2>
            <p style={{color: 'var(--text-muted)', marginBottom: '32px', textAlign: 'center'}}>
              The patient may have relocated or this may be a false alarm. What would you like to do?
            </p>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px', width: '100%'}}>
              <a href="tel:112" style={{textDecoration: 'none'}}>
                <button style={{...styles.fullBtn, background: 'var(--bg-glass)', border: '1px solid var(--border)'}}>
                  <Phone size={20} />
                  Call Dispatch / Patient
                </button>
              </a>
              
              <button style={{...styles.fullBtn, background: 'var(--bg-glass)', border: '1px solid var(--secondary)', color: 'var(--secondary)'}} onClick={onResumeSearch}>
                <Map size={20} />
                Expand Search Area
              </button>
              
              <button style={{...styles.fullBtn, background: 'rgba(248,81,73,0.1)', border: '1px solid var(--primary)', color: 'var(--primary)'}} onClick={handleFalseAlarm}>
                <UserX size={20} />
                Mark as False Alarm
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="animate-scale-in" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
            <CheckCircle size={80} color="var(--success)" style={{marginBottom: '24px'}} />
            <h2 style={{fontSize: '1.8rem', fontWeight: 700}}>Report Submitted</h2>
            <p style={{color: 'var(--text-muted)'}}>Updating system securely...</p>
          </div>
        )}
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
    background: 'var(--bg-main)',
  },
  header: {
    padding: '24px',
    borderBottom: '1px solid var(--border)',
    background: 'var(--bg-panel)',
  },
  content: {
    flex: 1,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    background: 'var(--bg-panel)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
  },
  iconPulseWrapper: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'var(--secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
    boxShadow: '0 0 30px rgba(88,166,255,0.4)',
  },
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    width: '100%',
  },
  actionBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
    borderRadius: 'var(--radius-md)',
    border: '2px solid',
    cursor: 'pointer',
    background: 'transparent',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  formContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    display: 'block',
    fontSize: '0.95rem',
    fontWeight: 500,
    marginBottom: '8px',
    color: 'var(--text-main)',
  },
  select: {
    width: '100%',
    padding: '16px',
    background: 'var(--bg-panel)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-main)',
    fontSize: '1rem',
    outline: 'none',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
  },
  radioGroup: {
    display: 'flex',
    gap: '12px',
  },
  radioBtn: {
    flex: 1,
    padding: '14px',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    color: '#fff',
    fontSize: '0.95rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  fullBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '16px',
    borderRadius: 'var(--radius-md)',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    color: 'var(--text-main)',
    transition: 'transform 0.2s',
  }
};
