import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { ESTUDIANTES_POR_GRUPO, GRUPOS_CONFIG } from '../data/courseData';
import { GroupKey } from '../types';
import { X, Shield, Users, Unlock, CheckCircle2, Search } from 'lucide-react';

interface TeacherAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherAdminModal: React.FC<TeacherAdminModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { unlockAllWeeks } = useProgress();

  const [activeGroup, setActiveGroup] = useState<GroupKey>('ALFA');
  const [searchTerm, setSearchTerm] = useState('');
  const [unlockedNotice, setUnlockedNotice] = useState(false);

  if (!isOpen || !user?.esProfesor) return null;

  const students = ESTUDIANTES_POR_GRUPO[activeGroup] || [];
  const filteredStudents = students.filter(s =>
    s.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toString().includes(searchTerm) ||
    s.nacionalidad.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUnlockAll = () => {
    unlockAllWeeks();
    setUnlockedNotice(true);
    setTimeout(() => setUnlockedNotice(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-950 p-6 text-white flex items-center justify-between border-b border-purple-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-white">
                Panel de Control Docente
              </h2>
              <p className="text-xs text-purple-200">
                Profesor: {user.nombre} • {user.rol.replace('_', ' ').toUpperCase()}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-purple-300 hover:text-white hover:bg-purple-900/50 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="p-4 bg-purple-50/50 border-b border-purple-100 flex flex-wrap items-center justify-between gap-3">
          
          {/* Group Switcher */}
          <div className="flex rounded-xl bg-purple-100/60 p-1">
            {(['ALFA', 'BETA', 'GAMMA'] as GroupKey[]).map((g) => (
              <button
                key={g}
                onClick={() => setActiveGroup(g)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeGroup === g
                    ? 'bg-purple-800 text-white shadow-sm'
                    : 'text-purple-900 hover:bg-purple-200/50'
                }`}
              >
                {GRUPOS_CONFIG[g].nombre}
              </button>
            ))}
          </div>

          {/* Quick unlock button */}
          <button
            onClick={handleUnlockAll}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
          >
            <Unlock className="w-4 h-4 text-purple-200" />
            <span>Desbloquear las 30 Semanas</span>
          </button>
        </div>

        {unlockedNotice && (
          <div className="bg-emerald-50 text-emerald-800 px-6 py-2.5 text-xs font-bold flex items-center gap-2 border-b border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>¡Todas las 30 semanas han sido desbloqueadas en el entorno local!</span>
          </div>
        )}

        {/* Student Roster Search & Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar por nombre, país o ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
            <div className="text-xs text-slate-500 font-semibold">
              Total: {filteredStudents.length} estudiantes en {activeGroup}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Estudiante</th>
                  <th className="px-4 py-3">Nacionalidad</th>
                  <th className="px-4 py-3">Correo</th>
                  <th className="px-4 py-3">Teléfono</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-purple-50/20 transition-colors">
                    <td className="px-4 py-2.5 font-bold text-slate-900 font-mono">#{st.id}</td>
                    <td className="px-4 py-2.5 font-semibold text-slate-900">{st.nombre}</td>
                    <td className="px-4 py-2.5">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px]">
                        {st.nacionalidad}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-slate-500 font-mono text-[11px]">{st.email}</td>
                    <td className="px-4 py-2.5 text-slate-500 font-mono text-[11px]">{st.telefono}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
};
