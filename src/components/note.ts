import * as m from 'mithril'
import * as stream from 'mithril/stream'
import * as events from '../events'

export const EID_NOTE_CHANGED = 'note.changed'

export interface E_NoteChanged extends events.AppEvent {
  id: typeof EID_NOTE_CHANGED
  value: string
}

export function noteChanged(value: string) {
  events.events(
    {
      id: EID_NOTE_CHANGED,
      value: value
    } as E_NoteChanged
  )
}

export function onNoteChanged(e: events.AppEvent): e is E_NoteChanged {
  return !!e && e.id === EID_NOTE_CHANGED
}

export const note = events.listen(onNoteChanged, e => e.value, '')

export default {
  view() {
    return m('input[type=text]', {
      placeholder: 'Type a note...',
      value: note(),
      onchange: m.withAttr('value', noteChanged)
    })
  }
} as m.Component<{}, {}>
