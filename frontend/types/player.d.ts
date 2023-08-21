import { Position } from './position'

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
  statePath: StatePath7[]
  equipped: boolean
  stashed: boolean
}
