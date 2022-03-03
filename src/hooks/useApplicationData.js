import axios from "axios";
const { useReducer, useEffect } = require("react");

export default function useApplicationData() {

  //Reduce functions selector
  const reducers = {

    SET_DAY(state, action) {

      return state = { ...state, day: action.day };

    },

    SET_DAYS(state, action) {

      return state = { ...state, days: action.days };

    },

    SET_APPLICATION_DATA(state, action) {

      return state = { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers };

    },

    SET_INTERVIEW(state, action) {

      //make a new appointment object with the new appointment
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview
      };

      //make a new appointments object with the updated appointment object
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };

      //update state with new appointments
      state = { ...state, appointments }

      //make a new days object
      const days = [...state.days];

      let spots = 0;

      //count free spots using the updated state object
      days[action.daysId].appointments.forEach((appointment) => {

        state.appointments[appointment].interview ? spots += 0 : spots += 1;

      });

      //send the updated spots to our days object
      days[action.daysId].spots = spots;

      //return the updated state
      return state = { ...state, days };

    }

  };

  //generate reducer function
  function reducer(state, action) {

    return reducers[action.type](state, action) || state;

  };

  //set state using useReducer
  const [state, dispatch] = useReducer(reducer, {

    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}

  });

  //package setDay function
  const setDay = day => dispatch({ type: 'SET_DAY', day });

  //axios requests
  useEffect(() => {

    Promise.all([

      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')

    ]).then(response => {

      dispatch({ type: 'SET_APPLICATION_DATA', days: response[0].data, appointments: response[1].data, interviewers: response[2].data });

    });

  }, []);

  //bookInterview function that calls SET_INTERVIEW reducer to update the interviews and spots
  function bookInterview(id, interview, dayIndex) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return (axios.put(`http://localhost:8001/api/appointments/${id}`, { ...appointment })
      .then(() => {

        dispatch({ type: 'SET_INTERVIEW', id, daysId: dayIndex, interview });

      })

    );

  };

  //cancelInterview function that calls SET_INTERVIEW reducer to update the interviews to null and spots
  function cancelInterview(id, dayIndex) {

    return (axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {

        dispatch({ type: 'SET_INTERVIEW', id, daysId: dayIndex, interview: null });

      })

    );

  };

  //return the functions and state that application needs
  return {

    state,
    setDay,
    bookInterview,
    cancelInterview

  };


};