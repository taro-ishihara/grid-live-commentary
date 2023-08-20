import { Player } from './player'

export interface Team {
  id: string
  name: string
  score: number
  won: boolean
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
}
