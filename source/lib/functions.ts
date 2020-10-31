import minimatch from 'minimatch'
import { Observer, observe } from 'selector-observer'

export const urlPatterns = {
  netflix: ['*://netflix.com/**', '*://*.netflix.com/**'],
  amazon: [
    '*://amazon.*/gp/video/**',
    '*://*.amazon.*/gp/video/**',
    '*://amazon.*/*/dp/**',
    '*://*.amazon.*/*/dp/**',
  ],
}
const BingeStreamObservers: Observer[] = []

export const textInArray = (text: string | undefined, filterArray: string[]) => {
  const filteredArray = filterArray.filter((element, _index, _array) => {
    if (typeof text === 'string') {
      return text.toLowerCase() === element.toLowerCase()
    }
    return false
  })
  return filteredArray.length !== 0
}

export const clickElementOnAdd = (selector: string, filterArray: string[] | null = null) => {
  const clickObserver = observe(selector, {
    add(el) {
      console.log('triggered mutation for: ', selector)
      if (filterArray === null) {
        // tslint:disable-next-line
        ;(el as HTMLElement).click()
      } else {
        const elementText = (el as HTMLElement).innerText
        if (textInArray(elementText, filterArray)) {
          // tslint:disable-next-line
          ;(el as HTMLElement).click()
        }
      }
    },
  })
  BingeStreamObservers.push(clickObserver)
}

export const deleteObservers = () => {
  while (BingeStreamObservers.length) {
    const clickObserver = BingeStreamObservers.pop() as Observer
    console.log('removing Observer', clickObserver)
    clickObserver.abort()
  }
}

export const getUrlKey = (
  currentUrl: string,
  patternName: keyof typeof urlPatterns,
): void | string => {
  const patterns = urlPatterns[patternName]
  for (const pattern of patterns) {
    if (minimatch(currentUrl, pattern)) {
      return patternName
    }
  }
}

export const getPatternNames = (): (string | null)[] => {
  const patternNames = []
  const sections = document.querySelectorAll('div[data-section-name]')
  for (const section of sections) {
    patternNames.push(section.getAttribute('data-section-name'))
  }
  return patternNames
}

export const manipulateOptionPage = (currentUrl: string) => {
  if (currentUrl.startsWith('http')) {
    document.querySelector('form')?.classList.add('page-action')
  }
  let urlKey
  for (const patternName of getPatternNames()) {
    const tmp = getUrlKey(currentUrl, patternName as keyof typeof urlPatterns)
    if (tmp !== undefined) {
      urlKey = tmp
    }
  }
  if (urlKey === undefined) {
    document.querySelector('form')?.classList.add('not-supported')
  } else {
    const supportedSection = document.querySelector(`div[data-section-name="${urlKey}"]`)
    supportedSection?.classList.add('current')
  }
}
