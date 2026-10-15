import React, { useState } from 'react';
import { assetUrl } from '../utils/assetUrl';
import { useAuth } from '../context/AuthContext';
import { GroupKey } from '../types';
import { COURSE_CONFIG, GRUPOS_CONFIG, ESTUDIANTES_POR_GRUPO, PROFESORES } from '../data/courseData';
import { Users, Lock, Key, LogIn, GraduationCap, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

export const Login: React.FC = () => {
  const { loginStudent, loginTeacher, loginDemo } = useAuth();

  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<GroupKey | ''>('');
  const [selectedStudentId, setSelectedStudentId] = useState<number | ''>('');
  const [studentIdInput, setStudentIdInput] = useState('');
  const [studentPassword, setStudentPassword] = useState('');

  const [selectedTeacherId, setSelectedTeacherId] = useState<number | ''>('');
  const [teacherIdInput, setTeacherIdInput] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedGroup) {
      setError('Por favor selecciona tu grupo (Alfa, Beta o Gamma).');
      return;
    }
    if (!selectedStudentId) {
      setError('Por favor selecciona tu nombre en la lista.');
      return;
    }

    const res = loginStudent(selectedGroup, Number(selectedStudentId), studentIdInput, studentPassword);
    if (!res.success) {
      setError(res.error || 'No se pudo iniciar sesión.');
    }
  };

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedTeacherId) {
      setError('Por favor selecciona tu nombre de profesor.');
      return;
    }

    const res = loginTeacher(Number(selectedTeacherId), teacherIdInput, teacherPassword);
    if (!res.success) {
      setError(res.error || 'No se pudo iniciar sesión como profesor.');
    }
  };

  const currentStudents = selectedGroup ? ESTUDIANTES_POR_GRUPO[selectedGroup] || [] : [];
  const filteredStudents = currentStudents.filter(s => 
    s.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500 blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-amber-500 blur-3xl" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Ministry Crest / Logo */}
        <div className="flex justify-center mb-4">
          <div className="relative group">
            <img
              src={assetUrl('/logo.jpeg')}
              alt="Ministerio Vivos para Servir"
              className="w-24 h-24 rounded-full object-cover border-4 border-amber-400 shadow-2xl transition-transform transform group-hover:scale-105"
            />
            <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 rounded-full p-1.5 shadow-md border-2 border-slate-900">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
        </div>

        <h2 className="text-center text-3xl font-extrabold text-white font-serif tracking-tight">
          Curso de Griego Koiné
        </h2>
        <p className="mt-1 text-center text-sm font-medium text-amber-300">
          {COURSE_CONFIG.MINISTERIO} • Versión 2.0
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        <div className="bg-white/95 backdrop-blur-md py-8 px-6 sm:px-10 shadow-2xl rounded-2xl border border-white/20">
          
          {/* Role Toggle Tabs */}
          <div className="flex rounded-xl bg-slate-100 p-1 mb-6 border border-slate-200">
            <button
              type="button"
              onClick={() => { setIsTeacherMode(false); setError(null); }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
                !isTeacherMode 
                  ? 'bg-sky-700 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Estudiante</span>
            </button>
            <button
              type="button"
              onClick={() => { setIsTeacherMode(true); setError(null); }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
                isTeacherMode 
                  ? 'bg-purple-800 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Profesor / Facilitador</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {/* Student Form */}
          {!isTeacherMode ? (
            <form onSubmit={handleStudentSubmit} className="space-y-5">
              
              {/* Group selection */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-sky-600" />
                  <span>1. Selecciona tu grupo:</span>
                </label>
                <select
                  value={selectedGroup}
                  onChange={(e) => {
                    setSelectedGroup(e.target.value as GroupKey);
                    setSelectedStudentId('');
                    setError(null);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors shadow-sm"
                >
                  <option value="">-- Elige tu grupo asignado --</option>
                  <option value="ALFA">{GRUPOS_CONFIG.ALFA.nombre} ({ESTUDIANTES_POR_GRUPO.ALFA.length} estudiantes)</option>
                  <option value="BETA">{GRUPOS_CONFIG.BETA.nombre} ({ESTUDIANTES_POR_GRUPO.BETA.length} estudiantes)</option>
                  <option value="GAMMA">{GRUPOS_CONFIG.GAMMA.nombre} ({ESTUDIANTES_POR_GRUPO.GAMMA.length} estudiantes)</option>
                </select>
              </div>

              {selectedGroup && (
                <>
                  {/* Student selector */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-sky-600" />
                        <span>2. Selecciona tu nombre:</span>
                      </span>
                      {currentStudents.length > 5 && (
                        <input
                          type="text"
                          placeholder="Buscar nombre..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="text-xs px-2 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                      )}
                    </label>
                    <select
                      value={selectedStudentId}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSelectedStudentId(val ? Number(val) : '');
                        if (val) {
                          setStudentIdInput(val); // Pre-fill numeric ID for convenience
                        }
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors shadow-sm"
                    >
                      <option value="">-- Elige tu nombre de la lista --</option>
                      {filteredStudents.map((student) => (
                        <option key={student.id} value={student.id}>
                          #{student.id} — {student.nombre} ({student.nacionalidad})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* ID Input */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Key className="w-4 h-4 text-sky-600" />
                      <span>3. ID numérico asignado:</span>
                    </label>
                    <input
                      type="text"
                      value={studentIdInput}
                      onChange={(e) => setStudentIdInput(e.target.value)}
                      placeholder="Ejemplo: 1, 25, 48..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors shadow-sm"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      Tu número de matrícula en el curso.
                    </p>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-sky-600" />
                      <span>4. Contraseña del curso:</span>
                    </label>
                    <input
                      type="password"
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)}
                      placeholder="Contraseña compartida (griego2026)"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl text-white font-bold bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Ingresar al Curso</span>
                  </button>
                </>
              )}
            </form>
          ) : (
            /* Teacher Form */
            <form onSubmit={handleTeacherSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-purple-700" />
                  <span>1. Selecciona tu nombre de profesor / facilitador:</span>
                </label>
                <select
                  value={selectedTeacherId}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedTeacherId(val ? Number(val) : '');
                    if (val) setTeacherIdInput(val);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors shadow-sm"
                >
                  <option value="">-- Selecciona profesor --</option>
                  {PROFESORES.map((prof) => (
                    <option key={prof.id} value={prof.id}>
                      #{prof.id} — {prof.nombre} ({prof.rol.replace('_', ' ')})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-purple-700" />
                  <span>2. ID de profesor:</span>
                </label>
                <input
                  type="text"
                  value={teacherIdInput}
                  onChange={(e) => setTeacherIdInput(e.target.value)}
                  placeholder="ID de profesor (100 - 109)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-purple-700" />
                  <span>3. Contraseña docente o administrativa:</span>
                </label>
                <input
                  type="password"
                  value={teacherPassword}
                  onChange={(e) => setTeacherPassword(e.target.value)}
                  placeholder="ADMIN2026 o griego2026"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-white font-bold bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                <LogIn className="w-5 h-5" />
                <span>Ingresar como Profesor</span>
              </button>
            </form>
          )}

          {/* Fast Test / Demo Access Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-2 justify-center mb-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Acceso Rápido de Prueba (1 Clic)
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <button
                type="button"
                onClick={() => loginDemo('student_alfa')}
                className="px-2.5 py-2 text-xs font-semibold rounded-lg bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200 transition-colors text-center"
              >
                Estudiante Alfa
              </button>
              <button
                type="button"
                onClick={() => loginDemo('student_beta')}
                className="px-2.5 py-2 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 transition-colors text-center"
              >
                Estudiante Beta
              </button>
              <button
                type="button"
                onClick={() => loginDemo('student_gamma')}
                className="px-2.5 py-2 text-xs font-semibold rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors text-center"
              >
                Estudiante Gamma
              </button>
              <button
                type="button"
                onClick={() => loginDemo('teacher')}
                className="px-2.5 py-2 text-xs font-semibold rounded-lg bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200 transition-colors text-center"
              >
                Prof. Titular
              </button>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <p className="mt-6 text-center text-xs text-slate-400">
          ¿Problemas con el acceso? Contacta a tu profesor asignado o escribe a {COURSE_CONFIG.EMAIL}
        </p>
      </div>

    </div>
  );
};
