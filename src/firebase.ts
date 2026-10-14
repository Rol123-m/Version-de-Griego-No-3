import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { UserProgress } from './types';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// CRITICAL: Must pass firestoreDatabaseId as required by Firebase skill
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.warn('Firestore Operation Notice: ', JSON.stringify(errInfo));
}

/**
 * Save user progress to Firebase Firestore with fallback
 */
export async function saveProgressToCloud(userId: string, progress: UserProgress, studentName?: string, group?: string): Promise<boolean> {
  const docPath = `student_progress/${userId}`;
  try {
    const docRef = doc(db, 'student_progress', userId);
    await setDoc(docRef, {
      userId,
      studentName: studentName || 'Estudiante',
      group: group || 'ALFA',
      xp: progress.xp || 0,
      streak: progress.streak || 1,
      semanasCompletadas: progress.semanasCompletadas || [],
      semanasDesbloqueadas: progress.semanasDesbloqueadas || [1],
      recursosCompletados: progress.recursosCompletados || [],
      juegosCompletados: progress.juegosCompletados || [],
      lastActiveDate: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
    return false;
  }
}

/**
 * Fetch progress from Firebase Firestore
 */
export async function fetchProgressFromCloud(userId: string): Promise<Partial<UserProgress> | null> {
  const docPath = `student_progress/${userId}`;
  try {
    const docRef = doc(db, 'student_progress', userId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      return {
        semanasCompletadas: data.semanasCompletadas || [],
        semanasDesbloqueadas: data.semanasDesbloqueadas || [1],
        recursosCompletados: data.recursosCompletados || [],
        juegosCompletados: data.juegosCompletados || [],
        xp: data.xp || 0,
        streak: data.streak || 1,
        lastActiveDate: data.lastActiveDate || new Date().toISOString()
      };
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, docPath);
    return null;
  }
}

/**
 * Real-time listener for student progress updates
 */
export function subscribeToProgress(userId: string, onUpdate: (data: Partial<UserProgress>) => void) {
  const docPath = `student_progress/${userId}`;
  try {
    const docRef = doc(db, 'student_progress', userId);
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        onUpdate({
          semanasCompletadas: data.semanasCompletadas || [],
          semanasDesbloqueadas: data.semanasDesbloqueadas || [1],
          recursosCompletados: data.recursosCompletados || [],
          juegosCompletados: data.juegosCompletados || [],
          xp: data.xp || 0,
          streak: data.streak || 1
        });
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, docPath);
    });
  } catch (e) {
    return () => {};
  }
}
