import { types } from './types';

describe('Pruebas en el archivo de types.js', () => {
  test('Los Objetos deben ser iguales', () => {
    expect(types).toEqual({
      uiOpenModal: '[UI] open modal',
      uiCloseModal: '[UI] close modal',

      eventSetActive: '[event] Set Active',

      eventStartAddNew: '[event] Start Add New',
      eventsLoaded: '[event] Events Loaded',

      eventsLogout: '[event] Event Logout',

      eventAddNew: '[event] Add New',
      eventClearActive: '[event] Clear Active Event',
      eventUpdated: '[event] Event Updated',
      eventDeleted: '[event] Event Deleted',

      authChecking: '[Auth] Checking login state',
      authCheckingFinish: '[Auth] Checking login finish',
      authStartLogin: '[Auth] Start login',
      authLogin: '[Auth] Login',
      authStartRegister: '[Auth] Start register',
      authStartTokenRenew: '[Auth] Start totken Renew',
      authLogout: '[Auth] Logout',
    });
  });
});
