import { clickElementOnAdd } from '../lib/functions'
import optionsStorage from '../options/options-storage'

optionsStorage
  .getAll()
  .then((response) => {
    if (response['amazon-skip-recap'] === true) {
      clickElementOnAdd('.atvwebplayersdk-skipelement-button')
    }
    if (response['amazon-skip-intro'] === true) {
      clickElementOnAdd('.atvwebplayersdk-infobar-container')
    }
    if (response['amazon-skip-ad'] === true) {
      clickElementOnAdd('.atvwebplayersdk-infobar-container.show > div > div > div:nth-child(2)')
    }
  })
  .catch((error) => {
    console.log('Error loading options:\n', error)
  })
