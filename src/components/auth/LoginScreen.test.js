import '@testing-library/jest-dom';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import moment from 'moment';
import { LoginScreen } from './LoginScreen';
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';

jest.mock('../../actions/auth', () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  events: [
    {
      id: new Date().getTime(),
      title: 'Mi cumpleaños',
      start: moment().toDate(),
      end: moment().add(2, 'hours').toDate(),
      bgColor: '#fafafa',
      user: {
        _id: '12345',
        name: 'Deymer'
      }
    }
  ],
  eventActive: null
}

let store = mockStore(initialState);
store.dispatch = jest.fn();

describe('Test in the component [<LoginScreen />]', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should do Snapshot the component [<LoginScreen />]', async () => {
    const { container } = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  test('should to do the login', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    );
    const btnLogin = await getByTestId('bntLogin');
    fireEvent.click(btnLogin);
    expect(startLogin).toHaveBeenCalledWith('deymerh@hotmail.com', '123456');
  });

  test('should do not the login and should to show the error message incorrect passwords', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    );
    const rPassword2 = await getByTestId('rPassword2');
    fireEvent.change(rPassword2, { target: { value: "" } });
    const btnRegister = await getByTestId('btnRegister');
    fireEvent.click(btnRegister);
    expect(startRegister).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Las contraseñas debe ser iguales', 'error');
  });

  test('should to do the register', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    );
    const rName = await getByTestId('rName');
    const rEmail = await getByTestId('rEmail');
    const rPassword1 = await getByTestId('rPassword1');
    const rPassword2 = await getByTestId('rPassword2');
    fireEvent.change(rName, { target: { value: 'Tiago' } });
    fireEvent.change(rEmail, { target: { value: 'tiago@tiago.com' } });
    fireEvent.change(rPassword1, { target: { value: '123456' } });
    fireEvent.change(rPassword2, { target: { value: '123456' } });
    const btnRegister = await getByTestId('btnRegister');
    fireEvent.click(btnRegister);
    expect(startRegister).toHaveBeenCalledWith('Tiago', 'tiago@tiago.com', '123456');
    expect(Swal.fire).not.toHaveBeenCalled();
  });

});
