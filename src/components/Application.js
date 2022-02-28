import React from "react";

import { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({

    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}

  });

  let dailyAppointments = [];

  const setDay = day => setState(prev => ({ ...prev, day }));

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {...appointment})
      .then(() => setState({...state, appointments: appointments}));

  };

  function cancelInterview(id) {
    
    return axios.delete(`http://localhost:8001/api/appointments/${id}`);

  };

  useEffect(() => {

    Promise.all([

      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')

    ]).then(response => {

      setState(prev => ({ ...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data }));

    });

  }, []);

  dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">

          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm"></Appointment>
      </section>
    </main>
  );
};