import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { UserProgress, ExamRecord } from '../types';
import { COURSE_CONFIG, SEMANAS_DATA } from '../data/courseData';
import { useAuth } from './AuthContext';
import { saveProgressToCloud, fetchProgressFromCloud } from '../firebase';
import confetti from 'canvas-confetti';

interface ProgressContextType {
  progress: UserProgress;
  semanaActualGlobal: number;
  isWeekUnlocked: (weekNumber: number) => boolean;
  isWeekCompleted: (weekNumber: number) => boolean;
  isResourceCompleted: (weekNumber: number, resourceIndex: number) => boolean;
  isGameCompleted: (weekNumber: number, gameIndex: number) => boolean;
  isExamCompleted: (weekNumber: number) => boolean;
  getWeekProgressPercent: (weekNumber: number) => number;
  toggleResource: (weekNumber: number, resourceIndex: number) => void;
  toggleGame: (weekNumber: number, gameIndex: number) => void;
  completeExam: (weekNumber: number, score?: number) => void;
  completeWeek: (weekNumber: number) => void;
  unlockWeekWithCode: (code: string, weekNumber?: number) => { success: boolean; message: string };
  unlockAllWeeks: () => void;
  getUnlockDateForWeek: (weekNumber: number) => string;
  triggerConfetti: () => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const initialProgress: UserProgress = {
  semanasCompletadas: [],
  semanasDesbloqueadas: [1], // Week 1 unlocked by default
  recursosCompletados: [],
  juegosCompletados: [],
  examenesCompletados: {},
  xp: 0,
  streak: 1,
  lastActiveDate: new Date().toISOString(),
  vocabularioDominado: []
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress>(initialProgress);

  const storageKey = user ? `griego_progreso_${user.id}` : 'griego_progreso_guest';

  // Calculate current global week based on start date
  const semanaActualGlobal = useMemo(() => {
    try {
      const fechaInicio = new Date(COURSE_CONFIG.FECHA_INICIO_GLOBAL);
      const hoy = new Date();
      if (hoy < fechaInicio) {
        return 1; // Start at 1 for preparation
      }
      const diffTiempo = hoy.getTime() - fechaInicio.getTime();
      const diffDias = Math.floor(diffTiempo / (1000 * 60 * 60 * 24));
      const semana = Math.floor(diffDias / 7) + 1;
      return Math.min(Math.max(semana, 1), COURSE_CONFIG.TOTAL_SEMANAS);
    } catch {
      return 1;
    }
  }, []);

  // Load progress when user changes
  useEffect(() => {
    if (!user) {
      setProgress(initialProgress);
      return;
    }

    // 1. Try local storage first for instant load
    let loaded: UserProgress = initialProgress;
    try {
      const localData = localStorage.getItem(storageKey);
      if (localData) {
        loaded = JSON.parse(localData);
      }
    } catch (e) {
      console.warn("Could not parse local progress", e);
    }

    setProgress(loaded);

    // 2. Sync with cloud in background
    fetchProgressFromCloud(user.id).then((cloudData) => {
      if (cloudData) {
        setProgress(prev => {
          // Merge whichever has more progress
          const merged: UserProgress = {
            ...prev,
            semanasCompletadas: Array.from(new Set([...prev.semanasCompletadas, ...(cloudData.semanasCompletadas || [])])),
            semanasDesbloqueadas: Array.from(new Set([...prev.semanasDesbloqueadas, ...(cloudData.semanasDesbloqueadas || [])])),
            recursosCompletados: Array.from(new Set([...prev.recursosCompletados, ...(cloudData.recursosCompletados || [])])),
            juegosCompletados: Array.from(new Set([...prev.juegosCompletados, ...(cloudData.juegosCompletados || [])])),
            xp: Math.max(prev.xp, cloudData.xp || 0),
            streak: Math.max(prev.streak, cloudData.streak || 1)
          };
          localStorage.setItem(storageKey, JSON.stringify(merged));
          return merged;
        });
      }
    });
  }, [user, storageKey]);

  // Helper to persist state
  const saveState = useCallback((updater: (prev: UserProgress) => UserProgress) => {
    setProgress(prev => {
      const updated = updater(prev);
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch (e) {
        console.error("Local storage save error", e);
      }
      if (user) {
        // Fire and forget cloud save
        saveProgressToCloud(user.id, updated, user.nombre, user.grupo);
      }
      return updated;
    });
  }, [storageKey, user]);

  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore if canvas not supported
    }
  }, []);

  const isWeekUnlocked = useCallback((weekNumber: number): boolean => {
    if (user?.esProfesor) return true;
    if (weekNumber <= 1) return true;
    if (weekNumber <= semanaActualGlobal) return true;
    return progress.semanasDesbloqueadas.includes(weekNumber);
  }, [user, semanaActualGlobal, progress.semanasDesbloqueadas]);

  const isWeekCompleted = useCallback((weekNumber: number): boolean => {
    return progress.semanasCompletadas.includes(weekNumber);
  }, [progress.semanasCompletadas]);

  const isResourceCompleted = useCallback((weekNumber: number, resourceIndex: number): boolean => {
    return progress.recursosCompletados.includes(`${weekNumber}_${resourceIndex}`);
  }, [progress.recursosCompletados]);

  const isGameCompleted = useCallback((weekNumber: number, gameIndex: number): boolean => {
    return progress.juegosCompletados.includes(`${weekNumber}_${gameIndex}`);
  }, [progress.juegosCompletados]);

  const isExamCompleted = useCallback((weekNumber: number): boolean => {
    return !!progress.examenesCompletados[weekNumber]?.completado;
  }, [progress.examenesCompletados]);

  const getWeekProgressPercent = useCallback((weekNumber: number): number => {
    const weekData = SEMANAS_DATA[weekNumber];
    if (!weekData) return 0;

    const totalRecursos = (weekData.recursos ? weekData.recursos.length : 0);
    const totalJuegos = (weekData.juegos ? weekData.juegos.length : 0);
    const totalItems = totalRecursos + totalJuegos + 1; // + 1 for exam

    let completedItems = 0;
    for (let i = 0; i < totalRecursos; i++) {
      if (progress.recursosCompletados.includes(`${weekNumber}_${i}`)) completedItems++;
    }
    for (let i = 0; i < totalJuegos; i++) {
      if (progress.juegosCompletados.includes(`${weekNumber}_${i}`)) completedItems++;
    }
    if (progress.examenesCompletados[weekNumber]?.completado) {
      completedItems++;
    }

    return Math.min(100, Math.round((completedItems / totalItems) * 100));
  }, [progress]);

  const toggleResource = useCallback((weekNumber: number, resourceIndex: number) => {
    const key = `${weekNumber}_${resourceIndex}`;
    saveState(prev => {
      const exists = prev.recursosCompletados.includes(key);
      const recursosCompletados = exists
        ? prev.recursosCompletados.filter(k => k !== key)
        : [...prev.recursosCompletados, key];
      const xp = exists ? Math.max(0, prev.xp - 50) : prev.xp + 50;
      return { ...prev, recursosCompletados, xp };
    });
  }, [saveState]);

  const toggleGame = useCallback((weekNumber: number, gameIndex: number) => {
    const key = `${weekNumber}_${gameIndex}`;
    saveState(prev => {
      const exists = prev.juegosCompletados.includes(key);
      const juegosCompletados = exists
        ? prev.juegosCompletados.filter(k => k !== key)
        : [...prev.juegosCompletados, key];
      const xp = exists ? Math.max(0, prev.xp - 75) : prev.xp + 75;
      return { ...prev, juegosCompletados, xp };
    });
  }, [saveState]);

  const completeExam = useCallback((weekNumber: number, score?: number) => {
    saveState(prev => {
      const examenesCompletados: Record<number, ExamRecord> = {
        ...prev.examenesCompletados,
        [weekNumber]: {
          fecha: new Date().toISOString(),
          completado: true,
          puntaje: score
        }
      };
      return {
        ...prev,
        examenesCompletados,
        xp: prev.xp + 150
      };
    });
    triggerConfetti();
  }, [saveState, triggerConfetti]);

  const completeWeek = useCallback((weekNumber: number) => {
    saveState(prev => {
      const semanasCompletadas = prev.semanasCompletadas.includes(weekNumber)
        ? prev.semanasCompletadas
        : [...prev.semanasCompletadas, weekNumber];

      // Auto unlock next week
      const nextWeek = weekNumber + 1;
      const semanasDesbloqueadas = nextWeek <= COURSE_CONFIG.TOTAL_SEMANAS && !prev.semanasDesbloqueadas.includes(nextWeek)
        ? [...prev.semanasDesbloqueadas, nextWeek]
        : prev.semanasDesbloqueadas;

      return {
        ...prev,
        semanasCompletadas,
        semanasDesbloqueadas,
        xp: prev.xp + 300
      };
    });
    triggerConfetti();
  }, [saveState, triggerConfetti]);

  const unlockWeekWithCode = useCallback((code: string, weekNumber?: number): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();

    if (cleanCode === 'DESBLOQUEAR_TODO' || cleanCode === COURSE_CONFIG.CODIGO_ADMIN) {
      const allWeeks = Array.from({ length: COURSE_CONFIG.TOTAL_SEMANAS }, (_, i) => i + 1);
      saveState(prev => ({
        ...prev,
        semanasDesbloqueadas: allWeeks
      }));
      triggerConfetti();
      return { success: true, message: '¡Todas las 30 semanas han sido desbloqueadas con éxito!' };
    }

    if (weekNumber && cleanCode === `SEMANA_${weekNumber}`) {
      saveState(prev => ({
        ...prev,
        semanasDesbloqueadas: prev.semanasDesbloqueadas.includes(weekNumber)
          ? prev.semanasDesbloqueadas
          : [...prev.semanasDesbloqueadas, weekNumber]
      }));
      triggerConfetti();
      return { success: true, message: `¡Semana ${weekNumber} desbloqueada con éxito!` };
    }

    // Check if code matches any SEMANA_X pattern
    const match = cleanCode.match(/^SEMANA_(\d+)$/);
    if (match) {
      const targetWeek = parseInt(match[1]);
      if (targetWeek >= 1 && targetWeek <= COURSE_CONFIG.TOTAL_SEMANAS) {
        saveState(prev => ({
          ...prev,
          semanasDesbloqueadas: prev.semanasDesbloqueadas.includes(targetWeek)
            ? prev.semanasDesbloqueadas
            : [...prev.semanasDesbloqueadas, targetWeek]
        }));
        triggerConfetti();
        return { success: true, message: `¡Semana ${targetWeek} desbloqueada con éxito!` };
      }
    }

    return { success: false, message: 'Código de desbloqueo inválido. Consulta a tu profesor.' };
  }, [saveState, triggerConfetti]);

  const unlockAllWeeks = useCallback(() => {
    const allWeeks = Array.from({ length: COURSE_CONFIG.TOTAL_SEMANAS }, (_, i) => i + 1);
    saveState(prev => ({
      ...prev,
      semanasDesbloqueadas: allWeeks
    }));
    triggerConfetti();
  }, [saveState, triggerConfetti]);

  const getUnlockDateForWeek = useCallback((weekNumber: number): string => {
    try {
      const fechaInicio = new Date(COURSE_CONFIG.FECHA_INICIO_GLOBAL);
      const fecha = new Date(fechaInicio.getTime() + ((weekNumber - 1) * 7 * 24 * 60 * 60 * 1000));
      return fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return `Semana ${weekNumber}`;
    }
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(initialProgress);
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {
      console.error(e);
    }
  }, [storageKey]);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        semanaActualGlobal,
        isWeekUnlocked,
        isWeekCompleted,
        isResourceCompleted,
        isGameCompleted,
        isExamCompleted,
        getWeekProgressPercent,
        toggleResource,
        toggleGame,
        completeExam,
        completeWeek,
        unlockWeekWithCode,
        unlockAllWeeks,
        getUnlockDateForWeek,
        triggerConfetti,
        resetProgress
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
