import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { State } from '../../types/state'

const EventsContext = createContext<any>('')

const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<any[]>([])
  const [state, setState] = useState<State>()

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/2364966')
    ws.onopen = () => {
      // do nothing
    }
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data)
      const state = response.events[response.events.length - 1].seriesState
      state ? setState(state) : null
      setEvents((prevEvents) => [...prevEvents, response])
    }
    ws.onclose = () => {
      ws.close()
    }
    return () => {
      ws.close()
    }
  }, [])

  return (
    <EventsContext.Provider value={{ events: events, state: state }}>
      {children}
    </EventsContext.Provider>
  )
}

const useEvents = () => useContext(EventsContext)

export { EventsProvider, useEvents }
