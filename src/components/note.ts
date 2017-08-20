import * as m from 'mithril'
import * as stream from 'mithril/stream'
import * as events from '../events'

export const noteChanged = events
  .mkEvent<
    { id: 'note.changed'; value: string },
    { value: string }
  >('note.changed', { value: '' })
  .bindToStream(events.events)

export const note = noteChanged.reducer(e => e.value, '')

export default {
  view() {
    return m('input[type=text]', {
      placeholder: 'Type a note...',
      value: note(),
      onchange: (e: any) => noteChanged.dispatch({ value: e.target.value })
    })
  }
} as m.Component<{}, {}>
