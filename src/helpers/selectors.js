export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter(sday => sday.name === day);

  if (selectedDay.length === 0) {

    return [];

  } else {

    return selectedDay[0].appointments.map(num => state.appointments[num]);

  }

};