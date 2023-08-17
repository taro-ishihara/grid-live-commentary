import './Timeline.css'

type Event = {
  actor: string
  start: Date
  end: Date
  event: string
  delay: number
}

type Player = {
  id: string
  name: string
  team: string
}

type Timeline = {
  start: Date
  range: number // ms
  events: Event[]
}

const Timeline = () => {
  const events: Event[] = [
    {
      actor: '1',
      start: new Date('2023-08-14T12:00:00'),
      end: new Date('2023-08-14T12:00:20'),
      event: 'kill',
      delay: 0,
    },
    {
      actor: '3',
      start: new Date('2023-08-14T12:00:20'),
      end: new Date('2023-08-14T12:00:30'),
      event: 'revive',
      delay: 25,
    },
    {
      actor: '2',
      start: new Date('2023-08-14T12:00:30'),
      end: new Date('2023-08-14T12:00:45'),
      event: 'kill',
      delay: 0,
    },
    {
      actor: '3',
      start: new Date('2023-08-14T12:00:45'),
      end: new Date('2023-08-14T12:00:50'),
      event: 'kill',
      delay: 0,
    },
    {
      actor: '4',
      start: new Date('2023-08-14T12:00:50'),
      end: new Date('2023-08-14T12:01:10'),
      event: 'kill',
      delay: 0,
    },
    {
      actor: '1',
      start: new Date('2023-08-14T12:01:10'),
      end: new Date('2023-08-14T12:01:20'),
      event: 'kill',
      delay: 0,
    },
    {
      actor: '3',
      start: new Date('2023-08-14T12:01:20'),
      end: new Date('2023-08-14T12:01:40'),
      event: 'revive',
      delay: 25,
    },
    {
      actor: '2',
      start: new Date('2023-08-14T12:01:40'),
      end: new Date('2023-08-14T12:01:55'),
      event: 'kill',
      delay: 0,
    },
    {
      actor: '3',
      start: new Date('2023-08-14T12:01:55'),
      end: new Date('2023-08-14T12:02:50'),
      event: 'kill',
      delay: 0,
    },
  ]

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
  ]

  const uniqueTeams = Array.from(new Set(players.map((player) => player.team)))

  const calculateEventStyle = (event: Event) => {
    const now = new Date('2023-08-14T12:00:00') // Date.now()
    const totalMilliseconds = 60_000
    const eventMilliseconds = event.end.getTime() - event.start.getTime()
    const eventWidthPercent = (eventMilliseconds / totalMilliseconds) * 100
    const eventPositionPercent =
      ((event.start.getTime() - now.getTime()) / totalMilliseconds) * 100
    return {
      width: eventWidthPercent + '%',
      marginLeft: eventPositionPercent + '%',
    }
  }

  const calculateGhostEventStyle = (event: Event) => {
    const eventStyle = calculateEventStyle(event)
    const totalMilliseconds = 60_000
    const eventDelayPercent = ((event.delay * 1000) / totalMilliseconds) * 100
    return {
      width: eventStyle.width,
      marginLeft:
        parseFloat(eventStyle.marginLeft.slice(0, -1)) -
        eventDelayPercent +
        '%',
    }
  }

  return (
    <div className="relative pb-4">
      {/* gray box */}
      <div className="absolute pl-12 pr-4 w-full h-full z-30">
        <div className="w-1/2 h-full bg-gray-500 opacity-50"></div>
      </div>
      {/* time scale */}
      <div className="absolute pl-12 pr-4 w-full h-full z-10">
        <div className="relative overflow-hidden h-full">
          <div className="relative h-full grid grid-cols-6 divide-x divide-slate-500 divide-dashed border-x border-slate-700 text-xs marquee">
            <div className="pl-2 pb-0.5 flex flex-col justify-end">0:00</div>
            <div className="pl-2 pb-0.5 flex flex-col justify-end">0:10</div>
            <div className="pl-2 pb-0.5 flex flex-col justify-end">0:20</div>
            <div className="pl-2 pb-0.5 flex flex-col justify-end">0:30</div>
            <div className="pl-2 pb-0.5 flex flex-col justify-end">0:40</div>
            <div className="pl-2 pb-0.5 flex flex-col justify-end">0:50</div>
          </div>
        </div>
      </div>
      {/* event items */}
      <div className="absolute pl-12 pr-4 w-full h-full z-20">
        <div className="relative overflow-hidden h-full">
          {uniqueTeams.map((team: any) => (
            <div key={team} className="my-1 py-1 border-slate-800 border-y">
              <ul>
                {players
                  .filter((player) => player.team === team)
                  .map((player) => (
                    <li className="flex">
                      <div className="rounded-md my-1 w-full">
                        <div className="overflow-hidden my-0.5 h-4">
                          <div className="relative marquee">
                            {events
                              .filter((event) => event.actor === player.id)
                              .map((event) => (
                                <>
                                  <div
                                    className="absolute h-4 rounded-xl bg-violet-300
                              bg-stripes bg-stripes-white z-10"
                                    style={calculateGhostEventStyle(event)}
                                  ></div>
                                  <div
                                    className="absolute h-4 rounded-xl flex items-center justify-center bg-violet-700 shadow-lg z-20 text-white text-sm font-bold font-mono"
                                    style={calculateEventStyle(event)}
                                  >
                                    {event.event}
                                  </div>
                                </>
                              ))}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* background */}
      <div className="absolute w-12 h-full bg-slate-800"></div>
      <div className="relative w-full overflow-hidden mt-1 pr-2">
        {uniqueTeams.map((team) => (
          <div
            key={team}
            className={`my-1 py-1 border-slate-800 border border-l-0 ${
              team === 'ct' ? 'bg-indigo-100' : 'bg-rose-100'
            }`}
          >
            <ul>
              {players
                .filter((player) => player.team === team)
                .map((player) => (
                  <li className="flex z-0">
                    <div
                      className={`w-[50.5px] h-9 -my-1 flex items-center justify-center text-white ${
                        team === 'ct' ? 'bg-indigo-800' : 'bg-rose-800'
                      }`}
                    >
                      {player.name.slice(0, 3)}
                    </div>
                    <div className="relative my-1 mr-2 w-full">
                      <div className=" my-0.5 h-4 bg-neutral-100"></div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
export { Timeline }
