import { useCallback, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { UserCredential } from '@firebase/auth';
import {
  firebaseGoogleLogin, firebaseLogin, firebaseLogout, firebaseSignUp,
} from '../../services/firebaseAuth/firebaseAuth.service';
import { useUserSettings } from '../userSettings/userSettingsHook';
import { useAppSelector } from '../state/appStateHook';
import { FirebaseUserSettingsDto } from '../../models/dtos/firebaseStore/firebaseUserSettings.model';
import { selectUserSettings } from '../../state/user/user.selectors';
import { FirebaseGameDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { selectGame } from '../../state/game/game.selectors';
import { useGameSettings } from '../gameSettings/gameSettingsHook';

export function useUser() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { setUserSettings } = useUserSettings();
  const { setGameSettings } = useGameSettings();
  const userSettings = useAppSelector<FirebaseUserSettingsDto | undefined>(selectUserSettings);
  const gameSettings = useAppSelector<FirebaseGameDto | undefined>(selectGame);

  const login = async ({ username, password }: {username: string, password: string}): Promise<UserCredential> => {
    setLoading(true);
    return firebaseLogin(username, password)
      .then((resp) => {
        setLoading(false);
        setError(false);
        return resp;
      }).catch((e) => {
        setLoading(false);
        setError(true);
        throw e;
      });
  };

  const loginWithGoogle = async (): Promise<UserCredential> => {
    setLoading(true);
    return firebaseGoogleLogin()
      .then((resp) => {
        setLoading(false);
        setError(false);
        return resp;
      }).catch((e) => {
        setLoading(false);
        setError(true);
        throw e;
      });
  };

  const signUp = useCallback(async ({ username, password }): Promise<UserCredential> => {
    setLoading(true);
    return firebaseSignUp(username, password)
      .then(async (resp) => {
        await setGameSettings(gameSettings as FirebaseGameDto);
        await setUserSettings(userSettings as FirebaseUserSettingsDto);

        setLoading(false);
        setError(false);
        return resp;
      }).catch((e) => {
        setLoading(false);
        setError(true);
        throw e;
      });
  }, [userSettings]);

  const logout = useCallback(async (): Promise<void> => {
    await firebaseLogout();
  }, []);

  return {
    login,
    loginWithGoogle,
    logout,
    signUp,
    loading,
    error,
  };
}
