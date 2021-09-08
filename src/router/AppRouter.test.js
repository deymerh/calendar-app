import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import moment from 'moment';
import { AppRouter } from './AppRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Tes in the component <AppRouter />', () => {

  test('should do Snapshot the component [<AppRouter />] with the test `Espere...` ', async () => {
    const initialState = {
      auth: {
        checking: true
      }
    }
    let store = mockStore(initialState);
    store.dispatch = jest.fn();
    const { container, getByText } = render(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    const text = await getByText(/Espere/);
    expect(container).toMatchSnapshot();
    expect(text).toBeInTheDocument();
  });

  test('should to show the public route', async () => {
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
      eventActive: null,
      auth: {
        checking: false,
        uid: null
      }
    }
    let store = mockStore(initialState);
    store.dispatch = jest.fn();
    const { container, getByText } = render(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    const text = await getByText(/Ingreso/);
    expect(text).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('should to show the public route', async () => {
    const initialState = {
      ui: {
        modalOpen: false
      },
      calendar: {
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
      },
      eventActive: null,
      auth: {
        checking: false,
        uid: '12345',
        name: 'DeymerH'
      }
    }
    let store = mockStore(initialState);
    store.dispatch = jest.fn();
    const { container, getByText } = render(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    const text = await getByText(/DeymerH/);
    expect(text).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

});