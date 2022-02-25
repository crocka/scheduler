export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter(sday => sday.name === day);

  if (selectedDay.length === 0) {

    return [];

  } else {

    return selectedDay[0].appointments.map(num => state.appointments[num]);

  };

};


export function getInterview(state, interview) {

  let interviewInfo = interview;

  if (interview) {

    interviewInfo.interviewer = state.interviewers[interview.interviewer];

  }

  return interviewInfo;

};

export function getInterviewersForDay(state, day) {

  const selectedDay = state.days.filter(sday => sday.name === day);

  if (selectedDay.length === 0) {

    return [];

  } else {

    return selectedDay[0].interviewers.map(num => state.interviewers[num]);

  };

};
