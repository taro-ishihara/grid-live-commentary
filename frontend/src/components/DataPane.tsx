import { Tab, Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { classNames } from '../utilities/class-names'
import { useGrid } from '../contexts/GridContext'

export default function DataPane() {
  const grid = useGrid()

  return (
    <div className="w-96 mb-2 border-l-2">
      <Tab.Group>
        <Tab.List className="flex space-x-1 mr-0.5 bg-slate-200">
          {['Raw Events', 'State'].map((tabName) => (
            <Tab
              key={tabName}
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm font-medium leading-5 text-slate-700',
                  'focus:ring-2 focus:ring-violet-300 focus:outline-none',
                  selected
                    ? 'bg-slate-700 shadow text-white'
                    : 'hover:bg-slate-300',
                )
              }
            >
              {tabName}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel
            key={0}
            className={classNames(
              'p-2',
              'focus:outline-none focus:ring-2 focus:ring-violet-700',
            )}
          >
            <div className="my-2">
              <input
                type="search"
                className="w-full flex rounded border border-slate-700 bg-transparent px-3 py-[0.25rem] text-sm font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:outline-none"
                id="exampleSearch"
                placeholder="Type query"
              />
            </div>
            <ul className="overflow-y-scroll p-1">
              {grid.events.slice(-7).map((event) => (
                <li
                  key={event.id}
                  className="relative rounded-md p-2 hover:bg-gray-100"
                >
                  <h3 className="text-sm font-medium leading-5 truncate">
                    {event.id}
                  </h3>

                  <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                    <li>{event.action}</li>
                    <li>&middot;</li>
                    <li
                      className={`px-2 rounded flex items-center justify-center text-white ${
                        event.actor.type === 'player'
                          ? 'bg-green-500'
                          : 'bg-gray-500'
                      }`}
                    >
                      {event.actor.type}
                    </li>
                  </ul>

                  <a
                    href="#"
                    className={classNames(
                      'absolute inset-0 rounded-md',
                      'ring-violet-700 focus:z-10 focus:outline-none focus:ring-1',
                    )}
                  />
                </li>
              ))}
            </ul>
          </Tab.Panel>
          <Tab.Panel
            key={1}
            className={classNames(
              'p-2',
              'focus:outline-none focus:ring-2 focus:ring-violet-700',
            )}
          >
            <div className="w-full">
              <div className="mx-auto w-full max-w-md rounded-2xl bg-white">
                {grid.state.teams.map((team) =>
                  team.players.map((player) => (
                    <Disclosure>
                      {({ open }) => (
                        <div className="mb-2">
                          <Disclosure.Button className="flex w-full justify-between rounded bg-purple-100 px-4 py-1 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            <span>{player.name}</span>
                            <ChevronUpIcon
                              className={`${
                                open ? 'rotate-180 transform' : ''
                              } h-5 w-5 text-purple-500`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                            Charactor: {`${player.character}`}
                            <br />
                            K/D: {`${player.kills}/${player.deaths}`}
                            <br />
                            Assist(G/R):{' '}
                            {`${player.killAssistsGiven}/${player.killAssistsReceived}`}
                            <br />
                            Money: {`${player.money}`}
                            <br />
                            Structures(D/C):{' '}
                            {`${player.structuresDestroyed}/${player.structuresCaptured}`}
                          </Disclosure.Panel>
                        </div>
                      )}
                    </Disclosure>
                  )),
                )}
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export { DataPane }
