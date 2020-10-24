import { Menus, Tabs, browser } from 'webextension-polyfill-ts'

import { openInIncognitoWindow } from '../lib/functions'

export const contextMenueContainerId = 'awesome-extension-context-container'

browser.contextMenus.create({
  id: contextMenueContainerId,
  title: 'Extension template context menue',
  contexts: ['all'],
})

browser.contextMenus.create({
  id: 'awesome-extension-context-incognito',
  parentId: contextMenueContainerId,
  title: 'Open url in incognito windows',
  contexts: ['all'],
})

browser.contextMenus.create({
  id: 'awesome-extension-context-sidebar',
  parentId: contextMenueContainerId,
  title: 'Toggle sidebar',
  contexts: ['all'],
})

// not working in firefox
const currentUrlIcognito = (_info: Menus.OnClickData, tab?: Tabs.Tab | undefined) => {
  if (tab !== undefined) {
    const currentUrl = tab.url
    if (currentUrl !== undefined) {
      openInIncognitoWindow(currentUrl)
      return
    }
  }
  alert("Couldn't determine url.")
}

// not working in chrome
const toggleAwesomeSidebar = (_info: Menus.OnClickData, _tab?: Tabs.Tab | undefined) => {
  browser.sidebarAction.toggle()
}

const triggerContextAction = (_info: Menus.OnClickData, tab?: Tabs.Tab | undefined) => {
  switch (_info.menuItemId) {
    case 'awesome-extension-context-incognito':
      currentUrlIcognito(_info, tab)
      break
    case 'awesome-extension-context-sidebar':
      toggleAwesomeSidebar(_info, tab)
      break
  }
}

browser.contextMenus.onClicked.addListener(triggerContextAction)
