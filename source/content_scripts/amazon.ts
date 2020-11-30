import { clickElementOnAdd, deleteObservers } from '../lib/functions'
import optionsStorage from '../options/options-storage'

export const skipIntroLocal = [
  'Skip Intro', // EN
  'Vorspann überspringen', // DE
]
export const skipRecapLocal = [
  'Skip Recap', // EN
  'Rückblende überspringen', // DE
]

const init = () => {
  optionsStorage
    .getAll()
    .then((response) => {
      deleteObservers()
      if (response['amazon-skip-recap'] === true && response['amazon-skip-intro'] === true) {
        clickElementOnAdd('.atvwebplayersdk-skipelement-button')
      } else if (response['amazon-skip-recap'] === true) {
        clickElementOnAdd('.atvwebplayersdk-skipelement-button', skipRecapLocal)
      } else if (response['amazon-skip-intro'] === true) {
        clickElementOnAdd('.atvwebplayersdk-skipelement-button', skipIntroLocal)
      }
      if (response['amazon-skip-ad'] === true) {
        clickElementOnAdd(
          '.atvwebplayersdk-infobar-container.show > div > div:nth-child(3) > div:nth-child(2)',
        )
      }
    })
    .catch((error) => {
      console.log('Error loading options:\n', error)
    })
}
init()
browser.storage.onChanged.addListener(init)
