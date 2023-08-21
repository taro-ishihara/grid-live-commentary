import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { Game } from '../../types/game'
import { Event } from '../../types/event'
import initData from './initial-data.json'
import { State } from '../../types/state'

const EventsContext = createContext<any>('')

const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([])
  const [state, setState] = useState<State>(initData)

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/2364966')
    ws.onopen = () => {
      // do nothing
    }
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data)
      response.events.map((event: Event) => {
        const games: Game[] =
          'seriesState' in event ? event.seriesState.games : []
        const ongoingGames = games.filter(
          (game) => game.started && !game.finished,
        )
        ongoingGames.length > 0
          ? setState({
              ...event.seriesState,
              currentGame: ongoingGames[0],
            })
          : null
        setEvents((prevEvents) => [...prevEvents, event])
      })
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
