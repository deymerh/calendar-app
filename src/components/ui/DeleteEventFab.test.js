import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DeleteEventFab } from './DeleteEventFab';
import { Provider } from 'react-redux';
import moment from 'moment';
import { eventStartDeleted } from '../../actions/events';

jest.mock('../../actions/events', () => ({
  eventStartDeleted: jest.fn()
}))

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

describe('Test in the file [DeleteEventFab]', () => {

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('should do Snapshot the component [<DeleteEventFab />]', async () => {
    const { component } = render(
      <Provider store={store}>
        <DeleteEventFab />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  test('should do Snapshot the component [<DeleteEventFab />]', async () => {
    store.dispatch = jest.fn();
    const { findByTestId } = render(
      <Provider store={store}>
        <DeleteEventFab />
      </Provider>
    );
    const btnDelete = await findByTestId('btnDelete');
    fireEvent.click(btnDelete);
    expect(eventStartDeleted).toHaveBeenCalled()

  });
});