import { Player } from '../../types/player'
import { Settings } from './settings/Settings'
import { PlayerCard } from './PlayerCard'
import { useEvents } from '../contexts/EventsContext'

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
  {
    id: '9',
    name: 'player9',
    team: 'tr',
  },
  {
    id: '10',
    name: 'player10',
    team: 'ct',
  },
]

const uniqueTeams = Array.from(new Set(players.map((player) => player.team)))

const SideBar = () => {
  const state = useEvents().state
  return (
    <div className="flex flex-col min-w-[280px] h-auto bg-slate-800">
      <div className="flex justify-between text-white mx-4 my-2">
        <div>Round 1</div>
        <div>01:27</div>
      </div>
      {uniqueTeams.map((team) => (
        <div className="">
          <div className="bg-slate-200 grid grid-cols-3 divide-x divide-slate-500 border-b-2 border-slate-600">
            <div className="flex justify-center items-center font-bold">
              {team === 'ct' ? 'FNATIC' : 'ZETA'}
            </div>
            <div
              className={`${
                team === 'ct' ? 'bg-indigo-800' : 'bg-rose-800'
              } text-white flex justify-center items-center h-8 border-t border-slate-600`}
            >
              {team === 'ct' ? 'Counter' : 'Terrorist'}
            </div>
            <div className="flex justify-center items-center">10</div>
          </div>

          {players
            .filter((player) => player.team === team)
            .map((player) => (
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
