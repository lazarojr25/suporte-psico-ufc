import { useEffect } from 'react';
import { auth } from '../services/firebase';
import { signInAnonymously } from 'firebase/auth';

export function loginAnonymously() {
  useEffect(() => {
    signInAnonymously(auth).catch((error) => {
      console.error('Erro no login anônimo:', error);
    });
  }, []);
}
