const { useEffect, useState } = require("react");

export default function useVisualMode(mod) {

  const [mode, setMode] = useState(mod);
  const [history, setHistory] = useState([mod]);

  const transition = function(mode, replace=false) {

    if(replace) {

      setMode(mode);
     
    } else {

      setMode(prev => {

        history.push(prev);
        return mode;
  
      });

    }

  }

  const back = function() {

    setMode(history[history.length - 1]);

  }

  return {

    mode,
    transition,
    back

  };

};