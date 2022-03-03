import React from "react";

import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";

import useApplicationData from "hooks/useApplicationData";

export default function Application() {

  //get the nessesary functions and state from custom hook
  const {

    state,
    setDay,
    bookInterview,
    cancelInterview

  } = useApplicationData();

  let dailyAppointments = [];

  //find appointments of one day
  dailyAppointments = getAppointmentsForDay(state, state.day);

  //loop through the dailyAppointments to get interview info for each apointment of the day
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        day={state.day}
        interview={interview}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  //return the jsx
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