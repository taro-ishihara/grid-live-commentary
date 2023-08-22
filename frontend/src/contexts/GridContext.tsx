import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { Event, State, Game } from '../../types/grid'
import initData from './initial-data.json'

type Grid = {
  events: Event[]
  state: State
}

const GridContext = createContext<Grid>({
  events: [],
  state: initData,
})

const GridProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([])
  const [state, setState] = useState<State>(initData)

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/2364966')
    ws.onopen = () => {
      // do nothing
    }
    ws.onmessage = (message) => {
      const response = JSON.parse(message.data)
      response.events.map((event: Event) => {
        const games: Game[] =
          'seriesState' in event ? event.seriesState.games : []
        const ongoingGames = games.filter(
          (game) => game.started && !game.finished,
        )
        const ongoingGame = ongoingGames.length > 0 && ongoingGames[0]
        const timer = ongoingGame
          ? {
              seq: ongoingGame.sequenceNumber,
              time: ongoingGame.clock.currentSeconds,
            }
          : { seq: -1, time: -9999 }
        const state = {
          ...event.seriesState,
          ongoingGame: ongoingGame,
          timer: timer,
        }
        'seriesState' in event ? setState(state) : null
        event.seriesState = state
        setEvents((prevEvents) => [...prevEvents.slice(-200), event])
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
    <GridContext.Provider value={{ events: events, state: state }}>
      {children}
    </GridContext.Provider>
  )
}

const useGrid = () => useContext(GridContext)

export { GridProvider, useGrid }
