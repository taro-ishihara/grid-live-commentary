import { Settings } from './settings/Settings'
import { PlayerCard } from './PlayerCard'
import { useEvents } from '../contexts/EventsContext'
import { Game } from '../../types/game'

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  const formattedMinutes = minutes.toString()
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds.toString()

  return `${formattedMinutes}:${formattedSeconds}`
}

const SideBar = () => {
  const game: Game = useEvents().state.currentGame
  return (
    <div className="flex flex-col min-w-[280px] h-auto bg-slate-800">
      <div className="flex justify-between text-white mx-4 my-2">
        <div>Round {game.sequenceNumber}</div>
        <div>{formatTime(game.clock.currentSeconds)}</div>
      </div>
      {game.teams.map((team) => (
        <div className="">
          <div className="bg-slate-200 grid grid-cols-4 divide-x divide-slate-500 border-b-2 border-slate-600">
            <div className="flex col-span-2 justify-center items-center font-bold text-sm truncate">
              {team.name}
            </div>
            <div
              className={`${
                team.side === 'radiant' ? 'bg-indigo-800' : 'bg-rose-800'
              } text-white flex justify-center items-center h-8 border-t border-slate-600`}
            >
              {team.side}
            </div>
            <div className="flex justify-center items-center">{team.kills}</div>
          </div>

          {team.players.map((player) => (
            <PlayerCard {...player} />
          ))}
        </div>
      ))}
      <div className="relative flex-grow">
        <Settings />
      </div>
    </div>
  )
}

export { SideBar }
