import { Tab, Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { classNames } from '../utilities/class-names'
import { useGrid } from '../contexts/GridContext'
import { JsonViewer } from '@textea/json-viewer'
import { Minimap } from './Minimap'
import { useState } from 'react'

export default function RightBar() {
  const grid = useGrid()
  const [searchKeyword, setSearchKeyword] = useState('')

  const searchHandler = (event: any) => {
    setSearchKeyword(event.target.value)
  }

  return (
    <div className="min-w-[320px] flex flex-col">
      <div className="flex-grow flex flex-col h-full mb-2">
        <Tab.Group>
          <Tab.List className="flex space-x-1 mr-0.5 bg-slate-200">
            {['Game Events', 'Game State'].map((tabName) => (
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
          <Tab.Panels className={'flex flex-col flex-grow p-2'}>
            <Tab.Panel className={'flex flex-col h-full'}>
              <div className="my-2">
                <input
                  type="search"
                  className="w-full flex rounded border border-slate-700 bg-transparent px-3 py-[0.25rem] text-sm font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:outline-none"
                  id="eventSearch"
                  placeholder="Search events..."
                  onChange={searchHandler}
                />
              </div>
              <div className="flex-grow basis-0 h-full my-3 overflow-y-scroll">
                {grid.events
                  .filter((event) => event.actor.type !== 'player')
                  .filter((event) =>
                    `${event.actor.type} ${event.action}`.includes(
                      searchKeyword,
                    ),
                  )
                  .reverse()
                  .map((event) => (
                    <Disclosure>
                      {({ open }) => (
                        <div className="mb-2 mx-1">
                          <Disclosure.Button className="flex w-full justify-between rounded bg-purple-100 p-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            <div className="flex">
                              <div
                                className={`px-2 rounded flex items-center justify-cente text-sm font-medium leading-5 truncate text-white ${
                                  event.actor.type === 'team'
                                    ? 'bg-green-500'
                                    : event.actor.type === 'game'
                                    ? 'bg-amber-500'
                                    : event.actor.type === 'series'
                                    ? 'bg-blue-500'
                                    : event.actor.type === 'tournament'
                                    ? 'bg-red-500'
                                    : 'bg-gray-500'
                                }`}
                              >
                                {event.actor.type}
                              </div>
                              <div className="ml-2 text-sm font-medium leading-5 truncate">
                                {event.action}
                              </div>
                            </div>
                            <ChevronUpIcon
                              className={`${
                                open ? 'rotate-180 transform' : ''
                              } h-5 w-5 text-purple-500`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-2 pt-2 pb-2 text-sm text-gray-500">
                            <JsonViewer className="w-[260px]" value={event} />
                          </Disclosure.Panel>
                        </div>
                      )}
                    </Disclosure>
                  ))}
              </div>
            </Tab.Panel>
            <Tab.Panel className="flex-grow basis-0 my-3 h-full overflow-y-scroll">
              {grid.state.ongoingGame
                ? grid.state.games.map((game) => (
                    <Disclosure>
                      {({ open }) => (
                        <div className="mb-2 mx-1">
                          <Disclosure.Button className="flex w-full justify-between rounded bg-purple-100 px-2 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            <div className="flex">
                              <div className="ml-2 w-4">{`${game.sequenceNumber}`}</div>
                              <div>{`${game.map.name}`}</div>
                            </div>
                            <ChevronUpIcon
                              className={`${
                                open ? 'rotate-180 transform' : ''
                              } h-5 w-5 text-purple-500`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                            <JsonViewer className="w-[260px]" value={game} />
                          </Disclosure.Panel>
                        </div>
                      )}
                    </Disclosure>
                  ))
                : null}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div className="min-h-[320px]">
        <Minimap />
      </div>
    </div>
  )
}

export { RightBar }
