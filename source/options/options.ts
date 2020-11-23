import { browser } from 'webextension-polyfill-ts'

import { manipulateOptionPage } from '../lib/functions'
import optionsStorage from './options-storage'

// tslint:disable-next-line: no-floating-promises
optionsStorage.syncForm('#options-form')

browser.tabs
  .query({ active: true, currentWindow: true })
  .then((tabs) => {
    // @ts-ignore: Object is possibly 'undefined'.
    const currentUrl = tabs[0].url as string
    // 'tabs' will be an array with only one element: an Object describing the active tab
    //  in the current window.
    manipulateOptionPage(currentUrl)
  })
  .catch()
