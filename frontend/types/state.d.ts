import { Team } from './team'
import { Game } from './game'

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
  currentGame: Game // Add for This project Specific
}

export interface Title {
  nameShortened: string
}
