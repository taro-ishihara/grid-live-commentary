import { Position } from './position'
import { Team } from './team'

export interface Game {
  id: string
  sequenceNumber: number
  map: Map
  started: boolean
  finished: boolean
  paused: boolean
  clock: Clock
  structures: Structure[]
  nonPlayerCharacters: NonPlayerCharacter[]
  teams: Team[]
  draftActions: any[]
}

export interface Map {
  name: string
  bounds: Bounds
}

export interface Bounds {
  min: Position
  max: Position
}

export interface Clock {
  id: string
  type: string
  ticking: boolean
  ticksBackwards: boolean
  currentSeconds: number
  updatedAt: string
}

export interface Structure {
  id: string
  type: string
  side: string
  teamId: string
  destroyed: boolean
  position: Position
  currentHealth: number
  maxHealth: number
}

export interface NonPlayerCharacter {
  id: string
  type: string
  side: string
  respawnClock: Clock
  position: Position
  alive: boolean
}
