import { State } from './state'

export interface Event {
  id: string
  includesFullState: boolean
  type: string
  actor: any
  action: string
  target: any
  seriesStateDelta: any
  seriesState: Omit<State, 'currentGame'>
}
