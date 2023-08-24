import { Settings } from './settings/Settings'
import { PlayerCard } from './PlayerCard'
import { useGrid } from '../contexts/GridContext'

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  const formattedMinutes = minutes.toString()
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds.toString()

  return `${formattedMinutes}:${formattedSeconds}`
}

const LeftBar = () => {
  const grid = useGrid()
  return (
    <div className="flex flex-col min-w-[320px] bg-slate-800">
      <div className="flex justify-between text-white mx-4 my-2">
        <div>
          {grid.state.timer.seq === -1 ? '' : `Round ${grid.state.timer.seq}`}
        </div>
        <div>
          {grid.state.timer.time === -9999
            ? 'Ongoing game not detected'
            : formatTime(grid.state.timer.time)}
        </div>
      </div>
      {grid.state.ongoingGame
        ? grid.state.ongoingGame.teams.map((team) => (
            <div key={team.id}>
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
                <div className="flex justify-center items-center">
                  {team.kills}
                </div>
              </div>
              {team.players.map((player) => (
                <PlayerCard key={player.id} {...player} />
              ))}
            </div>
          ))
        : ''}
      <div className="relative flex-grow">
        <Settings />
      </div>
    </div>
  )
}

export { LeftBar }
