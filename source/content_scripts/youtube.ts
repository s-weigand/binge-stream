import { clickElementOnAdd, deleteObservers } from '../lib/functions'
import optionsStorage from '../options/options-storage'

const init = () => {
  optionsStorage
    .getAll()
    .then((response) => {
      deleteObservers()
      if (response['youtube-skip-ad'] === true) {
        clickElementOnAdd('.ytp-ad-skip-button')
        clickElementOnAdd('.ytp-ad-skip-button-modern')
      }
    })
    .catch((error) => {
      console.log('Error loading options:\n', error)
    })
}
init()
browser.storage.onChanged.addListener(init)
