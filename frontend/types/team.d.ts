import { Player } from './player'

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
