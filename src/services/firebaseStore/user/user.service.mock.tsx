/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable camelcase */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import * as userService from './user.service';

export const getUserResponseObjMock = {
  data: () => {},
} as DocumentSnapshot<DocumentData>;
export const setUserSettingsResponseObjMock = {} as any;
export const updateUserSettingsResponseMock = {} as any;

const getUserSettingsMock = () => new Promise<DocumentSnapshot<DocumentData>>((resolve) => resolve(
  getUserResponseObjMock,
));
const setUserSettingsMock = () => new Promise<any>((resolve) => resolve(setUserSettingsResponseObjMock));
const updateUserSettingsMock = () => new Promise<any>((resolve) => resolve(updateUserSettingsResponseMock));

export const getUserSettingSpy = jest.spyOn(userService, 'getUserSettings');
export const setUserSettingsSpy = jest.spyOn(userService, 'setUserSettings');
export const updateUserSettingsSpy = jest.spyOn(userService, 'updateUserSettings');

export const initializeMock = () => {
  getUserSettingSpy
    .mockImplementation(getUserSettingsMock);
  setUserSettingsSpy
    .mockImplementation(setUserSettingsMock);
  updateUserSettingsSpy
    .mockImplementation(updateUserSettingsMock);
};

export const reset = () => {
  getUserSettingSpy.mockClear();
  setUserSettingsSpy.mockClear();
  updateUserSettingsSpy.mockClear();
};
