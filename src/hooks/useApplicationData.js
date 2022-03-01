import axios from "axios";
const { useReducer, useEffect } = require("react");
const WebSocket = require("ws");
const ws = new WebSocket('ws://localhost:8001/');

export default function useApplicationData() {

  useEffect(() => {

    // webSocket.on("connection", socket => {
    //   socket.onmessage = event => {
    //     console.log(`Message Received: ${event.data}`);
    
    //     if (event.data === "ping") {
    //       socket.send(JSON.stringify("pong"));
    //     }
    //   };

    //   socket.send('Hello, server.');
    // });
    
    // ws.on('open', function open() {
    //   ws.send('something');
    // });
    
    // ws.on('message', function incoming(data) {
    //   console.log(data);
    // });


  }, []);

  const reducers = {

    SET_DAY (state, action) {

      return state = {...state, day:action.day};

    },

    SET_DAYS (state, action) {

      return state = {...state, days:action.days};

    },

    SET_APPLICATION_DATA (state, action) {

      return state = {...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers};

    },

    SET_INTERVIEW (state, action) {

      const appointment = {
        ...state.appointments[action.id],
        interview: { ...action.interview }
      };
  
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };

      return state = {...state, appointments};

    }

  };

  function reducer(state, action) {

    return reducers[action.type](state, action) || state;

  };
  
  const [state, dispatch] = useReducer(reducer, {

    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}

  });

  const setDay = day => dispatch({ type: 'SET_DAY', day });

  useEffect(() => {

    Promise.all([

      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')

    ]).then(response => {

      dispatch({type: 'SET_APPLICATION_DATA', days: response[0].data, appointments: response[1].data, interviewers: response[2].data });

    });

  }, []);

  async function bookInterview(id, interview, dayIndex) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };

    return await axios.put(`http://localhost:8001/api/appointments/${id}`, { ...appointment })
      .then(() => dispatch({ type: 'SET_INTERVIEW', id, interview }))
      .then(() => updateSpots(dayIndex));

  };

  async function cancelInterview(id, dayIndex) {

    return await axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        
        dispatch({ type: 'SET_INTERVIEW', id, interview: null });
      
      })
      .then(() => updateSpots(dayIndex));
      // .then(() => );

  };

  function updateSpots(id) {

    // return axios.get('http://localhost:8001/api/days')
    // .then(response => {

    //   dispatch({ type:'SET_DAYS', days: response.data });

    // });

    const days = [...state.days];

    let spots = 0;

    days[id].appointments.forEach((appointment) => {

      state.appointments[appointment].interview ? spots += 0 : spots += 1;

    });

    console.log(spots);


  }



  return {

    state,
    setDay,
    bookInterview,
    cancelInterview

  };


};