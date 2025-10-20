import { useReducer, useEffect } from 'react'
import './App.css'

type State = {
  hour: number
  minute: number
  second: number
  laps: string[]
}

type Action =
  | { type: 'TICK' }
  | { type: 'LAP' }
  | { type: 'RESET' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TICK': {
      let { hour, minute, second } = state

      if (second === 59) {
        second = 0
        if (minute === 59) {
          minute = 0
          hour = hour === 23 ? 0 : hour + 1
        } else {
          minute = minute + 1
        }
      } else {
        second = second + 1
      }

      return { ...state, hour, minute, second }
    }

    case 'LAP': {
      const lap =
        'LAP: ' +
        state.hour.toString().padStart(2, '0') +
        ':' +
        state.minute.toString().padStart(2, '0') +
        ':' +
        state.second.toString().padStart(2, '0')
      return { ...state, laps: [...state.laps, lap] }
    }

    case 'RESET':
      return { hour: 0, minute: 0, second: 0, laps: [] }

    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    hour: 0,
    minute: 0,
    second: 0,
    laps: []
  })

  useEffect(() => {
    const interval = window.setInterval(() => {
      dispatch({ type: 'TICK' })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  function listaLaps() {
    dispatch({ type: 'LAP' })
    // si quieres mantener el console.log original:
    // const last = state.hour.toString().padStart(2, '0') + ':' + state.minute.toString().padStart(2, '0') + ':' + state.second.toString().padStart(2, '0')
    // console.log('LAP: ' + last)
  }

  function handleStopReset() {
    dispatch({ type: 'RESET' })
  }

  return (
    <>
      <h1>CRONÓMETRO DB</h1>
      <div className="cronometro-container">
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          <span className="time countdown font-mono text-5xl">
            {state.hour.toString().padStart(2, '0')}:
            {state.minute.toString().padStart(2, '0')}:
            {state.second.toString().padStart(2, '0')}
          </span>
        </div>

        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={listaLaps}>
            LAP
          </button>
          <button className="btn btn-primary" onClick={handleStopReset}>
            STOP
          </button>
        </div>

        {state.laps.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <table className="table-auto">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Lap</th>
                </tr>
              </thead>
              <tbody>
                {state.laps.map((lap, idx) => (
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
