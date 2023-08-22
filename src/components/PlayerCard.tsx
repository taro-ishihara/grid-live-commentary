import { Player } from '../types/grid'

const PlayerCard = (player: Player) => {
  return (
    <div
      className={`pl-4 h-10 rounded bg-white m-2 ${
        player.id === '4' ? 'ml-8' : 'mr-8'
      }`}
    >
      <div className="h-5 flex items-center text-slate-800 font-medium">
        {player.name}
      </div>
      <div className="mt-1 grid grid-cols-3">
        <div></div>
        <div className="flex">
          <div className="w-4 ring ring-inset ring-slate-500"></div>
          <div className="w-4 ring ring-inset ring-slate-500"></div>
          <div className="w-4 ring ring-inset ring-slate-500"></div>
          <div className="w-4 ring ring-inset ring-slate-500"></div>
          <div className="w-4 ring ring-inset ring-slate-500"></div>
        </div>
        <div>
          <div className="h-2 bg-green-600"></div>
          <div className="h-2 bg-blue-600"></div>
        </div>
      </div>
    </div>
  )
}

export { PlayerCard }
