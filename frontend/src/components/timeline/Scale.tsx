import { useEvents } from '../../contexts/EventsContext'

const Scale = () => {
  const createScale = () => {
    return ['0:00', '0:10', '0:20', '0:30', '0:40', '0:50'].map((time) => {
      return <div className="pl-2 pb-0.5 flex flex-col justify-end">{time}</div>
    })
  }

  return (
    <div className="absolute w-full h-full z-10">
      <div className="flex overflow-hidden h-full">
        <div className="w-full scroll">
          <div className="absolute w-full h-full grid grid-cols-6 divide-x divide-slate-500 divide-dashed border-x border-slate-700 text-xs">
            {createScale()}
          </div>
          <div className="translate-x-full h-full grid grid-cols-6 divide-x divide-slate-500 divide-dashed text-xs">
            {createScale()}
          </div>
        </div>
      </div>
    </div>
  )
}

export { Scale }
