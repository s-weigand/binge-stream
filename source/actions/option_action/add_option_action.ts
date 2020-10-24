import { browser } from 'webextension-polyfill-ts'

import { addUl } from '../../lib/functions'

const updateOptionUl = () => {
  const oldUl = document.querySelector('#option-list')
  if (oldUl) {
    document.body.removeChild(oldUl)
  }
  const newOption = document.querySelector('#option-value') as HTMLInputElement
  if (newOption.value) {
    browser.storage.local
      .get('listItems')
      .then((response) => {
        const listItems = [...response.listItems, newOption.value]
        addUl(listItems)
        browser.storage.local.set({ listItems }).catch((error: Error) => {
          alert(error.message)
        })
        newOption.value = ''
      })
      .catch((error: Error) => {
        alert(error.message)
      })
  }
}

const addOptionBtn = document.querySelector('#add-option') as HTMLButtonElement
addOptionBtn.addEventListener('click', updateOptionUl)

updateOptionUl()
