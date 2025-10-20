import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {

      setHour((prevHour) => {
        if (prevHour === 23) {
          return 0;
        } else {
          return prevHour;
        }
      });

      setMinute((prevMinute) => {
        if (prevMinute === 59) {
          setHour((prevHour) => (prevHour === 23 ? 0 : prevHour + 1));
          return 0;
        } else {
          return prevMinute;
        }
      });

      setSecond((prevSecond) => {
        if (prevSecond === 59) {
          setMinute((prevMinute) => (prevMinute === 59 ? 0 : prevMinute + 1));
          return 0;
        } else {
          return prevSecond + 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  } , []);

  const [listLaps, setLaps] = useState<string[]>([]);

  function listaLaps() {
    const laps = "LAP: " + hour.toString().padStart(2, '0') + ":" + minute.toString().padStart(2, '0') + ":" + second.toString().padStart(2, '0');
    setLaps(prev => [...prev, laps]);
    console.log(laps);
    return laps;
  }

  function handleStopReset() {
    setHour(0);
    setMinute(0);
    setSecond(0);
    setLaps([]);
  }

  return (
    <>
      <h1>CRONÓMETRO DB</h1>
      <div className="cronometro-container">
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <span className="time countdown font-mono text-5xl">
              {hour.toString().padStart(2, '0')}:{minute.toString().padStart(2, '0')}:{second.toString().padStart(2, '0')}
            </span>
        </div>

        <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={listaLaps}>LAP</button>
            <button className="btn btn-primary" onClick={handleStopReset}>STOP</button>
        </div>

        {listLaps.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <table className="table-auto">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Lap</th>
                </tr>
              </thead>
              <tbody>
                {listLaps.map((lap, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{lap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}

export default App
