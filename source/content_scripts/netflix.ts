import { clickElementOnAdd } from '../lib/functions'
import optionsStorage from '../options/options-storage'

export const skipIntroLocal = [
  'Skip Intro', // EN
  'Intro überspringen', // DE
]
export const skipRecapLocal = [
  'Skip Recap', // EN
  'Rückblick überspringen', // DE
]

optionsStorage
  .getAll()
  .then((response) => {
    if (response['netflix-skip-recap'] === true && response['netflix-skip-intro'] === true) {
      clickElementOnAdd('.skip-credits a')
    } else if (response['netflix-skip-recap'] === true) {
      clickElementOnAdd('.skip-credits a', skipRecapLocal)
    } else if (response['netflix-skip-intro'] === true) {
      clickElementOnAdd('.skip-credits a', skipIntroLocal)
    }
  })
  .catch((error) => {
    console.log('Error loading options:\n', error)
  })
