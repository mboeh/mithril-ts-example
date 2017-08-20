import * as m from 'mithril'
import nav from './nav'
import { note } from './note'
import clicker, { readClicks } from './clicker'

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
