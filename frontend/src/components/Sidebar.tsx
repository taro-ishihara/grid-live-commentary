import { Player } from '../../types/player'

const players: Player[] = [
  {
    id: '1',
    name: 'player1',
    team: 'ct',
  },
  {
    id: '2',
    name: 'player2',
    team: 'ct',
  },
  {
    id: '3',
    name: 'player3',
    team: 'tr',
  },
  {
    id: '4',
    name: 'player4',
    team: 'tr',
  },
  {
    id: '5',
    name: 'player5',
    team: 'ct',
  },
  {
    id: '6',
    name: 'player6',
    team: 'ct',
  },
  {
    id: '7',
    name: 'player7',
    team: 'tr',
  },
  {
    id: '8',
    name: 'player8',
    team: 'tr',
  },
]

const uniqueTeams = Array.from(new Set(players.map((player) => player.team)))

const Sidebar = () => {
  return (
    <div className="min-w-[300px] bg-slate-800">
      {uniqueTeams.map((team) => (
        <ul className="">
          <div
            className={`${
              team === 'ct' ? 'bg-indigo-800' : 'bg-rose-800'
            } text-white flex justify-center items-center h-8 border-t border-slate-600`}
          >
            {team === 'ct' ? 'Counter Terrorist' : 'Terrorist'}
          </div>
          <div className="bg-slate-200 flex justify-center items-center border-b-2 border-slate-600">
            {team === 'ct' ? 'FNATIC' : 'ZETA'}
          </div>
          {players
            .filter((player) => player.team === team)
            .map((player) => (
              <li
                className={`pl-4 h-12 rounded bg-neutral-100 m-3 ${
                  player.id === '4' ? 'ml-16' : 'mr-16'
                }`}
              >
                <div className="h-6 flex items-center">{player.name}</div>
                <div className="mt-1">
                  <div className="h-2 bg-gray-500"></div>
                  <div className="h-2 bg-amber-500"></div>
                </div>
              </li>
            ))}
        </ul>
      ))}
    </div>
  )
}

export { Sidebar }
