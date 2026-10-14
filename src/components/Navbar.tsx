import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { COURSE_CONFIG } from '../data/courseData';
import { BookOpen, Award, Sparkles, LogOut, Shield, GraduationCap, Flame } from 'lucide-react';

interface NavbarProps {
  onOpenAlphabet: () => void;
  onOpenFlashcards: () => void;
  onOpenCertificate: () => void;
  onOpenTeacherTools: () => void;
  onGoHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAlphabet,
  onOpenFlashcards,
  onOpenCertificate,
  onOpenTeacherTools,
  onGoHome
}) => {
  const { user, logout } = useAuth();
  const { progress } = useProgress();

  if (!user) return null;

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Course Title */}
          <div 
            onClick={onGoHome}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative">
              <img 
                src="/mas logos.jpeg" 
                alt="Ministerio Vivos para Servir" 
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-400/80 shadow-md transition-transform group-hover:scale-105"
                onError={(e) => {
                  // Fallback if image path differs
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded-full border border-slate-900">
                Ω
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-100 group-hover:text-amber-400 transition-colors font-serif tracking-tight">
                  Griego Koiné
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold rounded bg-sky-900/80 text-sky-300 border border-sky-700/50">
                  {COURSE_CONFIG.TOTAL_SEMANAS} Semanas
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {COURSE_CONFIG.MINISTERIO}
              </p>
            </div>
          </div>

          {/* Center Navigation Shortcuts */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={onGoHome}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>Semanas</span>
            </button>
            <button
              onClick={onOpenAlphabet}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <span className="font-serif font-bold text-amber-400 text-base leading-none">Αα</span>
              <span>Alfabeto</span>
            </button>
            <button
              onClick={onOpenFlashcards}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Vocabulario</span>
            </button>
            <button
              onClick={onOpenCertificate}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Certificado</span>
            </button>
            {user.esProfesor && (
              <button
                onClick={onOpenTeacherTools}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-purple-300 hover:text-white hover:bg-purple-900/40 border border-purple-800/40 transition-colors"
              >
                <Shield className="w-4 h-4 text-purple-400" />
                <span>Docente</span>
              </button>
            )}
          </nav>

          {/* Right User Stats & Profile */}
          <div className="flex items-center space-x-3">
            {/* XP & Streak Pills */}
            <div className="hidden sm:flex items-center space-x-2">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{progress.xp} XP</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold" title="Racha activa">
                <Flame className="w-3.5 h-3.5" />
                <span>{progress.streak} d</span>
              </div>
            </div>

            {/* User pill */}
            <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-800">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-inner ${
                user.esProfesor 
                  ? 'bg-gradient-to-tr from-purple-700 to-indigo-600 text-white border border-purple-400/40' 
                  : 'bg-gradient-to-tr from-sky-600 to-blue-700 text-white border border-sky-400/40'
              }`}>
                {user.nombre.charAt(0).toUpperCase()}
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-sm font-semibold text-slate-200 leading-tight truncate max-w-[140px]">
                  {user.nombre.split(' ')[0]} {user.nombre.split(' ')[1] || ''}
                </div>
                <div className="text-[11px] text-amber-400 font-medium flex items-center gap-1">
                  {user.esProfesor ? (
                    <>
                      <Shield className="w-3 h-3 text-purple-400 inline" />
                      <span>Profesor</span>
                    </>
                  ) : (
                    <>
                      <GraduationCap className="w-3 h-3 text-sky-400 inline" />
                      <span>{user.grupoNombre || `Grupo ${user.grupo}`}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              title="Cerrar sesión"
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Quick Bar */}
      <div className="flex md:hidden border-t border-slate-800/80 px-2 py-1.5 justify-around bg-slate-950/70 text-xs">
        <button onClick={onGoHome} className="flex flex-col items-center py-1 px-2 text-slate-300 hover:text-white">
          <BookOpen className="w-4 h-4 mb-0.5 text-sky-400" />
          <span>Semanas</span>
        </button>
        <button onClick={onOpenAlphabet} className="flex flex-col items-center py-1 px-2 text-slate-300 hover:text-white">
          <span className="font-serif font-bold text-amber-400 text-sm">Αα</span>
          <span>Alfabeto</span>
        </button>
        <button onClick={onOpenFlashcards} className="flex flex-col items-center py-1 px-2 text-slate-300 hover:text-white">
          <Sparkles className="w-4 h-4 mb-0.5 text-yellow-400" />
          <span>Vocabulario</span>
        </button>
        <button onClick={onOpenCertificate} className="flex flex-col items-center py-1 px-2 text-slate-300 hover:text-white">
          <Award className="w-4 h-4 mb-0.5 text-emerald-400" />
          <span>Progreso</span>
        </button>
        {user.esProfesor && (
          <button onClick={onOpenTeacherTools} className="flex flex-col items-center py-1 px-2 text-purple-300 hover:text-white">
            <Shield className="w-4 h-4 mb-0.5 text-purple-400" />
            <span>Docente</span>
          </button>
        )}
      </div>
    </header>
  );
};
