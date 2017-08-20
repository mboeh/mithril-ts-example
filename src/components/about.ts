import * as m from 'mithril'
import nav from './nav'
import note from './note'

export default {
  view(vnode) {
    return m('.page', [
      m(nav),
      m('h1', 'About'),
      m('p', 'This is the about page.'),
      m('p', m(note))
    ])
  }
} as m.Component<{}, {}>
