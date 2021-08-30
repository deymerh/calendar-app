import React from 'react';

export const CalendarEvent = ({ event }) => {
  return (
    <div>
      <span>{event.title}</span>
      <strong> - {event.user.name}</strong>
    </div>
  )
}
