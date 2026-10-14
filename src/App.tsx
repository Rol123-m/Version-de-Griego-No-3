import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { WeekView } from './components/WeekView';
import { InAppViewerModal } from './components/InAppViewerModal';
import { GreekAlphabetModal } from './components/GreekAlphabetModal';
import { FlashcardTrainerModal } from './components/FlashcardTrainerModal';
import { CertificateModal } from './components/CertificateModal';
import { UnlockModal } from './components/UnlockModal';
import { TeacherAdminModal } from './components/TeacherAdminModal';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { toggleResource, toggleGame } = useProgress();

  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  // Modals state
  const [inAppViewerState, setInAppViewerState] = useState<{
    isOpen: boolean;
    title: string;
    url: string;
    type: 'html' | 'pdf' | 'video' | 'game' | 'examen';
  }>({
    isOpen: false,
    title: '',
    url: '',
    type: 'html'
  });

  const [isAlphabetOpen, setIsAlphabetOpen] = useState(false);
  const [isFlashcardsOpen, setIsFlashcardsOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isUnlockOpen, setIsUnlockOpen] = useState(false);
  const [isTeacherAdminOpen, setIsTeacherAdminOpen] = useState(false);

  if (!isAuthenticated) {
    return <Login />;
  }

  const handleOpenInAppViewer = (
    title: string, 
    url: string, 
    type: 'html' | 'pdf' | 'video' | 'game' | 'examen'
  ) => {
    setInAppViewerState({
      isOpen: true,
      title,
      url,
      type
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      
      {/* Top Navbar */}
      <Navbar
        onGoHome={() => setSelectedWeek(null)}
        onOpenAlphabet={() => setIsAlphabetOpen(true)}
        onOpenFlashcards={() => setIsFlashcardsOpen(true)}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onOpenTeacherTools={() => setIsTeacherAdminOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {selectedWeek === null ? (
          <Dashboard
            onSelectWeek={(w) => setSelectedWeek(w)}
            onOpenUnlockModal={() => setIsUnlockOpen(true)}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        ) : (
          <WeekView
            weekNumber={selectedWeek}
            onBackToDashboard={() => setSelectedWeek(null)}
            onNavigateWeek={(w) => setSelectedWeek(w)}
            onOpenInAppViewer={handleOpenInAppViewer}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <InAppViewerModal
        isOpen={inAppViewerState.isOpen}
        onClose={() => setInAppViewerState(prev => ({ ...prev, isOpen: false }))}
        title={inAppViewerState.title}
        url={inAppViewerState.url}
        type={inAppViewerState.type}
      />

      <GreekAlphabetModal
        isOpen={isAlphabetOpen}
        onClose={() => setIsAlphabetOpen(false)}
      />

      <FlashcardTrainerModal
        isOpen={isFlashcardsOpen}
        onClose={() => setIsFlashcardsOpen(false)}
      />

      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
      />

      <UnlockModal
        isOpen={isUnlockOpen}
        onClose={() => setIsUnlockOpen(false)}
      />

      <TeacherAdminModal
        isOpen={isTeacherAdminOpen}
        onClose={() => setIsTeacherAdminOpen(false)}
      />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ProgressProvider>
        <AppContent />
      </ProgressProvider>
    </AuthProvider>
  );
};

export default App;
