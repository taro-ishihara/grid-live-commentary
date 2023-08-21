import { useState } from 'react'
import { Tab, Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { classNames } from '../utilities/class-names'
import { useEvents } from '../contexts/EventsContext'
import { Event } from '../../types/event'

export default function DataPane() {
  const event = useEvents()
  const events: Event[] = event.events

  let [categories] = useState({
    'Raw Events': [
      {
        id: 1,
        eventType: 'System',
        eventDetail: 'Round 1 Started',
        time: '0:00',
        actor: 'system',
      },
      {
        id: 2,
        eventType: 'Kill',
        eventDetail: 'player1 killed player2',
        time: '0:10',
        actor: 'player1',
      },
      {
        id: 3,
        eventType: 'Kill',
        eventDetail: 'player1 killed player3',
        time: '0:15',
        actor: 'player1',
      },
      {
        id: 4,
        eventType: 'Kill',
        eventDetail: 'player1 killed player4',
        time: '0:30',
        actor: 'player1',
      },
      {
        id: 5,
        eventType: 'Field',
        eventDetail: 'Bomb Set by player1',
        time: '0:45',
        actor: 'player1',
      },
    ],
    Stats: [
      {
        id: 1,
        eventType: 'Seek',
        eventDetail: '',
        time: '0:15',
        actor: 'player1',
      },
      {
        id: 2,
        eventType: 'Seek',
        eventDetail: '',
        time: '0:50',
        actor: 'player2',
      },
    ],
  })

  return (
    <div className="w-96 mb-2 border-l-2">
      <Tab.Group>
        <Tab.List className="flex space-x-1 mr-0.5 bg-slate-200">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
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
              {category}
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
              {events.slice(-7).map((event) => (
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
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between rounded bg-purple-100 px-4 py-1 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                        <span>player1</span>
                        <ChevronUpIcon
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-purple-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        p1 STATS
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as="div" className="mt-2">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between rounded bg-purple-100 px-4 py-1 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                        <span>player2</span>
                        <ChevronUpIcon
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-purple-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        p2 stats
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export { DataPane }
