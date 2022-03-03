const { useState } = require("react");

export default function useVisualMode(mod) {

  const [mode, setMode] = useState(mod);
  
  //history of mode in an array
  // eslint-disable-next-line no-unused-vars
  const [history, setHistory] = useState([mod]);

  //function to manage the transition of mode
  const transition = function (mode, replace = false) {

    //if replace is true, setmode without pushing to history array
    if (replace) {

      setMode(mode);

    } else {
      
      //otherwise, push into the history array to remember
      history.push(mode);
      setMode(mode);

    }

  }

  //function to take you back to the previous mode 
  const back = function () {

    //check if you can still go back
    if (history.length - 2 >= 0) {

      setMode(history[history.length - 2]);
      history.pop();//take away the last mode you were on

    }

  }

  return {

    mode,
    transition,
    back

  };

};