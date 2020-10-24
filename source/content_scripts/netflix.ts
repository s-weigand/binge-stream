import { clickElementOnAdd } from '../lib/functions'
import optionsStorage from '../options/options-storage'

optionsStorage
  .getAll()
  .then((response) => {
    if (response['netflix-skip-recap'] === true) {
      clickElementOnAdd('.skip-credits a[aria-label="Skip Recap"]')
    }
    if (response['netflix-skip-intro'] === true) {
      clickElementOnAdd('.skip-credits a[aria-label="Skip Intro"]')
    }
  })
  .catch((error) => {
    console.log('Error loading options:\n', error)
  })
