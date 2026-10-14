import React, { useState, useMemo } from 'react';
import { CORE_VOCABULARY } from '../data/courseData';
import { VocabWord } from '../types';
import { X, Sparkles, RefreshCw, ArrowLeft, ArrowRight, Shuffle, CheckCircle, HelpCircle } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface FlashcardTrainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlashcardTrainerModal: React.FC<FlashcardTrainerModalProps> = ({ isOpen, onClose }) => {
  const { triggerConfetti } = useProgress();

  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState<'cards' | 'quiz'>('cards');

  // Quiz state
  const [quizScore, setQuizScore] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Vocabulary list
  const activeVocabList: VocabWord[] = useMemo(() => {
    if (selectedWeek === 'all') return CORE_VOCABULARY;
    return CORE_VOCABULARY.filter(v => v.week === selectedWeek);
  }, [selectedWeek]);

  if (!isOpen) return null;

  const currentWord = activeVocabList[currentIndex % (activeVocabList.length || 1)];

  // Generate quiz options
  const currentQuizWord = activeVocabList[quizStep % (activeVocabList.length || 1)];
  const quizOptions = useMemo(() => {
    if (!currentQuizWord) return [];
    const others = CORE_VOCABULARY.filter(w => w.spanish !== currentQuizWord.spanish);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    const combined = [currentQuizWord, ...shuffledOthers];
    return combined.sort(() => 0.5 - Math.random());
  }, [currentQuizWord]);

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % activeVocabList.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + activeVocabList.length) % activeVocabList.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * activeVocabList.length));
  };

  const handleAnswerClick = (optionSpanish: string) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(optionSpanish);
    setIsAnswerChecked(true);

    if (optionSpanish === currentQuizWord.spanish) {
      setQuizScore(prev => prev + 1);
      triggerConfetti();
    }
  };

  const handleNextQuizQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setQuizStep(prev => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-sky-950 p-5 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif text-white">
                Entrenador de Vocabulario Koiné
              </h2>
              <p className="text-xs text-slate-400">
                Memoriza términos fundamentales del Nuevo Testamento
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls Bar: Mode & Filter */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          {/* Mode Switcher */}
          <div className="flex rounded-xl bg-slate-200 p-1">
            <button
              onClick={() => setMode('cards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'cards' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tarjetas de Memoria
            </button>
            <button
              onClick={() => { setMode('quiz'); setQuizStep(0); setQuizScore(0); setIsAnswerChecked(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'quiz' ? 'bg-sky-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Test Rápido
            </button>
          </div>

          {/* Week Filter */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-600">Semana:</label>
            <select
              value={selectedWeek}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedWeek(val === 'all' ? 'all' : Number(val));
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className="text-xs font-semibold px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">Todas las semanas ({CORE_VOCABULARY.length})</option>
              <option value="1">Semana 1 - Alfabeto y Básico</option>
              <option value="2">Semana 2 - Sustantivos</option>
              <option value="3">Semana 3 - Artículos</option>
              <option value="4">Semana 4 - Preposiciones</option>
              <option value="5">Semana 5 - Adjetivos</option>
              <option value="10">Semana 10 - Verbos Presentes</option>
            </select>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-center items-center">
          
          {mode === 'cards' && currentWord ? (
            <div className="w-full max-w-md space-y-6">
              
              <div className="text-center text-xs font-semibold text-slate-500">
                Tarjeta {currentIndex + 1} de {activeVocabList.length} • Semana {currentWord.week}
              </div>

              {/* 3D-like flip card */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full h-72 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-white shadow-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all transform hover:scale-[1.02] border-2 border-amber-400/40 relative select-none"
              >
                <div className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full bg-slate-800/80 text-amber-300 border border-slate-700">
                  {isFlipped ? 'Español' : 'Griego Koiné'}
                </div>

                {!isFlipped ? (
                  <div className="text-center space-y-3">
                    <span className="greek-text text-5xl font-extrabold text-amber-400 drop-shadow-md">
                      {currentWord.greek}
                    </span>
                    {currentWord.transliteration && (
                      <p className="text-sm text-slate-300 font-sans italic">
                        [{currentWord.transliteration}]
                      </p>
                    )}
                    <p className="text-xs text-slate-400 pt-4 flex items-center justify-center gap-1">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                      <span>Toca para ver la traducción</span>
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-3 animate-fadeIn">
                    <span className="text-3xl font-extrabold text-slate-100 font-serif">
                      {currentWord.spanish}
                    </span>
                    <p className="greek-text text-amber-400 text-xl font-medium">
                      {currentWord.greek}
                    </p>
                    <p className="text-xs text-slate-400 pt-4">
                      Toca para volver a la palabra griega
                    </p>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={handlePrevCard}
                  className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

                <button
                  onClick={handleShuffle}
                  className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                  title="Mezclar tarjetas"
                >
                  <Shuffle className="w-4 h-4" />
                </button>

                <button
                  onClick={handleNextCard}
                  className="px-5 py-2.5 rounded-xl bg-sky-700 text-white font-bold text-sm hover:bg-sky-800 transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>Siguiente</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : mode === 'quiz' && currentQuizWord ? (
            /* Quiz Mode */
            <div className="w-full max-w-md space-y-5">
              
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Pregunta {quizStep + 1}</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Aciertos: {quizScore}
                </span>
              </div>

              {/* Question Card */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white text-center space-y-2 border border-slate-800 shadow-md">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  ¿Cuál es el significado de esta palabra?
                </p>
                <div className="greek-text text-4xl font-extrabold text-amber-400">
                  {currentQuizWord.greek}
                </div>
                {currentQuizWord.transliteration && (
                  <p className="text-xs text-slate-400 italic">
                    [{currentQuizWord.transliteration}]
                  </p>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {quizOptions.map((opt, idx) => {
                  const isSelected = selectedAnswer === opt.spanish;
                  const isCorrect = opt.spanish === currentQuizWord.spanish;

                  let btnStyle = "bg-white border-slate-200 hover:border-sky-400 text-slate-800";
                  if (isAnswerChecked) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                    } else if (isSelected) {
                      btnStyle = "bg-rose-50 border-rose-500 text-rose-900 font-bold";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerChecked}
                      onClick={() => handleAnswerClick(opt.spanish)}
                      className={`w-full p-3.5 rounded-xl border text-left text-sm font-medium transition-all shadow-sm flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt.spanish}</span>
                      {isAnswerChecked && isCorrect && (
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Next */}
              {isAnswerChecked && (
                <div className="pt-2 animate-fadeIn">
                  <button
                    onClick={handleNextQuizQuestion}
                    className="w-full py-3 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Siguiente Pregunta</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              No hay palabras disponibles para esta selección.
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
