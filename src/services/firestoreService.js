import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  deleteDoc, 
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Get all resumes for a user, ordered by last updated.
 */
export async function getUserResumes(userId) {
  const resumesRef = collection(db, 'users', userId, 'resumes');
  const q = query(resumesRef, orderBy('updatedAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

/**
 * Get a single resume by ID.
 */
export async function getResume(userId, resumeId) {
  const docRef = doc(db, 'users', userId, 'resumes', resumeId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

/**
 * Create a new resume. Returns the new document ID.
 */
export async function createResume(userId, resumeData) {
  const resumesRef = collection(db, 'users', userId, 'resumes');
  const docRef = await addDoc(resumesRef, {
    ...resumeData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
}

/**
 * Update an existing resume (merge).
 */
export async function saveResume(userId, resumeId, resumeData) {
  const docRef = doc(db, 'users', userId, 'resumes', resumeId);
  await setDoc(docRef, {
    ...resumeData,
    updatedAt: serverTimestamp()
  }, { merge: true });
}

/**
 * Delete a resume.
 */
export async function deleteResume(userId, resumeId) {
  const docRef = doc(db, 'users', userId, 'resumes', resumeId);
  await deleteDoc(docRef);
}
