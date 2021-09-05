import React, { useEffect, useState } from 'react';
import { momentLocalizer, Calendar } from 'react-big-calendar';
import moment from 'moment';
import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActive, eventSetActive, startEventsLoaded } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

const localizer = momentLocalizer(moment)

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
  const { events, eventActive } = useSelector(state => state.calendar);
  const { uid } = useSelector(state => state.auth);
  useEffect(() => {
    dispatch(startEventsLoaded())
  }, [dispatch]);

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };
  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  };
  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };
  const onSelectSlot = (e) => {
    dispatch(eventClearActive());
  };
  const evenStyleGetter = (event, start, end, isSelect) => {
    const style = {
      backgroundColor: (uid === event.id) ? '#367CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }
    return { style }
  }
  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '500' }}
        messages={messages}
        eventPropGetter={evenStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        onSelectSlot={onSelectSlot}
        selectable={true}
      />
      <CalendarModal />
      <AddNewFab />
      {
        eventActive && (
          <DeleteEventFab />
        )
      }
    </div>
  )
}
