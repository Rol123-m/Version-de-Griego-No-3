import React from 'react';
import { assetUrl } from '../utils/assetUrl';
import { COURSE_CONFIG } from '../data/courseData';
import { Mail, Phone, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Ministry */}
          <div className="flex items-center space-x-3.5">
            <img 
              src={assetUrl('/logo.jpeg')} 
              alt="Ministerio Vivos para Servir" 
              className="w-10 h-10 rounded-full object-cover border border-amber-400/60 shadow-sm"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <div className="font-bold text-slate-200 text-sm font-serif">
                {COURSE_CONFIG.MINISTERIO}
              </div>
              <div className="text-xs text-slate-400">
                {COURSE_CONFIG.TITULO_CURSO} © 2026
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
            <a 
              href={`mailto:${COURSE_CONFIG.EMAIL}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>{COURSE_CONFIG.EMAIL}</span>
            </a>

            <a 
              href={`tel:${COURSE_CONFIG.TELEFONO}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{COURSE_CONFIG.TELEFONO}</span>
            </a>
          </div>

          {/* Doxology tag */}
          <div className="text-xs text-slate-400 text-center md:text-right font-serif italic">
            <span>Soli Deo Gloria</span> • <span>Para la edificación del cuerpo de Cristo</span>
          </div>

        </div>
      </div>
    </footer>
  );
};
