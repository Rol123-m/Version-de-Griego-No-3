import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { COURSE_CONFIG } from '../data/courseData';
import { X, Key, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

interface UnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UnlockModal: React.FC<UnlockModalProps> = ({ isOpen, onClose }) => {
  const { unlockWeekWithCode } = useProgress();

  const [code, setCode] = useState('');
  const [targetWeek, setTargetWeek] = useState(1);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!code.trim()) {
      setFeedback({ type: 'error', message: 'Por favor ingresa un código de desbloqueo.' });
      return;
    }

    const res = unlockWeekWithCode(code.trim(), targetWeek);
    if (res.success) {
      setFeedback({ type: 'success', message: res.message });
      setTimeout(() => {
        onClose();
        setCode('');
        setFeedback(null);
      }, 1500);
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold font-serif text-lg">Desbloquear Contenido</h3>
              <p className="text-xs text-slate-400">Ingresa el código proporcionado por tu profesor</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {feedback && (
            <div className={`p-4 rounded-xl flex items-start gap-2.5 text-xs font-medium ${
              feedback.type === 'success' 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}>
              {feedback.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Código de Desbloqueo:
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ejemplo: SEMANA_2, DESBLOQUEAR_TODO..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none uppercase font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Semana a desbloquear:
            </label>
            <select
              value={targetWeek}
              onChange={(e) => setTargetWeek(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              {Array.from({ length: COURSE_CONFIG.TOTAL_SEMANAS }, (_, i) => i + 1).map((w) => (
                <option key={w} value={w}>Semana {w}</option>
              ))}
            </select>
          </div>

          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Códigos válidos:</strong> <code className="bg-amber-200/60 px-1 py-0.5 rounded font-mono">SEMANA_2</code> para la semana 2, <code className="bg-amber-200/60 px-1 py-0.5 rounded font-mono">DESBLOQUEAR_TODO</code> o código de administrador.
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Desbloquear</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
