import { useState, useRef, useEffect } from 'react'
import { Game } from '../../../types/game'
import { useEvents } from '../../contexts/EventsContext'
import { Background } from './Background'
import { PlayerLabels } from './PlayerLabel'
import { Scale } from './Scale'
import { Event } from '../../../types/event'
import './scroll.css'

const Timeline = () => {
  const game: Game = useEvents().state.currentGame
  const events: Event[] = useEvents().events
  const getOngoingGame = (event: Event) => {
    if (!('seriesState' in event)) {
      return null
    }
    const ongoingGames = event.seriesState.games.filter(
      (game: Game) => game.started && !game.finished,
    )
    if (ongoingGames.length === 0) {
      return null
    }
    return ongoingGames[0]
  }

  const killEvents = events.filter(
    (event) => getOngoingGame(event) && event.actor.type === 'player',
  )
  const scrollRef = useRef(null)
  const [latestClock, setLatestClock] = useState({ seq: -1, time: -9999 })

  const getClock = (event: Event) => {
    const ongoingGame = getOngoingGame(event)
    if (!ongoingGame) {
      return { seq: -1, time: -9999 }
    }
    return {
      seq: ongoingGame.sequenceNumber,
      time: ongoingGame.clock.currentSeconds,
    }
  }

  useEffect(() => {
    const latestEvents = events.slice(-1)
    if (latestEvents.length !== 0) {
      const latestEvent = latestEvents[0]
      const latestClock = getClock(latestEvent)
      if (latestClock.seq !== -1) {
        setLatestClock(latestClock)
      }
    }
  }, [events])

  const filterEventsByTime = (events: Event[]) => {
    return events.filter((event) => {
      const clock = getClock(event)
      return latestClock.time - clock.time < 60 && latestClock.seq === clock.seq
    })
  }

  const calculateEventStyle = (event: any) => {
    const currentGameClockSeconds = event.seriesState.games.filter(
      (game: Game) => game.started && !game.finished,
    )[0].clock.currentSeconds
    const marginLeft =
      (((latestClock.time - currentGameClockSeconds) % 60) / 60) * 100
    return {
      marginLeft: marginLeft + '%',
    }
  }

  return (
    <div className="flex min-w-[980px] bg-neutral-100">
      <div className=" bg-slate-800">
        <PlayerLabels teams={game.teams} />
      </div>
      <div className="relative w-full pb-3 mr-2">
        {/* gray box */}
        {/* <div className="absolute w-1/2 h-full bg-gray-500 opacity-50 z-30"></div> */}
        {/* time scale */}
        <Scale {...latestClock} />
        {/* event items */}
        <div className="absolute w-full h-full z-20">
          <div className="relative overflow-hidden pt-2 h-full">
            {game.teams.map((team) => (
              <div className="mb-2 border-y border-transparent">
                {team.players.map((player) => (
                  <div className="flex items-center h-6">
                    {filterEventsByTime(killEvents)
                      .filter((event) => event.actor.id === player.id)
                      .map((event) => (
                        <div
                          className="absolute w-36 h-4 rounded-xl flex items-center justify-center bg-violet-700 shadow-lg z-20 text-white text-sm font-bold font-mono"
                          style={calculateEventStyle(event)}
                        >
                          {event.action}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* background */}
        <Background numPlayers={5} reverse={false} />
      </div>
    </div>
  )
}
export { Timeline }
