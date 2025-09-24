import { useState, useEffect, use } from 'react'
import './App.css'


function App() {

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      
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
  return (
    <>
      <h1>CRONÓMETRO DB</h1>
      <div className="cronometro-container">
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <span className="time, countdown font-mono text-5xl">
              {hour.toString().padStart(2, '0')}:{minute.toString().padStart(2, '0')}:{second.toString().padStart(2, '0')} 
            </span>
        </div>
        
        <div className="card-actions justify-end">
            <button className="btn btn-primary">LAP</button>
            <button className="btn btn-primary">STOP</button>
        </div>
      </div>
    </>
  )
}

export default App
