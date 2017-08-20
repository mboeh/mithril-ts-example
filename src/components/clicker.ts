import * as m from 'mithril'
import * as stream from 'mithril/stream'

const clicks = stream(0)
export const readClicks = clicks.map(x => x)
export const clickCount = clicks.map(c => `${c} click`)

export default {
  view() {
    return m(
      'button',
      {
        onclick: () => {
          clicks(clicks() + 1)
        }
      },
      clickCount()
    )
  }
} as m.Component<{}, {}>
