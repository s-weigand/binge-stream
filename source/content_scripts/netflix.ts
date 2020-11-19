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
  const skipKeyboardShurtcut = (el: HTMLElement) => {
    // @ts-ignore
    const pressKey = new KeyboardEvent('keydown', { key: 's', keyCode: 83, bubbles: true })
    el.dispatchEvent(pressKey)
  }
  actionOnAdd(skipKeyboardShurtcut, selector, filterArray)
}

const init = () => {
  optionsStorage
    .getAll()
    .then((response) => {
      deleteObservers()
      if (response['netflix-skip-recap'] === true && response['netflix-skip-intro'] === true) {
        keyboardShortcutOnAdd('.skip-credits')
      } else if (response['netflix-skip-recap'] === true) {
        keyboardShortcutOnAdd('.skip-credits', skipRecapLocal)
      } else if (response['netflix-skip-intro'] === true) {
        keyboardShortcutOnAdd('.skip-credits', skipIntroLocal)
      }
    })
    .catch((error) => {
      console.log('Error loading options:\n', error)
    })
}

init()
browser.storage.onChanged.addListener(init)
