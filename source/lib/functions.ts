import { observe } from 'selector-observer'

export const clickElementOnAdd = (selector: string) => {
  observe(selector, {
    add(el) {
      console.log('triggered mutation for: ', selector)
      ;(el as HTMLElement).click()
    },
  })
}
