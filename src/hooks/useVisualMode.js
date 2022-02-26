const { useState } = require("react");

export default function useVisualMode(mod) {

  const [mode, setMode] = useState(mod);
  // eslint-disable-next-line no-unused-vars
  const [history, setHistory] = useState([mod]);

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