import { useGrid } from '../../contexts/GridContext'

const PlayerLabels = () => {
  const grid = useGrid()

  return grid.state.teams.map((team) => (
    <div
      className={`w-20 my-2 ${
        team.side === 'radiant' ? 'bg-indigo-800' : 'bg-rose-800'
      } border-y border-transparent`}
    >
      {team.players.map((player) => (
        <div className="h-6 pt-1 px-2 text-white text-xs truncate">
          {player.name}
        </div>
      ))}
    </div>
  ))
}

export { PlayerLabels }
