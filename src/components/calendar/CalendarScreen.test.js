import '@testing-library/jest-dom';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import moment from 'moment';
import { CalendarScreen } from './CalendarScreen';
import { types } from '../../types/types';

// jest.mock('../../actions/events', () => ({
//   eventStartDeleted: jest.fn()
// }));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

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
    eventActive: null
  },
  auth: {
    checking: false,
    uid: '123456dwewefwefwe',
    name: 'Deymer',
  }
}

let store = mockStore(initialState);
store.dispatch = jest.fn();

describe('Test in the component <CalendarScreen />', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should do the snapahot the component', () => {
    const { container } = render(
      <Provider store={store}>
        <CalendarScreen />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  test('should exist the event and open modal to double click', async () => {
    const { getByTitle } = render(
      <Provider store={store}>
        <CalendarScreen />
      </Provider>
    );
    const titleEvent = getByTitle(initialState.calendar.events[0].title);
    expect(titleEvent).toBeInTheDocument();
    fireEvent.dblClick(titleEvent);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: types.uiOpenModal
    });
  });

});

