import axios from "axios";
const { useState, useEffect } = require("react");



export default function useApplicationData() {

  const [state, setState] = useState({

    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}

  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(() => {

    Promise.all([

      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')

    ]).then(response => {

      setState(prev => ({ ...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data }));

    });

  }, []);

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



  return {

    state,
    setDay,
    bookInterview,
    cancelInterview

  };


};