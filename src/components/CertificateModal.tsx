import React from 'react';
import { assetUrl } from '../utils/assetUrl';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { COURSE_CONFIG } from '../data/courseData';
import { X, Award, Printer, CheckCircle2, Calendar, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { progress } = useProgress();

  if (!isOpen || !user) return null;

  const totalWeeks = COURSE_CONFIG.TOTAL_SEMANAS;
  const completedWeeks = progress.semanasCompletadas.length;
  const percent = Math.round((completedWeeks / totalWeeks) * 100);
  const isFullGraduation = completedWeeks >= totalWeeks;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-900 px-6 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-serif font-bold text-sm">Certificado Académico de Progreso</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-amber-50/30 flex items-center justify-center">
          
          <div className="w-full bg-white rounded-2xl p-8 sm:p-12 border-8 border-double border-amber-600/40 shadow-xl relative overflow-hidden text-center space-y-6">
            
            {/* Watermark Crest */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <span className="font-serif text-9xl font-black">Ω</span>
            </div>

            {/* Ministry Header */}
            <div className="space-y-1">
              <div className="flex justify-center mb-2">
                <img
                  src={assetUrl('/logo.jpeg')}
                  alt="Ministerio Vivos para Servir"
                  className="w-16 h-16 rounded-full object-cover border-2 border-amber-500 shadow-sm"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-amber-900">
                {COURSE_CONFIG.MINISTERIO}
              </h3>
              <p className="text-xs text-slate-500 font-serif italic">
                División de Estudios Bíblicos e Idiomas Bíblicos
              </p>
            </div>

            {/* Main Title */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-slate-900 tracking-tight">
                {isFullGraduation ? 'DIPLOMA DE GRADUACIÓN' : 'CERTIFICADO DE AVANCE ACADÉMICO'}
              </h1>
              <p className="text-sm text-slate-600">
                El presente documento certifica que
              </p>
            </div>

            {/* Student Name */}
            <div className="py-2 border-b-2 border-amber-600/30 max-w-lg mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-sky-950 font-serif">
                {user.nombre}
              </h2>
              {user.nacionalidad && (
                <p className="text-xs text-slate-500 mt-1 font-sans">
                  {user.nacionalidad} • {user.grupoNombre || `Grupo ${user.grupo}`}
                </p>
              )}
            </div>

            {/* Achievement text */}
            <div className="max-w-xl mx-auto space-y-2 text-sm text-slate-700 leading-relaxed font-serif">
              <p>
                Ha cursado con dedicación el <strong>{COURSE_CONFIG.TITULO_CURSO}</strong>, completando satisfactoriamente <strong>{completedWeeks} de {totalWeeks} semanas</strong> ({percent}% del plan de estudios).
              </p>
              <p className="text-xs text-slate-500 font-sans">
                Lecciones estudiadas: {progress.recursosCompletados.length} • Ejercicios interactivos: {progress.juegosCompletados.length} • Puntos de Maestría: {progress.xp} XP
              </p>
            </div>

            {/* Greek scripture blessing */}
            <div className="pt-2">
              <p className="greek-text text-amber-800 text-sm font-semibold italic">
                «Ἡ χάρις τοῦ κυρίου Ἰησοῦ Χριστοῦ μετὰ τοῦ πνεύματος ὑμῶν»
              </p>
              <p className="text-[11px] text-slate-400 font-sans">
                "La gracia del Señor Jesucristo sea con vuestro espíritu" — Gálatas 6:18
              </p>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-6 grid grid-cols-2 gap-8 text-left border-t border-slate-200 text-xs text-slate-600">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-purple-700" />
                  <span>Cuerpo Docente</span>
                </div>
                <p className="text-slate-500">Rolando Y. Desdín García</p>
                <p className="text-[10px] text-slate-400">Profesor Titular de Griego</p>
              </div>

              <div className="space-y-1 text-right">
                <div className="flex items-center justify-end gap-1.5 font-bold text-slate-800">
                  <Calendar className="w-4 h-4 text-sky-700" />
                  <span>Fecha de Emisión</span>
                </div>
                <p className="text-slate-500">
                  {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="text-[10px] text-emerald-600 font-bold flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Registro Digital Verificado</span>
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
