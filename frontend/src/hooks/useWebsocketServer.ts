import { useState, useEffect } from 'react'

const useWebSocketServer = () => {
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/2364966')
    ws.onopen = () => {
      // do nothing
    }
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data)
      setEvents((prevEvents) => [...prevEvents, response])
    }
    ws.onclose = () => {
      ws.close()
    }
    return () => {
      ws.close()
    }
  }, [])

  return events
}

export { useWebSocketServer }
