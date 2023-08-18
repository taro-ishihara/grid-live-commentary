import { Popover } from '@headlessui/react'
import { Cog6ToothIcon } from '@heroicons/react/20/solid'

function Settings() {
  return (
    <Popover className="absolute bottom-2 right-4">
      {({ open }) => (
        <>
          <Popover.Panel className="absolute rounded border-slate-800 border bg-neutral-100 w-auto bottom-9 right-0 z-10 p-2">
            <div className="grid w-60 grid-cols-2">
              Settings Here, like put url of ws server, specify round, fake RTC
              etc..
            </div>
          </Popover.Panel>
          <Popover.Button className="m-0 p-0 rounded border border-slate-300 focus:outline-none">
            <Cog6ToothIcon
              className={`w-6 h-6 text-white ${
                open ? 'rotate-90 transform' : ''
              }`}
            />
          </Popover.Button>
        </>
      )}
    </Popover>
  )
}

export { Settings }
