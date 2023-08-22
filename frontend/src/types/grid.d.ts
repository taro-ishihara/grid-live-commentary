type Grid = {
  events: Event[]
  state: State
}

export interface Event {
  id: string
  includesFullState: boolean
  type: string
  actor: any
  action: string
  target: any
  seriesStateDelta: any
  seriesState: State
}

export interface State {
  id: string
  title: Title
  format: string
  started: boolean
  finished: boolean
  valid: boolean
  teams: Team[]
  games: Game[]
  draftActions: any[]
  ongoingGame: Game | false // for this platform
  timer: { seq: number; time: number } // for this platform
}

export interface Title {
  nameShortened: string
}

export interface Player {
  id: string
  name: string
  character: Character
  participationStatus: string
  money: number
  inventoryValue: number
  netWorth: number
  kills: number
  killAssistsReceived: number
  killAssistsGiven: number
  teamkills: number
  teamkillAssistsReceived: number
  teamkillAssistsGiven: number
  selfkills: number
  deaths: number
  structuresDestroyed: number
  structuresCaptured: number
  position: Position
  alive: boolean
  currentHealth: number
  experiencePoints: number
  maxHealth: number
}

export interface Character {
  name: string
  id: string
}

export interface Item {
  id: string
  equipped: boolean
  stashed: boolean
}

export interface Position {
  x: number
  y: number
}

export interface Team {
  id: string
  name: string
  side: string
  won: boolean
  score: number
  money: number
  inventoryValue: number
  netWorth: number
  kills: number
  killAssistsReceived: number
  killAssistsGiven: number
  teamkills: number
  teamkillAssistsReceived: number
  teamkillAssistsGiven: number
  selfkills: number
  deaths: number
  structuresDestroyed: number
  structuresCaptured: number
  players: Player[]
  experiencePoints: number
}

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
