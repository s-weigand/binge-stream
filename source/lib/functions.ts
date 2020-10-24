import { browser } from 'webextension-polyfill-ts'

export const openInIncognitoWindow = (url: string): void => {
  browser.windows.create({ incognito: true, url }).catch(() => {
    alert(`Unable to open ${url}`)
  })
}

export const addUl = (listItems: number[], id = 'option-list') => {
  const itemList = document.createElement('ul')
  itemList.id = id

  for (const listItem of listItems) {
    const listElement = document.createElement('li')
    listElement.textContent = `${listItem}`
    itemList.appendChild(listElement)
  }

  document.body.appendChild(itemList)
}
