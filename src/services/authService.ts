import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { UserProfile, UserRole } from '../types';

const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await ensureUserProfile(result.user);
    return result.user;
  } catch (error) {
    console.error('Google Sign In Error', error);
    throw error;
  }
}

export async function registerWithEmail(email: string, pass: string, name: string) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    await ensureUserProfile(result.user, name);
    return result.user;
  } catch (error) {
    console.error('Email Register Error', error);
    throw error;
  }
}

export async function loginWithEmail(email: string, pass: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, pass);
    await ensureUserProfile(result.user);
    return result.user;
  } catch (error) {
    console.error('Email Login Error', error);
    throw error;
  }
}

export async function logOut() {
  return signOut(auth);
}

async function ensureUserProfile(user: FirebaseUser, displayName?: string) {
  const userRef = doc(db, 'users', user.uid);
  try {
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      const profile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        displayName: displayName || user.displayName || 'User',
        role: UserRole.USER,
        balance: 0,
        totalEarned: 0,
        referralCode: `TW-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        xp: 0,
        level: 1,
        createdAt: Date.now(),
        lastLogin: Date.now(),
      };
      await setDoc(userRef, profile);
    } else {
      await setDoc(userRef, { lastLogin: Date.now() }, { merge: true });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
  }
}

export function subscribeToAuth(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userRef = doc(db, 'users', uid);
  try {
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `users/${uid}`);
    return null;
  }
}
