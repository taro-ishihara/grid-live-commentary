import { Game } from '../../../types/game'
import { useEvents } from '../../contexts/EventsContext'
import { Background } from './Background'
import { PlayerLabels } from './PlayerLabel'
import { Scale } from './Scale'
import './scroll.css'

const Timeline = () => {
  const game: Game = useEvents().state.currentGame
  const events = useEvents().events
  const killEvents = events.filter(
    (event: any) => event.type === 'player-killed-player',
  )

  const calculateEventStyle = (event: any) => {
    const totalSeconds = 60
    const currentGameClockSeconds = event.seriesState.games.filter(
      (game: Game) => game.started && !game.finished,
    )[0].clock.currentSeconds
    const marginLeft =
      ((currentGameClockSeconds % totalSeconds) / totalSeconds) * 100
    return {
      width: '10%',
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
        <div className="absolute w-1/2 h-full bg-gray-500 opacity-50 z-30"></div>
        {/* time scale */}
        <Scale />
        {/* event items */}
        <div className="absolute w-full h-full z-20">
          <div className="relative overflow-hidden pt-2 h-full">
            <div className="scroll">
              {game.teams.map((team) => (
                <div className="mb-2 border-y border-transparent">
                  {team.players.map((player) => (
                    <div className="flex items-center h-6">
                      {killEvents
                        .slice(-100)
                        .filter((event: any) => event.actor.id === player.id)
                        .map((event: any) => (
                          <div
                            className="absolute h-4 rounded-xl flex items-center justify-center bg-violet-700 shadow-lg z-20 text-white text-sm font-bold font-mono"
                            style={calculateEventStyle(event)}
                          >
                            Kill
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* background */}
        <Background numPlayers={5} reverse={false} />
      </div>
    </div>
  )
}
export { Timeline }
