import * as stream from 'mithril/stream'

export type EventID = string

export interface AppEvent {
  id: EventID
}

export interface E_Start extends AppEvent {
  id: 'app.start'
}

export type EventStream = stream.Stream<AppEvent>
export const events: EventStream = stream({ id: 'app.start' })

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

export function mkEvent<
  Event extends AppEvent & Payload,
  Payload extends object
>(
  id: EventID,
  defaultPayload: Payload
): {
  id: EventID
  dispatch(eventStream: EventStream, values: Payload): void
  predicate(e: AppEvent): e is Event
  reducer<VT>(
    eventStream: EventStream,
    fn: (e: Event) => VT,
    initial: VT
  ): stream.Stream<VT>
  bindToStream(
    eventStream: EventStream
  ): {
    id: EventID
    dispatch(values: Payload): void
    predicate(e: AppEvent): e is Event
    reducer<VT>(fn: (e: Event) => VT, initial: VT): stream.Stream<VT>
  }
} {
  const dispatch = (eventStream: EventStream, values: Payload) => {
    const msg = Object.assign({}, { id }, values)
    eventStream(msg)
  }
  const predicate = (e: AppEvent): e is Event => {
    return !!e && e.id === id
  }
  const reducer = <VT>(
    eventStream: stream.Stream<AppEvent>,
    fn: (e: Event) => VT,
    initial: VT
  ) => {
    return stream.scan(
      (current: VT, e: AppEvent) => (predicate(e) ? fn(e) : current),
      initial,
      eventStream
    )
  }
  const bindToStream = (eventStream: EventStream) => ({
    id,
    dispatch(values: Payload) {
      dispatch(eventStream, values)
    },
    predicate,
    reducer<VT>(fn: (e: Event) => VT, initial: VT) {
      return reducer(eventStream, fn, initial)
    }
  })
  return { id, dispatch, predicate, reducer, bindToStream }
}

const E_FOO = mkEvent<
  { id: 'app.foo'; name: string; size: number },
  { name: string; size: number }
>('app.foo', { name: '', size: 0 })

E_FOO.dispatch(events, { name: 'elephant', size: 2000 })
const foos = E_FOO.reducer(
  events,
  ({ name, size }) => `the ${name} weighs ${size} lbs`,
  ''
)
