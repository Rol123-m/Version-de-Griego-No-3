import React, { useState } from 'react';
import { GREEK_ALPHABET } from '../data/courseData';
import { X, Search } from 'lucide-react';

interface GreekAlphabetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GreekAlphabetModal: React.FC<GreekAlphabetModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredLetters = GREEK_ALPHABET.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.upper.includes(search) ||
    item.lower.includes(search) ||
    item.transliteration.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-sky-950 p-6 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-2xl text-amber-400">Α α ... Ω ω</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-semibold">
                24 Letras
              </span>
            </div>
            <h2 className="text-xl font-bold font-serif mt-1">
              Tabla Maestra del Alfabeto Griego Koiné
            </h2>
            <p className="text-xs text-slate-400">
              Pronunciación erasmiana y fonética para la lectura del Nuevo Testamento.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar por letra o nombre (ej: alfa, theta, omega, λ)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white rounded-xl text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Alphabet Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredLetters.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-sky-400 hover:shadow-md transition-all flex items-center gap-4"
              >
                {/* Letter glyph */}
                <div className="w-16 h-16 rounded-2xl bg-slate-900 text-amber-400 flex flex-col items-center justify-center font-serif text-2xl font-bold shrink-0 shadow-inner">
                  <span>{item.upper} {item.lower}</span>
                </div>

                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 font-serif text-base">{item.name}</span>
                    <span className="text-xs px-1.5 py-0.2 rounded bg-sky-100 text-sky-800 font-mono">
                      {item.transliteration}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600">
                    <strong className="text-slate-700">Sonido:</strong> {item.pronunciation}
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    <strong className="text-slate-700">Ejemplo:</strong> <span className="greek-text text-amber-700 font-medium">{item.example}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 cursor-pointer shadow-sm"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
