import * as stream from 'mithril/stream'

export type EventID = string

export function makeEvent(name: string): EventID {
  return name
}

export interface AppEvent {
  id: EventID
}

export interface E_Start extends AppEvent {
  id: 'app.start'
}

export const events = stream({ id: 'app.start' })
