import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { COURSE_CONFIG, EXAMENES_POR_GRUPO, SEMANAS_DATA, CORE_VOCABULARY } from '../data/courseData';
import { ResourceItem, GameItem, VocabWord } from '../types';
import { 
  ArrowLeft, ArrowRight, BookOpen, Gamepad2, 
  ExternalLink, CheckCircle2, Circle, Eye, Sparkles, 
  GraduationCap, ClipboardCheck, AlertCircle, RefreshCw
} from 'lucide-react';

interface WeekViewProps {
  weekNumber: number;
  onBackToDashboard: () => void;
  onNavigateWeek: (weekNumber: number) => void;
  onOpenInAppViewer: (title: string, url: string, type: 'html' | 'pdf' | 'video' | 'game' | 'examen') => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  weekNumber,
  onBackToDashboard,
  onNavigateWeek,
  onOpenInAppViewer
}) => {
  const { user } = useAuth();
  const { 
    isResourceCompleted, 
    isGameCompleted, 
    isExamCompleted, 
    isWeekCompleted,
    toggleResource, 
    toggleGame, 
    completeExam, 
    completeWeek, 
    getWeekProgressPercent 
  } = useProgress();

  const [activeTab, setActiveTab] = useState<'study' | 'games' | 'vocab' | 'exam'>('study');
  const [examScoreInput, setExamScoreInput] = useState<string>('');
  const [showScoreModal, setShowScoreModal] = useState<boolean>(false);
  const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const weekData = SEMANAS_DATA[weekNumber] || {
    numero: weekNumber,
    titulo: `Semana ${weekNumber}`,
    tema: 'Contenido y gramática de la semana',
    recursos: [],
    juegos: []
  };

  const progressPercent = getWeekProgressPercent(weekNumber);
  const isCompleted = isWeekCompleted(weekNumber);

  // Group-specific exam URL
  const userGroup = user?.grupo || 'ALFA';
  const examUrl = EXAMENES_POR_GRUPO[userGroup]?.[weekNumber] || '';
  const hasExam = Boolean(examUrl && !examUrl.includes('EJEMPLO'));

  // Vocabulary for this week
  const weekVocab: VocabWord[] = CORE_VOCABULARY.filter(v => v.week === weekNumber);
  const activeVocabWord = weekVocab.length > 0 ? weekVocab[currentVocabIndex % weekVocab.length] : null;

  const handleNextVocab = () => {
    setIsFlipped(false);
    setCurrentVocabIndex(prev => (prev + 1) % weekVocab.length);
  };

  const handlePrevVocab = () => {
    setIsFlipped(false);
    setCurrentVocabIndex(prev => (prev - 1 + weekVocab.length) % weekVocab.length);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-sm border border-slate-200 shadow-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Plan</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            disabled={weekNumber <= 1}
            onClick={() => onNavigateWeek(weekNumber - 1)}
            className="p-2 rounded-xl bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            title="Semana anterior"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-serif font-bold text-sm">
            Semana {weekNumber} de {COURSE_CONFIG.TOTAL_SEMANAS}
          </span>

          <button
            disabled={weekNumber >= COURSE_CONFIG.TOTAL_SEMANAS}
            onClick={() => onNavigateWeek(weekNumber + 1)}
            className="p-2 rounded-xl bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            title="Semana siguiente"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Week Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 font-bold flex items-center justify-center font-serif text-sm">
                #{weekNumber}
              </span>
              <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                Unidad Semanal
              </span>
              {!user?.esProfesor && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                  Grupo {userGroup}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 tracking-tight">
              {weekData.titulo}
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              {weekData.tema}
            </p>
          </div>

          {/* Progress gauge */}
          <div className="shrink-0 flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-right">
              <div className="text-2xl font-black text-slate-900">{progressPercent}%</div>
              <div className="text-xs text-slate-500 font-medium">Progreso semanal</div>
            </div>
            {isCompleted ? (
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                {progressPercent}%
              </div>
            )}
          </div>

        </div>

        {/* Big Progress Bar */}
        <div className="mt-6 w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 relative ${
              isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-r from-sky-500 to-blue-600'
            }`}
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-shimmer" />
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('study')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'study'
              ? 'bg-sky-700 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Materiales ({weekData.recursos.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('games')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'games'
              ? 'bg-purple-700 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Juegos ({weekData.juegos.length})</span>
        </button>

        {weekVocab.length > 0 && (
          <button
            onClick={() => setActiveTab('vocab')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'vocab'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Vocabulario ({weekVocab.length})</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('exam')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'exam'
              ? 'bg-emerald-700 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ClipboardCheck className="w-4 h-4" />
          <span>Evaluación Semanal</span>
          {isExamCompleted(weekNumber) && (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
          )}
        </button>
      </div>

      {/* Tab: Study Resources */}
      {activeTab === 'study' && (
        <div className="space-y-4">
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 text-xs sm:text-sm text-sky-900 flex items-start gap-3">
            <GraduationCap className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Objetivo de la semana:</strong> Revisa cada uno de los temas y lecciones interactivas. Al terminar de leerlas, márcalas como completadas para registrar tu avance en la plataforma.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weekData.recursos.map((recurso: ResourceItem, index: number) => {
              const completed = isResourceCompleted(weekNumber, index);

              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-5 border transition-all shadow-sm flex flex-col justify-between ${
                    completed ? 'border-emerald-200 bg-emerald-50/10' : 'border-slate-200 hover:border-sky-300'
                  }`}
                >
                  <div className="flex items-start gap-3.5 mb-4">
                    <span className="text-2xl shrink-0 p-2 rounded-xl bg-slate-50 border border-slate-100">
                      {recurso.icono || '📄'}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                          {recurso.tipo.toUpperCase()}
                        </span>
                        {completed && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Completado</span>
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-base text-slate-900 font-serif leading-snug">
                        {recurso.titulo}
                      </h4>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {/* Toggle Complete Checkbox */}
                    <button
                      onClick={() => toggleResource(weekNumber, index)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        completed
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {completed ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Circle className="w-4 h-4 text-slate-400" />}
                      <span>{completed ? 'Completado (+50 XP)' : 'Marcar leído'}</span>
                    </button>

                    {/* View Options */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onOpenInAppViewer(recurso.titulo, recurso.url, recurso.tipo)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs shadow-sm transition-colors cursor-pointer"
                        title="Abrir dentro de la aplicación"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver Lección</span>
                      </button>

                      <a
                        href={recurso.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        title="Abrir en nueva pestaña"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: Games */}
      {activeTab === 'games' && (
        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-xs sm:text-sm text-purple-900 flex items-start gap-3">
            <Gamepad2 className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Práctica Gamificada:</strong> Refuerza tu memoria y fluidez con ejercicios interactivos, emparejamiento de vocabulario y rompecabezas gramaticales.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weekData.juegos.map((juego: GameItem, index: number) => {
              const completed = isGameCompleted(weekNumber, index);
              const isRecommended = juego.nota?.toLowerCase().includes('recomendado');

              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-5 border transition-all shadow-sm flex flex-col justify-between ${
                    completed ? 'border-emerald-200 bg-emerald-50/10' : 'border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-start gap-3.5 mb-4">
                    <span className="text-2xl shrink-0 p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-100">
                      {juego.icono || '🎮'}
                    </span>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {isRecommended && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300">
                            Recomendado
                          </span>
                        )}
                        {completed && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Completado</span>
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-base text-slate-900 font-serif leading-snug">
                        {juego.titulo}
                      </h4>
                      {juego.nota && (
                        <p className="text-xs text-slate-500">
                          {juego.nota}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => toggleGame(weekNumber, index)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        completed
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {completed ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Circle className="w-4 h-4 text-slate-400" />}
                      <span>{completed ? 'Jugado (+75 XP)' : 'Marcar jugado'}</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onOpenInAppViewer(juego.titulo, juego.url, 'game')}
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs shadow-sm transition-colors cursor-pointer"
                      >
                        <Gamepad2 className="w-3.5 h-3.5" />
                        <span>Jugar In-App</span>
                      </button>

                      <a
                        href={juego.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        title="Abrir en nueva pestaña"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: Weekly Vocabulary Flashcards */}
      {activeTab === 'vocab' && activeVocabWord && (
        <div className="max-w-xl mx-auto space-y-6 py-4">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold font-serif text-slate-900">
              Vocabulario Esencial - Semana {weekNumber}
            </h3>
            <p className="text-xs text-slate-500">
              Palabra {currentVocabIndex + 1} de {weekVocab.length} • Haz clic en la tarjeta para voltearla
            </p>
          </div>

          {/* Flashcard Component */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-64 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-white shadow-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-[1.02] border-2 border-amber-400/40 relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
              {isFlipped ? 'Español' : 'Griego Koiné'}
            </div>

            {!isFlipped ? (
              <div className="text-center space-y-3">
                <span className="greek-text text-4xl sm:text-5xl font-bold text-amber-400 tracking-wide drop-shadow">
                  {activeVocabWord.greek}
                </span>
                {activeVocabWord.transliteration && (
                  <p className="text-sm text-slate-300 italic">
                    [{activeVocabWord.transliteration}]
                  </p>
                )}
                <p className="text-xs text-slate-400 mt-4">
                  Toca para revelar el significado
                </p>
              </div>
            ) : (
              <div className="text-center space-y-3 animate-fadeIn">
                <span className="text-2xl sm:text-3xl font-bold text-slate-100 font-serif">
                  {activeVocabWord.spanish}
                </span>
                <p className="greek-text text-amber-400/80 text-lg">
                  {activeVocabWord.greek}
                </p>
                <p className="text-xs text-slate-400 mt-4">
                  Toca para volver al texto griego
                </p>
              </div>
            )}
          </div>

          {/* Flashcard Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevVocab}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-sm hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-slate-600" />
              <span>Girar</span>
            </button>

            <button
              onClick={handleNextVocab}
              className="px-4 py-2.5 rounded-xl bg-sky-700 text-white font-bold text-sm hover:bg-sky-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Siguiente</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab: Weekly Exam */}
      {activeTab === 'exam' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ClipboardCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900">
                  Evaluación Semanal — Semana {weekNumber}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Examen oficial en Google Forms correspondiente al {user?.grupoNombre || `Grupo ${userGroup}`}.
                </p>
              </div>
            </div>

            {user?.esProfesor ? (
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl text-purple-900 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Vista de Profesor:</strong> Los alumnos de tu grupo responderán el examen a través del enlace de Google Forms asignado a su sección. Puedes acceder a las plantillas o revisar envíos en los formularios oficiales.
                </div>
              </div>
            ) : null}

            {hasExam ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Formulario Asignado:
                    </div>
                    <div className="text-sm font-semibold text-sky-800">
                      Examen Semana {weekNumber} ({userGroup})
                    </div>
                  </div>

                  <a
                    href={examUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Abrir Examen en Google Forms</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-slate-600">
                    {isExamCompleted(weekNumber) ? (
                      <span className="inline-flex items-center gap-1.5 font-bold text-emerald-600">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>¡Examen registrado y enviado! (+150 XP)</span>
                      </span>
                    ) : (
                      <span>¿Ya respondiste el formulario de examen?</span>
                    )}
                  </div>

                  <button
                    onClick={() => setShowScoreModal(true)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                      isExamCompleted(weekNumber)
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                    }`}
                  >
                    {isExamCompleted(weekNumber) ? 'Actualizar Nota / Estado' : 'Confirmar Envío de Examen'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm">
                No hay enlace de formulario asignado para esta semana específica. Por favor consulta con tu profesor o facilitador.
              </div>
            )}

          </div>
        </div>
      )}

      {/* Complete Week Celebration Action */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-sky-800/40">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-amber-400 font-bold text-sm flex items-center justify-center sm:justify-start gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Culminación del Módulo Semanal</span>
          </div>
          <h4 className="text-lg font-bold font-serif">
            {isCompleted ? '¡Has completado esta semana exitosamente!' : '¿Terminaste todas las actividades?'}
          </h4>
          <p className="text-xs text-slate-400">
            {isCompleted ? 'Excelente trabajo en el idioma original del Nuevo Testamento.' : 'Gana +300 XP y desbloquea la siguiente semana.'}
          </p>
        </div>

        <button
          onClick={() => completeWeek(weekNumber)}
          className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-lg flex items-center gap-2 ${
            isCompleted
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-600 hover:to-amber-700'
          }`}
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>{isCompleted ? 'Semana Completada ✓' : 'Marcar Semana Completada (+300 XP)'}</span>
        </button>
      </div>

      {/* Score Modal */}
      {showScoreModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold font-serif text-slate-900">
              Registrar Examen — Semana {weekNumber}
            </h3>
            <p className="text-xs text-slate-500">
              Indica tu calificación si ya la conoces (opcional) para archivar tu registro en la libreta de calificaciones.
            </p>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Puntaje obtenido (Opcional, ej: 95 o 100):
              </label>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="100"
                value={examScoreInput}
                onChange={(e) => setExamScoreInput(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowScoreModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  completeExam(weekNumber, examScoreInput ? Number(examScoreInput) : undefined);
                  setShowScoreModal(false);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-md"
              >
                Guardar y Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
