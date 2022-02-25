const { useEffect, useState } = require("react");

export default function useVisualMode(mod) {

  const [mode, setMode] = useState(mod);

  const transition = function() {

    setMode(mod);

  }

  const back = function() {

    
  }

  return {

    mode,
    transition,
    back

  };

};