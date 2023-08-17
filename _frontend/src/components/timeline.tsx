type Event = {
  start: Date
  end: Date
  event: string
}

const Timeline = () => {
  const events: Event[] = [
    {
      start: new Date('2023-08-14T12:00:00'),
      end: new Date('2023-08-14T12:00:20'),
      event: 'kill',
    },
    {
      start: new Date('2023-08-14T12:00:20'),
      end: new Date('2023-08-14T12:00:30'),
      event: 'revive',
    },
  ]

  const calculateEventStyle = (event: Event) => {
    const now = new Date('2023-08-14T12:00:00') // Date.now()
    const totalMilliseconds = 120_000
    const eventMilliseconds = event.end.getTime() - event.start.getTime()
    const eventWidthPercent = (eventMilliseconds / totalMilliseconds) * 100
    const eventPositionPercent =
      ((event.start.getTime() - now.getTime()) / totalMilliseconds) * 100
    return {
      width: eventWidthPercent + '%',
      marginLeft: eventPositionPercent + '%',
    }
  }

  return (
    <>
      <div className="text-red-500">
        {events.map((event, index) => (
          <div key={index} style={calculateEventStyle(event)}>
            {event.event}
          </div>
        ))}
      </div>
    </>
  )
}
export { Timeline }
