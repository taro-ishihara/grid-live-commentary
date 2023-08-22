const Scale = (prop: { seq: number; time: number }) => {
  const createScale = (minutes: number) => {
    return [
      `${minutes + 1}:00`,
      `${minutes}:50`,
      `${minutes}:40`,
      `${minutes}:20`,
      `${minutes}:30`,
      `${minutes}:10`,
    ].map((time) => {
      return <div className="pl-2 pb-0.5 flex flex-col justify-end">{time}</div>
    })
  }

  return (
    <div className="absolute w-full h-full z-10">
      <div className="flex overflow-hidden h-full">
        <div
          className="flex w-full"
          style={{ transform: `translateX(${((prop.time % 60) / 60) * 100}%)` }}
        >
          <div className="absolute w-full h-full grid grid-cols-6 divide-x divide-slate-500 divide-dashed border-x border-slate-700 text-xs">
            {createScale(Math.floor(prop.time / 60 - 1))}
          </div>
          <div className="-translate-x-full w-full h-full grid grid-cols-6 divide-x divide-slate-500 divide-dashed text-xs">
            {createScale(Math.floor(prop.time / 60))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { Scale }
