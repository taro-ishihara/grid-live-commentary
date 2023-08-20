export interface Player {
  id: string
  name: string
  participationStatus: string
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
}
