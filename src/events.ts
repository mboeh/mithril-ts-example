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

/* Listens to the event stream for a particular event and creates a new stream
 * that updates whenever that event is emitted. */
export function listen<T extends AppEvent, V>(
  predicate: (e: AppEvent) => e is T,
  fn: (e: T) => V,
  initial: V
): stream.Stream<V> {
  return stream.scan(
    (current: V, e: AppEvent) => (predicate(e) ? fn(e) : current),
    initial,
    events
  )
}
