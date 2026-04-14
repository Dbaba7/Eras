import { useState } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { ResponderDashboard } from './components/ResponderDashboard';
import { EmergencySearch } from './components/EmergencySearch';
import { ActiveResponse } from './components/ActiveResponse';
import { Onboarding } from './components/Onboarding';
import { FirstAid } from './components/FirstAid';
import { Rating } from './components/Rating';
import { ARMapping } from './components/ARMapping';
import { ArrivalCheck } from './components/ArrivalCheck';
import { AppProvider, useApp } from './i18n';
import './index.css';

type AppState = 'login' | 'onboarding' | 'dashboard' | 'searching' | 'active' | 'rating' | 'first-aid' | 'ar-mapping' | 'arrival-check';

function AppContent() {
  const { userRole } = useApp();
  const [appState, setAppState] = useState<AppState>('login');

  return (
    <div className="app-container">
      {appState === 'login' && (
        <Login onLogin={() => setAppState('onboarding')} />
      )}

      {appState === 'onboarding' && (
        <Onboarding onComplete={() => setAppState('dashboard')} />
      )}
      
      {appState === 'dashboard' && userRole === 'patient' && (
        <Dashboard 
          onTriggerSOS={() => setAppState('searching')} 
          onOpenFirstAid={() => setAppState('first-aid')} 
        />
      )}

      {appState === 'dashboard' && userRole === 'responder' && (
        <ResponderDashboard 
          onAcceptEmergency={() => setAppState('ar-mapping')}
        />
      )}

      {appState === 'first-aid' && (
        <FirstAid onBack={() => setAppState('dashboard')} />
      )}
      
      {appState === 'searching' && (
        <EmergencySearch 
          onCancel={() => setAppState('dashboard')}
          onMatchFound={() => setAppState('active')}
        />
      )}
      
      {appState === 'active' && (
        <ActiveResponse onResolve={() => setAppState('rating')} />
      )}

      {appState === 'ar-mapping' && (
        <ARMapping onArrive={() => setAppState('arrival-check')} />
      )}

      {appState === 'arrival-check' && (
        <ArrivalCheck 
          onComplete={() => setAppState('dashboard')} 
          onResumeSearch={() => setAppState('ar-mapping')}
        />
      )}

      {appState === 'rating' && (
        <Rating onComplete={() => setAppState('dashboard')} />
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;

