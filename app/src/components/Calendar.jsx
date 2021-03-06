import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import SessionCard from './SessionCard.jsx';

import '../styles/Calendar.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const SessionCalendar = ({
  user,
  sessions,
  regSessions,
}) => {
  const [sessionsList, setSessionsList] = useState([]);
  const [regSessionsList, setRegSessionsList] = useState([]);


  // Watch the session prop, when the value loads and becomes available to use, perform the function
  useEffect(() => {
    // Reformat the session objects into the type accepted by the react big calendar.
    // Store the extra info needed within session card in the other property as an object
    const sessionsColl = [];
    sessions.forEach((sessionObj) => {
      const { name, date, description } = sessionObj;

      sessionsColl.push({
        'title': name,
        'start': new Date(date.slice(6, date.length), date.slice(0, 2) - 1, date.slice(3, 5)),
        'end': new Date(date.slice(6, date.length), date.slice(0, 2) - 1, date.slice(3, 5)),
        'desc': description,
        other: sessionObj,
      });
    });

    // Set the newly formatted collection as the state collection that is passed as the event list to the react big calendar
    setSessionsList(sessionsColl);
  }, [sessions]);

  // Watch the registered sessions prop, when the value loads and becomes available to use, perform the function
  useEffect(() => {
    // Reformat the registered session objects into the type accepted by the react big calendar.
    // Store the extra info needed within session card in the other property as an object
    const regSessionsColl = [];
    regSessions.forEach((regSessionObj) => {
      const { name, date, description } = regSessionObj;

      regSessionsColl.push({
        'title': name,
        'start': new Date(date.slice(6, date.length), date.slice(0, 2) - 1, date.slice(3, 5)),
        'end': new Date(date.slice(6, date.length), date.slice(0, 2) - 1, date.slice(3, 5)),
        'desc': description,
        other: regSessionObj,
      });
    });

    // Set the newly formatted collection as the state collection that is passed as the event list to the react big calendar
    setRegSessionsList(regSessionsColl);
  }, [regSessions]);

  const location = useLocation();

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={location.pathname !== '/registered' ? sessionsList : regSessionsList}
        views={['month', 'agenda']}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: 600, width: 940, border: '#474a2c 1px', borderStyle: 'solid',
        }}
        components={{
          event: SessionCard,
        }}
      />
    </div>
  );
};

export default SessionCalendar;
