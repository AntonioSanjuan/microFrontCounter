import { doc, setDoc } from 'firebase/firestore';
import { FirebaseGameDto } from '../../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { auth, db } from '../../../utils/firebase.util';

export function setGameSettings(settings: FirebaseGameDto): Promise<any> {
  const docRef = doc(db, 'users', auth?.currentUser?.uid ?? '');
  return setDoc(docRef, { game: settings }, { merge: true });
}

export function updateGameSettings(settings: FirebaseGameDto): Promise<any> {
  const docRef = doc(db, 'users', auth?.currentUser?.uid ?? '');
  return setDoc(docRef, { game: settings }, { merge: true });
}
