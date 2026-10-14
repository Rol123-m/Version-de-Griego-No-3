export type GroupKey = 'ALFA' | 'BETA' | 'GAMMA';

export interface Student {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  nacionalidad: string;
}

export interface Teacher {
  id: number;
  nombre: string;
  grupos: GroupKey[];
  rol: 'profesor_titular' | 'profesor_asistente' | 'profesora' | 'facilitador' | 'asistente';
}

export interface GroupConfig {
  id: string;
  nombre: string;
  profesorTitular: string;
  profesorAsistente?: string;
  facilitadores?: string[];
  asistentes?: string[];
}

export interface ResourceItem {
  tipo: 'html' | 'pdf' | 'video' | 'examen';
  titulo: string;
  url: string;
  icono?: string;
  nota?: string;
}

export interface GameItem {
  titulo: string;
  url: string;
  icono?: string;
  nota?: string;
}

export interface WeekData {
  numero: number;
  titulo: string;
  tema: string;
  recursos: ResourceItem[];
  juegos: GameItem[];
}

export interface User {
  id: string;
  nombre: string;
  email?: string;
  telefono?: string;
  nacionalidad?: string;
  grupo?: GroupKey;
  grupoNombre?: string;
  rol: string;
  esProfesor?: boolean;
  permisos?: string[];
  fechaRegistro?: string;
}

export interface ExamRecord {
  fecha: string;
  completado: boolean;
  puntaje?: number;
}

export interface UserProgress {
  semanasCompletadas: number[];
  semanasDesbloqueadas: number[];
  recursosCompletados: string[]; // "semana_index"
  juegosCompletados: string[];   // "semana_index"
  examenesCompletados: Record<number, ExamRecord>;
  xp: number;
  streak: number;
  lastActiveDate: string;
  vocabularioDominado: string[];
}

export interface GreekLetter {
  upper: string;
  lower: string;
  name: string;
  transliteration: string;
  pronunciation: string;
  example: string;
}

export interface VocabWord {
  greek: string;
  spanish: string;
  transliteration?: string;
  week: number;
}
