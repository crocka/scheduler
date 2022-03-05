export function getAppointmentsForDay(state, day) {

  //find the selected day
  const selectedDay = state.days.filter(sday => sday.name === day);

  // if the selected day does not exist
  if (selectedDay.length === 0) {

    return [];

  } else {

    //return an array of appointment object of the day
    return selectedDay[0].appointments.map(num => state.appointments[num]);

  };

};


export function getInterview(state, interview) {

  let interviewInfo = null;

  //if interview is not null
  if (interview) {

    //copy the interview to a new object
    interviewInfo = {...interview};

    //insert the interviewer object to interviewInfo
    interviewInfo.interviewer = state.interviewers[interview.interviewer];

  }

  return interviewInfo;

};

export function getInterviewersForDay(state, day) {

  //find the object of the selected day
  const selectedDay = state.days.filter(sday => sday.name === day);

  // if the selected day does not exist
  if (selectedDay.length === 0) {

    return [];

  } else {

    //return an array of interviewers specific to that day
    return selectedDay[0].interviewers.map(num => state.interviewers[num]);

  };

};
