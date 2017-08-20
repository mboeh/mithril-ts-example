// App entry point

import * as m from 'mithril'
import * as stream from 'mithril/stream'

import home from './components/home'
import about from './components/about'
import * as events from './events'

events.events.map(console.log)

const startAttrs = {
  note: stream(''),
  clicks: stream(0)
}

function withAttrs<A, S, SA extends A>(
  component: m.Component<A, S>,
  attrs: SA
): m.Component<{}, S> {
  return {
    view() {
      return m(component, attrs)
    }
  }
}

m.route(document.body, '/', {
  '/': withAttrs(home, startAttrs),
  '/about': withAttrs(about, startAttrs)
})
