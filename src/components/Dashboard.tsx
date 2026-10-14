import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { COURSE_CONFIG, GRUPOS_CONFIG, SEMANAS_DATA } from '../data/courseData';
import { 
  BookOpen, CheckCircle, Lock, Unlock, Search, 
  Calendar, Key, ArrowRight, BookMarked, GraduationCap, 
  Sparkles, Award
} from 'lucide-react';

interface DashboardProps {
  onSelectWeek: (weekNumber: number) => void;
  onOpenUnlockModal: () => void;
  onOpenCertificate: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onSelectWeek,
  onOpenUnlockModal,
  onOpenCertificate
}) => {
  const { user } = useAuth();
  const { 
    progress, 
    semanaActualGlobal, 
    isWeekUnlocked, 
    isWeekCompleted, 
    getWeekProgressPercent, 
    getUnlockDateForWeek 
  } = useProgress();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unlocked' | 'completed' | 'locked'>('all');

  // Stats calculation
  const totalWeeks = COURSE_CONFIG.TOTAL_SEMANAS;
  const completedWeeksCount = progress.semanasCompletadas.length;
  const completedResourcesCount = progress.recursosCompletados.length;
  const completedGamesCount = progress.juegosCompletados.length;
  const completedExamsCount = Object.keys(progress.examenesCompletados).length;
  const overallPercentage = Math.round((completedWeeksCount / totalWeeks) * 100);

  // Suggested next week to study
  const currentActiveWeek = useMemo(() => {
    for (let w = 1; w <= totalWeeks; w++) {
      if (isWeekUnlocked(w) && !isWeekCompleted(w)) {
        return w;
      }
    }
    return 1;
  }, [totalWeeks, isWeekUnlocked, isWeekCompleted]);

  // Filtered weeks list
  const filteredWeeks = useMemo(() => {
    const list = Array.from({ length: totalWeeks }, (_, i) => i + 1);
    return list.filter(weekNum => {
      const data = SEMANAS_DATA[weekNum];
      const title = data?.titulo || `Semana ${weekNum}`;
      const topic = data?.tema || '';

      // Text search
      const matchesSearch = 
        title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        weekNum.toString() === searchTerm.trim();

      if (!matchesSearch) return false;

      // Status filter
      const unlocked = isWeekUnlocked(weekNum);
      const completed = isWeekCompleted(weekNum);

      if (filterType === 'unlocked') return unlocked && !completed;
      if (filterType === 'completed') return completed;
      if (filterType === 'locked') return !unlocked;

      return true;
    });
  }, [totalWeeks, searchTerm, filterType, isWeekUnlocked, isWeekCompleted]);

  const groupInfo = user?.grupo ? GRUPOS_CONFIG[user.grupo] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-sky-950 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-sky-800/40">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Semestre Académico 2026</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight text-white">
              ¡Bienvenido, {user?.nombre}!
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <GraduationCap className="w-4 h-4 text-sky-400" />
                {user?.esProfesor ? (
                  <span className="text-purple-300 font-semibold">{user.rol.replace('_', ' ').toUpperCase()}</span>
                ) : (
                  <span>{user?.grupoNombre || `Grupo ${user?.grupo}`}</span>
                )}
              </span>
              {groupInfo?.profesorTitular && !user?.esProfesor && (
                <span className="text-xs bg-slate-800/80 px-2.5 py-1 rounded-md text-slate-400 border border-slate-700">
                  Profesor Titular: {groupInfo.profesorTitular}
                </span>
              )}
              {user?.id && !user.esProfesor && (
                <span className="text-xs bg-slate-800/80 px-2 py-1 rounded-md text-slate-400">
                  ID: #{user.id}
                </span>
              )}
            </div>

            {/* Greek Biblical Verse */}
            <p className="greek-text text-amber-200/90 text-sm sm:text-base italic pt-1">
              «Ἐν ἀρχῇ ἦν ὁ Λόγος, καὶ ὁ Λόγος ἦν πρὸς τὸν Θεόν, καὶ Θεὸς ἦν ὁ Λόγος»
              <span className="not-italic text-xs text-amber-400/70 ml-2 font-sans">— Juan 1:1</span>
            </p>
          </div>

          {/* Quick Action Button */}
          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onSelectWeek(currentActiveWeek)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-5 h-5" />
              <span>Continuar Semana {currentActiveWeek}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenCertificate}
              className="px-5 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/90 text-slate-200 font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Mi Certificado</span>
            </button>
          </div>

        </div>
      </div>

      {/* Overview Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{completedWeeksCount} / {totalWeeks}</div>
            <div className="text-xs text-slate-500 font-medium">Semanas Completadas</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <BookMarked className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{completedResourcesCount}</div>
            <div className="text-xs text-slate-500 font-medium">Lecciones Estudiadas</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{completedGamesCount}</div>
            <div className="text-xs text-slate-500 font-medium">Juegos Completados</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{completedExamsCount}</div>
            <div className="text-xs text-slate-500 font-medium">Exámenes Aprobados</div>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 p-5 rounded-2xl shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-black/10 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="text-2xl font-black">{overallPercentage}%</div>
            <div className="text-xs font-bold text-slate-900">Progreso Global</div>
          </div>
        </div>

      </div>

      {/* Section Title, Search & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-sky-700" />
              <span>Plan de Estudios ({totalWeeks} Semanas)</span>
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Selecciona una semana disponible para acceder a sus lecciones interactivas, juegos y evaluaciones.
            </p>
          </div>

          {/* Unlock with Code trigger */}
          {!user?.esProfesor && (
            <button
              onClick={onOpenUnlockModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-sm transition-colors cursor-pointer border border-amber-300"
            >
              <Key className="w-4 h-4 text-amber-700" />
              <span>Desbloquear con Código</span>
            </button>
          )}
        </div>

        {/* Search & Tabs Filter Bar */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar tema (ej: aoristo, verbos, juan)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterType === 'all' 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todas ({totalWeeks})
            </button>
            <button
              onClick={() => setFilterType('unlocked')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterType === 'unlocked' 
                  ? 'bg-sky-600 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              En Curso
            </button>
            <button
              onClick={() => setFilterType('completed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterType === 'completed' 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Completadas ({completedWeeksCount})
            </button>
            <button
              onClick={() => setFilterType('locked')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterType === 'locked' 
                  ? 'bg-slate-600 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Próximas
            </button>
          </div>

        </div>
      </div>

      {/* Semanas Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredWeeks.map((weekNum) => {
          const weekData = SEMANAS_DATA[weekNum];
          const isUnlocked = isWeekUnlocked(weekNum);
          const isCompleted = isWeekCompleted(weekNum);
          const isCurrent = weekNum === semanaActualGlobal && !isCompleted;
          const percent = getWeekProgressPercent(weekNum);
          const title = weekData?.titulo || `Semana ${weekNum}`;
          const topic = weekData?.tema || 'Contenido del curso';
          const resourcesCount = weekData?.recursos?.length || 0;
          const gamesCount = weekData?.juegos?.length || 0;

          return (
            <div
              key={weekNum}
              onClick={() => {
                if (isUnlocked) onSelectWeek(weekNum);
              }}
              className={`group relative rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-white hover:bg-sky-50/50 hover:shadow-xl hover:border-sky-400 cursor-pointer transform hover:-translate-y-1'
                  : 'bg-slate-100/80 border-slate-200 opacity-75 cursor-not-allowed'
              } ${
                isCompleted 
                  ? 'border-emerald-300 ring-1 ring-emerald-400/40 bg-emerald-50/20' 
                  : isCurrent 
                  ? 'border-amber-400 ring-2 ring-amber-400/30' 
                  : 'border-slate-200'
              }`}
            >
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-xl font-bold flex items-center justify-center text-sm shadow-inner bg-slate-900 text-white font-serif">
                  {weekNum}
                </span>

                {isCompleted ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Completada</span>
                  </span>
                ) : isCurrent ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Semana Actual</span>
                  </span>
                ) : isUnlocked ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-sky-100 text-sky-800">
                    <Unlock className="w-3 h-3" />
                    <span>Desbloqueada</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-200 text-slate-700">
                    <Lock className="w-3 h-3" />
                    <span>Bloqueada</span>
                  </span>
                )}
              </div>

              {/* Title & Topic */}
              <div className="space-y-1.5 mb-4">
                <h3 className="font-bold text-base text-slate-900 font-serif leading-snug group-hover:text-sky-700 transition-colors">
                  {title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {topic}
                </p>
              </div>

              {/* Footer / Progress */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                {isUnlocked ? (
                  <>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{resourcesCount} lecciones • {gamesCount} juegos</span>
                      <span className="font-semibold text-sky-700">{percent}%</span>
                    </div>
                    {/* Mini Progress Bar */}
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCompleted ? 'bg-emerald-500' : 'bg-sky-600'
                        }`} 
                        style={{ width: `${percent}%` }} 
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Disponible: {getUnlockDateForWeek(weekNum)}</span>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {filteredWeeks.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No se encontraron semanas</h3>
          <p className="text-sm text-slate-500 mt-1">Prueba con otro término de búsqueda o cambia el filtro.</p>
          <button 
            onClick={() => { setSearchTerm(''); setFilterType('all'); }} 
            className="mt-4 px-4 py-2 bg-sky-600 text-white text-xs font-semibold rounded-lg hover:bg-sky-700"
          >
            Restablecer Filtros
          </button>
        </div>
      )}

    </div>
  );
};
