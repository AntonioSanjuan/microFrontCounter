import { User } from 'firebase/auth';
import { FirebaseUserSettingsDto } from '../../models/dtos/firebaseStore/firebaseUserSettings.model';

export enum UserActions {
    setUser = '@action/setUSer',
    setUserSettings = '@action/setUserSettings',
    unsetUser = '@action/unsetUser',
}

export const setUserSettingsAction = (userSettings: FirebaseUserSettingsDto) => ({
  type: UserActions.setUserSettings,
  payload: userSettings,
});

export const setUserAction = (userData: User|null) => ({
  type: UserActions.setUser,
  payload: userData,
});

export const unsetUserAction = () => ({
  type: UserActions.unsetUser,
});
