import { useGrid } from '../../contexts/GridContext'
import { PlayerLabels } from './PlayerLabel'
import { Scale } from './Scale'
import { Background } from './Background'

const Timeline = () => {
  const grid = useGrid()

  return (
    <div className="flex min-w-[980px] bg-neutral-100">
      <div className=" bg-slate-800">
        <PlayerLabels />
      </div>
      <div className="relative w-full pb-3 mr-2">
        {/* gray box */}
        {/* <div className="absolute w-1/2 h-full bg-gray-500 opacity-50 z-30"></div> */}
        {/* time scale */}
        <Scale />
        {/* event items */}
        <div className="absolute w-full h-full z-20">
          <div className="relative overflow-hidden pt-2 h-full">
            {grid.state.teams.map((team) => (
              <div className="mb-2 border-y border-transparent">
                {team.players.map((player) => (
                  <div className="flex items-center h-6">
                    {grid.events
                      .filter(
                        (event) =>
                          event.seriesState.ongoingGame &&
                          event.actor.type === 'player',
                      )
                      .filter((event) => {
                        return (
                          grid.state.timer.time - event.seriesState.timer.time <
                            60 &&
                          grid.state.timer.seq === event.seriesState.timer.seq
                        )
                      })
                      .filter((event) => event.actor.id === player.id)
                      .map((event) => (
                        <div
                          className="absolute w-36 h-4 rounded-xl flex items-center justify-center bg-violet-700 shadow-lg z-20 text-white text-sm font-bold font-mono"
                          style={{
                            marginLeft:
                              (((grid.state.timer.time -
                                event.seriesState.timer.time) %
                                60) /
                                60) *
                                100 +
                              '%',
                          }}
                        >
                          {event.action}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* background */}
        <Background />
      </div>
    </div>
  )
}
export { Timeline }
