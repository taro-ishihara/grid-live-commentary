import { useEvents } from '../../contexts/EventsContext'
import { Background } from './Background'
import { Scale } from './Scale'
import './scroll.css'

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
  const eventsl = useEvents()
  console.log(eventsl)

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
    {
      actor: '5',
      start: new Date('2023-08-14T12:02:50'),
      end: new Date('2023-08-14T12:02:55'),
      event: 'kill',
      delay: 0,
    },
    {
      actor: '6',
      start: new Date('2023-08-14T12:02:55'),
      end: new Date('2023-08-14T12:03:00'),
      event: 'kill',
      delay: 0,
    },
    {
      actor: '7',
      start: new Date('2023-08-14T12:03:00'),
      end: new Date('2023-08-14T12:03:00'),
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
      name: 'playeraaaaaaaaaaaaa2',
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
      team: 'ct',
    },
    {
      id: '10',
      name: 'player10',
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

  const createPlayerLabels = (players: Player[], team: string) => {
    const teamPlayers = players.filter((player) => player.team === team)
    return teamPlayers.map((player) => (
      <div className="h-6 pt-1 px-2 text-white text-xs truncate">
        {player.name}
      </div>
    ))
  }

  const getTeamPlayers = (players: Player[], team: string) => {
    const teamPlayers = players.filter((player) => player.team === team)
    return teamPlayers
  }

  const getEventByPlayer = (events: Event[], playerId: string) => {
    return events.filter((event) => event.actor === playerId)
  }

  const createEvents = (team: string) => {
    return getTeamPlayers(players, team).map((player) => (
      <div className="flex items-center h-6">
        {getEventByPlayer(events, player.id).map((event) => (
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
    ))
  }

  return (
    <div className="flex min-w-[980px] bg-neutral-100">
      <div className=" bg-slate-800">
        <div className="w-20 my-2 bg-indigo-800 border-y border-transparent">
          {createPlayerLabels(players, 'ct')}
        </div>
        <div className="w-20 bg-rose-800 border-y border-transparent">
          {createPlayerLabels(players, 'tr')}
        </div>
      </div>
      <div className="relative w-full pb-3 mr-2">
        {/* gray box */}
        <div className="absolute w-1/2 h-full bg-gray-500 opacity-50 z-30"></div>
        {/* time scale */}
        <Scale />
        {/* event items */}
        <div className="absolute w-full h-full z-20">
          <div className="relative overflow-hidden pt-2 h-full">
            <div className="scroll">
              <div className="border-y border-transparent">
                {createEvents('ct')}
              </div>
              <div className="mt-2 border-y border-transparent">
                {createEvents('tr')}
              </div>
            </div>
          </div>
        </div>
        {/* background */}
        <Background numPlayers={5} reverse={false} />
      </div>
    </div>
  )
}
export { Timeline }
