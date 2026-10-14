import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, GroupKey } from '../types';
import { COURSE_CONFIG, GRUPOS_CONFIG, ESTUDIANTES_POR_GRUPO, PROFESORES } from '../data/courseData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginStudent: (groupId: GroupKey, studentId: number, idInput: string, password: string) => { success: boolean; error?: string };
  loginTeacher: (teacherId: number, idInput: string, password: string) => { success: boolean; error?: string };
  loginDemo: (role: 'student_alfa' | 'student_beta' | 'student_gamma' | 'teacher') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'griego_usuarioActual';
const STORAGE_KEY_AUTH = 'griego_autenticado';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY_USER);
      const isAuth = localStorage.getItem(STORAGE_KEY_AUTH) === 'true';
      if (storedUser && isAuth) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Failed to load user from localStorage", e);
    }
  }, []);

  const loginStudent = (groupId: GroupKey, studentId: number, idInput: string, password: string) => {
    if (!groupId) {
      return { success: false, error: 'Debes seleccionar un grupo.' };
    }
    if (!studentId) {
      return { success: false, error: 'Debes seleccionar tu nombre.' };
    }
    if (!idInput.trim()) {
      return { success: false, error: 'Debes ingresar tu ID numérico asignado.' };
    }
    if (idInput.trim() !== studentId.toString()) {
      return { success: false, error: 'El ID numérico no coincide con el estudiante seleccionado.' };
    }
    if (password !== COURSE_CONFIG.PASSWORD_UNICA && password !== COURSE_CONFIG.CODIGO_ADMIN) {
      return { success: false, error: 'Contraseña incorrecta. (Pista: griego2026)' };
    }

    const students = ESTUDIANTES_POR_GRUPO[groupId];
    const student = students.find(s => s.id === studentId);
    if (!student) {
      return { success: false, error: 'Estudiante no encontrado en el grupo seleccionado.' };
    }

    const newUser: User = {
      id: student.id.toString(),
      nombre: student.nombre,
      email: student.email,
      telefono: student.telefono,
      nacionalidad: student.nacionalidad,
      grupo: groupId,
      grupoNombre: GRUPOS_CONFIG[groupId]?.nombre || `Grupo ${groupId}`,
      rol: 'estudiante',
      esProfesor: false,
      fechaRegistro: new Date().toISOString()
    };

    setUser(newUser);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    localStorage.setItem(STORAGE_KEY_AUTH, 'true');

    return { success: true };
  };

  const loginTeacher = (teacherId: number, idInput: string, password: string) => {
    if (!teacherId) {
      return { success: false, error: 'Debes seleccionar tu nombre de profesor.' };
    }
    if (!idInput.trim()) {
      return { success: false, error: 'Debes ingresar tu ID de profesor.' };
    }
    if (idInput.trim() !== teacherId.toString()) {
      return { success: false, error: 'El ID numérico no coincide con el profesor seleccionado.' };
    }
    if (password !== COURSE_CONFIG.PASSWORD_UNICA && password !== COURSE_CONFIG.CODIGO_ADMIN) {
      return { success: false, error: 'Contraseña incorrecta. (Pista: ADMIN2026 o griego2026)' };
    }

    const teacher = PROFESORES.find(p => p.id === teacherId);
    if (!teacher) {
      return { success: false, error: 'Profesor no encontrado.' };
    }

    const permisos = {
      profesor_titular: ['ver_todos_grupos', 'editar_contenido', 'generar_codigos', 'ver_estadisticas', 'desbloquear_semanas'],
      profesor_asistente: ['ver_grupo_asignado', 'editar_contenido', 'ver_estadisticas'],
      profesora: ['ver_grupo_asignado', 'editar_contenido', 'ver_estadisticas'],
      facilitador: ['ver_grupo_asignado', 'ver_estadisticas'],
      asistente: ['ver_grupo_asignado']
    }[teacher.rol] || ['ver_grupo_asignado'];

    const newUser: User = {
      id: teacher.id.toString(),
      nombre: teacher.nombre,
      rol: teacher.rol,
      esProfesor: true,
      permisos,
      grupo: teacher.grupos[0],
      grupoNombre: teacher.grupos.map(g => GRUPOS_CONFIG[g]?.nombre || g).join(', '),
      fechaRegistro: new Date().toISOString()
    };

    setUser(newUser);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    localStorage.setItem(STORAGE_KEY_AUTH, 'true');

    return { success: true };
  };

  const loginDemo = (role: 'student_alfa' | 'student_beta' | 'student_gamma' | 'teacher') => {
    if (role === 'student_alfa') {
      const student = ESTUDIANTES_POR_GRUPO.ALFA[0];
      const newUser: User = {
        id: student.id.toString(),
        nombre: student.nombre,
        email: student.email,
        telefono: student.telefono,
        nacionalidad: student.nacionalidad,
        grupo: 'ALFA',
        grupoNombre: GRUPOS_CONFIG.ALFA.nombre,
        rol: 'estudiante',
        esProfesor: false,
        fechaRegistro: new Date().toISOString()
      };
      setUser(newUser);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
      localStorage.setItem(STORAGE_KEY_AUTH, 'true');
    } else if (role === 'student_beta') {
      const student = ESTUDIANTES_POR_GRUPO.BETA[0];
      const newUser: User = {
        id: student.id.toString(),
        nombre: student.nombre,
        email: student.email,
        telefono: student.telefono,
        nacionalidad: student.nacionalidad,
        grupo: 'BETA',
        grupoNombre: GRUPOS_CONFIG.BETA.nombre,
        rol: 'estudiante',
        esProfesor: false,
        fechaRegistro: new Date().toISOString()
      };
      setUser(newUser);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
      localStorage.setItem(STORAGE_KEY_AUTH, 'true');
    } else if (role === 'student_gamma') {
      const student = ESTUDIANTES_POR_GRUPO.GAMMA[0];
      const newUser: User = {
        id: student.id.toString(),
        nombre: student.nombre,
        email: student.email,
        telefono: student.telefono,
        nacionalidad: student.nacionalidad,
        grupo: 'GAMMA',
        grupoNombre: GRUPOS_CONFIG.GAMMA.nombre,
        rol: 'estudiante',
        esProfesor: false,
        fechaRegistro: new Date().toISOString()
      };
      setUser(newUser);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
      localStorage.setItem(STORAGE_KEY_AUTH, 'true');
    } else {
      // Teacher
      const teacher = PROFESORES[0]; // Rolando Desdín
      const newUser: User = {
        id: teacher.id.toString(),
        nombre: teacher.nombre,
        rol: teacher.rol,
        esProfesor: true,
        permisos: ['ver_todos_grupos', 'editar_contenido', 'generar_codigos', 'ver_estadisticas', 'desbloquear_semanas'],
        grupo: 'ALFA',
        grupoNombre: "Profesor Titular (Alfa y Beta)",
        fechaRegistro: new Date().toISOString()
      };
      setUser(newUser);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
      localStorage.setItem(STORAGE_KEY_AUTH, 'true');
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_AUTH);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginStudent,
        loginTeacher,
        loginDemo,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
