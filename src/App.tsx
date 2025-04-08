import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [stopwatchToggled, setStopwatchToggled] = useState(false);
  const [ms, setMs] = useState<number>(0);
  const [s, setS] = useState<number>(0);
  const [m, setM] = useState<number>(0);
  const [log, setLog] = useState<string[]>([]);

  function handleStart() {
    setStopwatchToggled(!stopwatchToggled);
  }

  function handleReset() {
    setStopwatchToggled(false);
    setMs(0);
    setS(0);
    setM(0);
    setLog([]);
  }

  function handleLog(timeString: string) {
    setLog([timeString, ...log]);
  }

  useEffect(() => {
    let interval = undefined;

    if (stopwatchToggled) {
      interval = setInterval(() => {
        if (ms >= 99) {
          setMs(0);

          if (s >= 59) {
            setS(0);

            if (m >= 59) {
              setM(0);
            } else {
              setM((prevM) => (prevM += 1));
            }
          } else {
            setS((prevS) => (prevS += 1));
          }
        } else {
          setMs((prevMs) => (prevMs += 1));
        }
      }, 10);
    }

    return () => {
      clearInterval(interval);
    };
  }, [stopwatchToggled, ms, s, m]);

  let msString = ms.toString();
  if (msString.length === 1) msString = `0${msString}`;

  let sString = s.toString();
  if (sString.length === 1) sString = `0${sString}`;

  let mString = m.toString();
  if (mString.length === 1) mString = `0${mString}`;

  let hString = m.toString();
  if (hString.length === 1) hString = `0${hString}`;

  return (
    <div className="app">
      <p className="display">
        {mString} : {sString} : {msString}
      </p>
      <div className="controls">
        <button onClick={handleStart}>{stopwatchToggled ? "Stop" : "Start"}</button>{" "}
        <button onClick={handleReset} disabled={ms === 0 && s === 0 && m === 0}>
          Reset
        </button>
        <button
          onClick={() => handleLog(`${mString} : ${sString} : ${msString}`)}
          disabled={!stopwatchToggled}
        >
          Log
        </button>
      </div>
      {log.length > 0 && (
        <div className="log">
          {log.map((logItem, index) => (
            <p key={logItem}><span>{log.length - index}:</span> <span>{logItem}</span></p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
