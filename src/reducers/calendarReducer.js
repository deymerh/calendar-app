import moment from 'moment';
import { types } from '../types/types';

const initialState = {
  events: [{
    id: new Date().getTime(),
    title: 'Mi cumpleaños',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgColor: '#fafafa',
    user: {
      _id: '12345',
      name: 'Deymer'
    }
  }],
  eventActive: null
}
export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return { ...state, eventActive: action.payload }
    case types.eventAddNew:
      return { ...state, events: [...state.events, action.payload] }
    case types.eventClearActive:
      return { ...state, eventActive: null }
    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map(e =>
          (e.id === action.payload.id) ? action.payload : e)
      }
    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter(e =>
          (e.id !== state.eventActive.id)),
        eventActive: null
      }
    default:
      return state;
  }
}
