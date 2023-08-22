import { useGrid } from '../../contexts/GridContext'
import { xor } from '../../utilities/xor'

const Background = () => {
  const grid = useGrid()
  const reverse = false

  return (
    <div>
      {grid.state.teams.map((team, index) => (
        <div
          className={`${
            xor(!Boolean(index), reverse) ? 'bg-indigo-100' : 'bg-rose-100'
          } my-2 divide-y divide-slate-400 border border-l-0 border-slate-500`}
        >
          {team.players.map((player) => (
            <div key={player.id} className="h-6"></div>
          ))}
        </div>
      ))}
    </div>
  )
}

export { Background }
