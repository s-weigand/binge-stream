/**
 * @jest-environment jsdom
 */
import fs from "node:fs";
import {
  clickElementOnAdd,
  deleteObservers,
  getPatternNames,
  getUrlKey,
  manipulateOptionPage,
  textInArray,
  urlPatterns,
} from "../../source/lib/functions";

const hasClasses = (selector: string, classes: string[]): boolean | undefined => {
  const element = document.querySelector(selector);
  if (element !== null) {
    for (const className of classes) {
      if (!element.classList.contains(className)) {
        return false;
      }
    }
    return true;
  }
  return undefined;
};

describe("Functions", () => {
  afterEach(deleteObservers);
  describe("textInArray", () => {
    it.each([
      ["skip recap", ["skip recap"], true],
      ["skip recap", ["Skip Recap"], true],
      ["Skip Recap", ["skip recap"], true],
      ["skip recap", ["skip intro"], false],
      ["skip recap", [], false],
      [undefined, ["skip intro"], false],
    ])("text: %s", (text, filterArray, expected) => {
      expect(textInArray(text, filterArray)).toBe(expected);
    });
  });
  it("clickElementOnAdd", (done) => {
    console.log = () => undefined;
    const callbackMock = jest.fn();
    const clickFunc = (_event: unknown) => {
      // it looks strange but if callbackMock is called it
      // will properly result in an error
      callbackMock();
      expect(callbackMock).toHaveBeenCalled();
      done();
    };
    const elementToAdd = document.createElement("button");
    elementToAdd.id = "dummy";
    elementToAdd.onclick = clickFunc;
    expect(callbackMock).not.toHaveBeenCalled();
    clickElementOnAdd("#dummy");
    document.body.appendChild(elementToAdd);
  });
  it("clickElementOnAdd with Text compare", (done) => {
    console.log = () => undefined;
    const callbackMock = jest.fn();
    const clickFunc = (_event: unknown) => {
      // it looks strange but if callbackMock is called it
      // will properly result in an error
      callbackMock();
      expect(callbackMock).toHaveBeenCalled();
      done();
    };
    const elementToAdd = document.createElement("button");
    elementToAdd.id = "dummy";
    elementToAdd.innerText = "testText";
    elementToAdd.onclick = clickFunc;
    expect(callbackMock).not.toHaveBeenCalled();
    clickElementOnAdd("#dummy", ["testText"]);
    document.body.appendChild(elementToAdd);
  });
  it("deleteObservers", (done) => {
    console.log = () => undefined;
    const callbackMock = jest.fn();
    const clickFunc1 = (_event: unknown) => {
      // it looks strange but if callbackMock is called it
      // will properly result in an error
      callbackMock();
      expect(callbackMock).not.toHaveBeenCalled();
      done();
    };
    const clickFunc2 = (_event: unknown) => {
      // it looks strange but if callbackMock is called it
      // will properly result in an error
      callbackMock();
      expect(callbackMock).toHaveBeenCalledTimes(1);
      done();
    };
    const elementToAdd = document.createElement("button");
    elementToAdd.id = "dummy";
    elementToAdd.onclick = clickFunc1;
    expect(callbackMock).not.toHaveBeenCalled();
    clickElementOnAdd("#dummy");
    deleteObservers();
    document.body.appendChild(elementToAdd);

    const elementToAdd2 = document.createElement("button");
    elementToAdd2.id = "dummy2";
    elementToAdd2.onclick = clickFunc2;
    clickElementOnAdd("#dummy2");
    document.body.appendChild(elementToAdd2);
  });
  describe("getUrlKey", () => {
    it.each([
      ["https://www.netflix.com/watch/12345", "netflix", "netflix"],
      ["https://netflix.com/watch/12345", "netflix", "netflix"],
      ["https://NOT_netflix.com/watch/12345", "netflix", undefined],
      ["https://netflix.com/watch/12345", "amazon", undefined],
      ["https://amazon.de/gp/video/detail/ABC123/", "amazon", "amazon"],
      ["https://amazon.com/gp/video/detail/ABC123/", "amazon", "amazon"],
      ["https://www.amazon.de/gp/video/detail/ABC123/", "amazon", "amazon"],
      ["https://smile.amazon.de/gp/video/detail/ABC123/", "amazon", "amazon"],
      ["https://www.amazon.de/Staffel-1-Official-Trailer/dp/B083SSJ9F6/", "amazon", "amazon"],
      ["https://smile.amazon.de/gp/video/detail/ABC123/", "netflix", undefined],
      ["https://www.youtube.com/watch?v=ABC", "youtube", "youtube"],
    ])("url: %s", (url, patternName, expected) => {
      expect(getUrlKey(url, patternName as keyof typeof urlPatterns)).toBe(expected);
    });
  });
  it("manifest has same patterns", () => {
    const manifestString = fs.readFileSync("./source/manifest.json", "utf8");
    const { content_scripts } = <
      { content_scripts: Array<{ matches: string[]; include_globs?: string[] }> }
    >JSON.parse(manifestString);
    const globMatchers: string[][] = [];
    for (const content_script of content_scripts) {
      globMatchers.push(content_script.matches);
      const { include_globs } = content_script;
      if (include_globs !== undefined) {
        globMatchers.push(include_globs);
      }
    }
    let key: keyof typeof urlPatterns;
    for (key in urlPatterns) {
      const patterns = urlPatterns[key];
      expect(globMatchers).toContainEqual(patterns);
    }
  });
  it("getPatternNames", () => {
    const optionPageSource = fs.readFileSync("./source/options/options.html", "utf8");
    document.body.outerHTML = optionPageSource;
    expect(getPatternNames()).toEqual(["netflix", "amazon", "youtube"]);
  });
  describe("manipulateOptionPage", () => {
    beforeEach(() => {
      const optionPageSource = fs.readFileSync("./source/options/options.html", "utf8");
      document.body.outerHTML = optionPageSource;
    });

    it.each([["about:addons"], ["chrome://extensions"]])("option pages: %s", (url) => {
      manipulateOptionPage(url);
      expect(hasClasses("form", ["detail-view-container"])).toBe(true);
      expect(hasClasses('div[data-section-name="netflix"]', ["current"])).toBe(false);
      expect(hasClasses('div[data-section-name="amazon"]', ["current"])).toBe(false);
      expect(hasClasses('div[data-section-name="youtube"]', ["current"])).toBe(false);
    });

    it.each([
      "http://random_page.com",
      "https://random_page.com",
      "https://amazon.com",
      "https://netflix.com",
    ])("general http pages: %s", (url) => {
      manipulateOptionPage(url);
      expect(hasClasses("form", ["detail-view-container", "page-action", "not-supported"])).toBe(
        true,
      );
      expect(hasClasses('div[data-section-name="netflix"]', ["current"])).toBe(false);
      expect(hasClasses('div[data-section-name="amazon"]', ["current"])).toBe(false);
      expect(hasClasses('div[data-section-name="youtube"]', ["current"])).toBe(false);
    });

    it.each([
      ["https://www.netflix.com/watch/12345", true, false, false],
      ["https://amazon.de/gp/video/detail/ABC123/", false, true, false],
      ["https://www.youtube.com/watch?v=ABC", false, false, true],
    ])("supported pages: %s", (url, netflix, amazon, youtube) => {
      manipulateOptionPage(url);
      expect(hasClasses("form", ["detail-view-container", "page-action"])).toBe(true);
      expect(hasClasses('div[data-section-name="netflix"]', ["current"])).toBe(netflix);
      expect(hasClasses('div[data-section-name="amazon"]', ["current"])).toBe(amazon);
      expect(hasClasses('div[data-section-name="youtube"]', ["current"])).toBe(youtube);
    });
  });
});
