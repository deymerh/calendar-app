import Swal from 'sweetalert2';
import { fetchWithToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepareEvents';
import { types } from '../types/types';

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { name, uid } = getState().auth;
    try {
      const res = await fetchWithToken('events', event, 'POST');
      const body = await res.json();
      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name: name
        }
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
});

export const eventClearActive = () => ({ type: types.eventClearActive });

export const eventStartDeleted = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.eventActive;
    try {
      const res = await fetchWithToken(`events/${id}`, {}, 'DELETE');
      const body = await res.json();
      if (body.ok) {
        dispatch(eventDeleted());
        Swal.fire('Ok', body.msg, 'success');
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventDeleted = () => ({ type: types.eventDeleted });

export const startEventsLoaded = () => {
  return async (dispatch) => {
    const res = await fetchWithToken('events');
    const body = await res.json();
    const events = prepareEvents(body.events);
    dispatch(eventsLoaded(events));
  };
};

export const eventStartUpdate = (event) => {
  return async (dispath) => {
    try {
      const res = await fetchWithToken(`events/${event.id}`, event, 'PUT');
      const body = await res.json();
      console.log(body);
      if (body.ok) {
        dispath(eventUpdated(event));
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event
});

const eventsLoaded = (events) => ({
  type: types.eventsLoaded,
  payload: events
});

export const eventLogout = () => ({ type: types.eventsLogout });