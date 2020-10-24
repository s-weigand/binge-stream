import { browser } from 'webextension-polyfill-ts'

import { addUl } from '../lib/functions'
import optionsStorage from './options-storage'

// tslint:disable-next-line: no-floating-promises
optionsStorage.syncForm('#options-form')

const rangeInputs = [
  ...document.querySelectorAll('input[type="range"][name^="color"]'),
] as HTMLInputElement[]
const numberInputs = [
  ...document.querySelectorAll('input[type="number"][name^="color"]'),
] as HTMLInputElement[]
const output = document.querySelector('.color-output') as HTMLElement

function updateColor() {
  output.style.backgroundColor = `rgb(${rangeInputs[0].value}, ${rangeInputs[1].value}, ${rangeInputs[2].value})`
}

function updateNumberInputField(event: Event): void {
  numberInputs[
    rangeInputs.indexOf(event.currentTarget as HTMLInputElement)
  ].value = (event.currentTarget as HTMLInputElement).value
}
function updateRangeInputField(event: Event): void {
  rangeInputs[
    numberInputs.indexOf(event.currentTarget as HTMLInputElement)
  ].value = (event.currentTarget as HTMLInputElement).value
}

// bind range input event listeners
for (const input of rangeInputs) {
  input.addEventListener('input', updateColor)
  input.addEventListener('input', updateNumberInputField)
}
// bind range input event listeners
for (const input of numberInputs) {
  input.addEventListener('input', updateColor)
  input.addEventListener('input', updateRangeInputField)
}

window.addEventListener('load', updateColor)

// Normal storage api

// stetting default values
// tslint:disable-next-line: no-floating-promises
// browser.storage.local.set({ listItems: [1, 2] })

browser.storage.local
  .get('listItems')
  .then((response) => {
    const listItems = response.listItems
    addUl(listItems)
  })
  .catch((error: Error) => {
    alert(error.message)
  })
