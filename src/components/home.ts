import * as m from 'mithril'
import nav from './nav'
import { noteChanged } from './note'
import * as events from '../events'
import clicker, { readClicks } from './clicker'

const note = noteChanged.reducer(e => e.value, '')

export default {
  view(vnode) {
    const n = note()
    return m('.page', [
      m(nav),
      m('h1', 'Home'),
      m('p', 'This is the home page.'),
      m(clicker),
      n === '' ? null : m('p', "By the way, don't forget: " + n),
      readClicks() == 10 ? m('p', 'Ten times is the trick!') : null
    ])
  }
} as m.Component<{}, {}>
