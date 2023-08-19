import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'

const EventsContext = createContext<any>('')

const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/2364966')
    ws.onopen = () => {
      // do nothing
    }
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data)
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
    <EventsContext.Provider value={events}>{children}</EventsContext.Provider>
  )
}

const useEvents = () => useContext(EventsContext)

export { EventsProvider, useEvents }
