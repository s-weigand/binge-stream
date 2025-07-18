import minimatch from "minimatch";
import { type Observer, observe } from "selector-observer";

export const urlPatterns = {
  netflix: ["*://netflix.com/**", "*://*.netflix.com/**"],
  amazon: [
    "*://amazon.*/gp/video/**",
    "*://*.amazon.*/gp/video/**",
    "*://amazon.*/*/dp/**",
    "*://*.amazon.*/*/dp/**",
  ],
  youtube: ["*://www.youtube.com/**"],
};
const BingeStreamObservers: Observer[] = [];

export const textInArray = (text: string | undefined, filterArray: string[]) => {
  if (text === undefined) {
    return false;
  }
  const filteredArray = filterArray.filter((element, _index, _array) => {
    return text.toLowerCase() === element.toLowerCase();
  });
  return filteredArray.length !== 0;
};

export const clickElementOnAdd = (selector: string, filterArray: string[] | null = null) => {
  const clickCallback = (el: HTMLElement) => {
    el.click();
  };
  actionOnAdd(clickCallback, selector, filterArray);
};

export const actionOnAdd = (
  actionCallback: (el: HTMLElement) => void,
  selector: string,
  filterArray: string[] | null = null,
) => {
  const clickObserver = observe(selector, {
    add(el) {
      console.log("triggered mutation for: ", selector);
      console.log("el", el);
      if (filterArray === null) {
        actionCallback(el as HTMLElement);
      } else {
        console.log("filterArray", filterArray);
        const elementText = (el as HTMLElement).innerText;
        console.log("elementText", elementText);
        if (textInArray(elementText, filterArray)) {
          actionCallback(el as HTMLElement);
        }
      }
    },
  });
  BingeStreamObservers.push(clickObserver);
};

export const deleteObservers = () => {
  while (BingeStreamObservers.length) {
    const clickObserver = BingeStreamObservers.pop() as Observer;
    console.log("removing Observer", clickObserver);
    clickObserver.abort();
  }
};

export const getUrlKey = (
  currentUrl: string,
  patternName: keyof typeof urlPatterns,
): undefined | string => {
  const patterns = urlPatterns[patternName];
  for (const pattern of patterns) {
    if (minimatch(currentUrl, pattern)) {
      return patternName;
    }
  }
  return undefined;
};

export const getPatternNames = (): (string | null)[] => {
  const patternNames = [];
  const sections = document.querySelectorAll("div[data-section-name]");
  for (const section of sections) {
    patternNames.push(section.getAttribute("data-section-name"));
  }
  return patternNames;
};

export const manipulateOptionPage = (currentUrl: string) => {
  if (currentUrl.startsWith("http")) {
    document.querySelector("form")?.classList.add("page-action");
  }
  let urlKey: string | undefined;
  for (const patternName of getPatternNames()) {
    const tmp = getUrlKey(currentUrl, patternName as keyof typeof urlPatterns);
    if (tmp !== undefined) {
      urlKey = tmp;
    }
  }
  if (urlKey === undefined) {
    document.querySelector("form")?.classList.add("not-supported");
  } else {
    const supportedSection = document.querySelector(`div[data-section-name="${urlKey}"]`);
    supportedSection?.classList.add("current");
  }
};
