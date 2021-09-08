import { types } from '../types/types';
import { authReducer } from './authReducer';

describe('Test in the file [authReducer]', () => {
  const initialState = {
    checking: true,
    uid: null,
    name: null
  };
  test('should return the default state', () => {
    const state = authReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test('should do login of user', () => {
    const action = {
      type: types.authLogin,
      payload: {
        uid: "131231",
        name: 'Deymer'
      }
    }
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      checking: false,
      uid: "131231",
      name: 'Deymer'
    });
  });

});