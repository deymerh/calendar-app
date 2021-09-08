import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { startChecking, startLogin, startRegister } from './auth';
import * as fetchModule from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
let store = mockStore(initialState);

//Mock the localStorage
Storage.prototype.setItem = jest.fn();

//Mock Sweetalert
jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

describe('Test in the actions [auth.js]', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });
  test('should login correctly', async () => {
    localStorage.setItem = jest.fn();
    await store.dispatch(startLogin('deymerh@hotmail.com', '123456'));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: { uid: expect.any(String), name: expect.any(String) }
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    // console.log(localStorage.setItem.mock.calls[0][1])
  });

  test('should not do login if user is incorrect', async () => {
    await store.dispatch(startLogin('deymerh@hotmail.com', '123456789'));
    const actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Contraseña incorrecta', 'error');

    await store.dispatch(startLogin('deymer@hotmail.com', '123456789'));
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Email no existe', 'error');
  });

  test('should create an user correctly', async () => {

    fetchModule.fetchWithoutToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '12345',
          name: 'Deymer',
          token: '76wehwbefwe879798'
        }
      }
    }));

    await store.dispatch(startRegister('usertest', 'test@test.com', 'passwordtest'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '12345',
        name: 'Deymer',
      }
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
  });

  test('should do the checking correctly', async () => {

    fetchModule.fetchWithToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '12345',
          name: 'Deymer',
          token: '76wehwbefwe879798'
        }
      }
    }));

    await store.dispatch(startChecking());
    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));

  });

});
