import { actionOnAdd, deleteObservers } from '../lib/functions'
import optionsStorage from '../options/options-storage'

export const skipIntroLocal = [
  'Skip Intro', // EN
  'Intro überspringen', // DE
]
export const skipRecapLocal = [
  'Skip Recap', // EN
  'Rückblick überspringen', // DE
]

const keyboardShortcutOnAdd = (selector: string, filterArray: string[] | null = null) => {
  const skipKeyboardShortcut = (el: HTMLElement) => {
    // @ts-ignore
    const pressKey = new KeyboardEvent('keydown', { key: 's', keyCode: 83, bubbles: true })
    el.dispatchEvent(pressKey)
  }
  actionOnAdd(skipKeyboardShortcut, selector, filterArray)
}

const init = () => {
  optionsStorage
    .getAll()
    .then((response) => {
      deleteObservers()
      if (response['netflix-skip-recap'] === true && response['netflix-skip-intro'] === true) {
        keyboardShortcutOnAdd('.watch-video--skip-content-button')
      } else if (response['netflix-skip-recap'] === true) {
        keyboardShortcutOnAdd('.watch-video--skip-content-button[data-uia="player-skip-recap"]')
      } else if (response['netflix-skip-intro'] === true) {
        keyboardShortcutOnAdd('.watch-video--skip-content-button[data-uia="player-skip-intro"]')
      }
    })
    .catch((error) => {
      console.log('Error loading options:\n', error)
    })
}

init()
browser.storage.onChanged.addListener(init)
