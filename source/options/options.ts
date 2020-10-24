// import { browser } from 'webextension-polyfill-ts'

import optionsStorage from './options-storage'

// tslint:disable-next-line: no-floating-promises
optionsStorage.syncForm('#options-form')

// Normal storage api

// stetting default values
// tslint:disable-next-line: no-floating-promises
// browser.storage.local.set({ listItems: [1, 2] })
