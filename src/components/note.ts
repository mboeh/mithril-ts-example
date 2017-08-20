import * as m from 'mithril'
import * as stream from 'mithril/stream'
import * as events from '../events'

export interface E_NoteChanged extends events.AppEvent {
  id: 'note.changed'
  value: string
}

function noteChanged(value: string) {
  events.events(
    {
      id: 'note.changed',
      value: value
    } as E_NoteChanged
  )
}

function isNoteChanged(e: events.AppEvent): e is E_NoteChanged {
  return e.id === 'note.changed'
}

export const note = stream.scan(
  (current: string, e: events.AppEvent) =>
    isNoteChanged(e) ? e.value : current,
  '',
  events.events
)

export default {
  view() {
    return m('input[type=text]', {
      placeholder: 'Type a note...',
      value: note(),
      onchange: m.withAttr('value', noteChanged)
    })
  }
} as m.Component<{}, {}>
