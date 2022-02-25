const { useState } = require("react");

export default function useVisualMode(mod) {

  const [mode, setMode] = useState(mod);
  const [history, setHistory] = useState([mod]);

  console.log(history)

  const transition = function (mode, replace = false) {

    if (replace) {

      setMode(mode);

    } else {

      history.push(mode);
      setMode(mode);

    }

  }

  const back = function () {

    if (history.length - 2 >= 0) {

      setMode(history[history.length - 2]);
      history.pop();

    }

  }

  return {

    mode,
    transition,
    back

  };

};