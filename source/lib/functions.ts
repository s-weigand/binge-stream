import minimatch from 'minimatch'
import { observe } from 'selector-observer'

export const urlPatterns = {
  netflix: ['*://netflix.com/**', '*://*.netflix.com/**'],
  amazon: ['*://amazon.*/gp/video/**', '*://*.amazon.*/gp/video/**'],
}

export const clickElementOnAdd = (selector: string) => {
  observe(selector, {
    add(el) {
      console.log('triggered mutation for: ', selector)
      // tslint:disable-next-line
      ;(el as HTMLElement).click()
    },
  })
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
