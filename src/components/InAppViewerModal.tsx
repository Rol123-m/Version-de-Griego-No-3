import React, { useState } from 'react';
import { X, Maximize2, Minimize2, ExternalLink, BookOpen, Gamepad2 } from 'lucide-react';

interface InAppViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  type: 'html' | 'pdf' | 'video' | 'game' | 'examen';
  onMarkComplete?: () => void;
  isCompleted?: boolean;
}

export const InAppViewerModal: React.FC<InAppViewerModalProps> = ({
  isOpen,
  onClose,
  title,
  url,
  type,
  onMarkComplete,
  isCompleted
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div 
        className={`bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-700/80 transition-all duration-300 ${
          isFullscreen 
            ? 'w-full h-full rounded-none' 
            : 'w-full max-w-5xl h-[88vh]'
        }`}
      >
        {/* Header Bar */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-sky-950 text-sky-400 flex items-center justify-center shrink-0 border border-sky-800/50">
              {type === 'game' ? <Gamepad2 className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-sm sm:text-base text-slate-100 truncate font-serif">
                {title}
              </h3>
              <p className="text-[11px] text-slate-400 truncate hidden sm:block">
                Visualizador interactivo integrado
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onMarkComplete && (
              <button
                onClick={onMarkComplete}
                className={`hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  isCompleted 
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                <span>{isCompleted ? '✓ Completado' : 'Marcar Completado'}</span>
              </button>
            )}

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Abrir en pestaña nueva"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={isFullscreen ? 'Reducir' : 'Pantalla completa'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content iframe */}
        <div className="flex-1 w-full h-full bg-slate-950 relative">
          <iframe
            src={url}
            title={title}
            className="w-full h-full border-0 bg-white"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>

      </div>
    </div>
  );
};
