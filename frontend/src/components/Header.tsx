import { ArrowsRightLeftIcon } from '@heroicons/react/20/solid'
import { useGrid } from '../contexts/GridContext'

const Header = () => {
  const grid = useGrid()
  return (
    <header className="bg-white shadow border-b-2 border-slate-500">
      <div className="px-4 py-2 flex justify-between">
        <h1 className="text-xl font-bold tracking-tight text-gray-700 flex items-center">
          Live Dashboard
        </h1>
        <div className="flex">
          {grid.state.teams.map((team, index) => (
            <div className="flex" key={team.id}>
              <div className="bg-slate-200 shadow shadow-slate-500 rounded mx-4 w-56 flex justify-between items-center px-4">
                {team.name}
                <div className="h-6 w-6 text-xl text-white bg-violet-700 rounded-full flex items-center justify-center">
                  {team.score}
                </div>
              </div>
              {index === 0 ? (
                <button className="middle none center px-1.5 ring-1 ring-slate-800 flex items-center justify-center rounded-lg transition-all hover:opacity-75 focus:ring-1 focus:ring-violet-300 active:opacity-[0.85]">
                  <ArrowsRightLeftIcon className="h-4 w-4" />
                </button>
              ) : null}
            </div>
          ))}
        </div>
        <h1 className="text-l font-bold text-gray-700 flex items-center">
          {grid.state.title.nameShortened}
        </h1>
      </div>
    </header>
  )
}

export { Header }
