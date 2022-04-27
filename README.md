# Binge-Stream
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<h1 align="center">
<img src="https://raw.githubusercontent.com/s-weigand/binge-stream/main/assets/icon.svg" width=400/>
</h1>

## :question: Why would you want to use this extension?

You sat down on your couch or went to bed, binge-watching your favorite show, and then the intro kicks in for the 10th time this evening so you get up and click the skip button?

Or you don't want to watch the 5min recap of an episode you just watched?

Then this extension is for you.

## :sparkles: Supported services

- Netflix
  - Supported Locale (`DE`, `EN`)
- Amazon Video
  - Supported Locale (`All` not locale dependent)

## :rocket: Installation

[link-amo]: https://addons.mozilla.org/en-US/firefox/addon/binge-stream
[link-cws]: https://chrome.google.com/webstore/detail/binge-stream/heoccpcipeedednknenbgenacjomlcbp

- [<img valign="center" src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Google_Chrome_icon_%282011%29.svg" width=16>
  **Chrome** extension
  <img valign="middle" src="https://img.shields.io/chrome-web-store/v/heoccpcipeedednknenbgenacjomlcbp.svg?label=%20">
  ][link-cws]
- [<img valign="center" src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg" width=16>
  **Firefox** add-on
  <img valign="middle" src="https://img.shields.io/amo/v/binge-stream.svg?label=%20">][link-amo]

## :confused: Why are there locals in the `Supported services` section?

Due to the way the pages are structured, the only way to differentiate between `skip intro` and `skip recap` is by checking the contained text.

This limitation **DOES NOT** apply if you check `skip intro` **AND** `skip recap` :yum:

So why not just use google translate to get all locals?

As can be seen for the `DE` locals for [Amazon](https://github.com/s-weigand/binge-stream/blob/main/source/content_scripts/amazon.ts) and [Netflix](https://github.com/s-weigand/binge-stream/blob/main/source/content_scripts/netflix.ts), it isn't quite that easy.
Since the locale is handcrafted, so is the requirement for the checking.

If your locale is missing feel free to file an issue or make a PullRequest. :smile:

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/s-weigand"><img src="https://avatars.githubusercontent.com/u/9513634?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sebastian Weigand</b></sub></a><br /><a href="https://github.com/s-weigand/binge-stream/commits?author=s-weigand" title="Code">💻</a> <a href="#ideas-s-weigand" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-s-weigand" title="Maintenance">🚧</a> <a href="#projectManagement-s-weigand" title="Project Management">📆</a> <a href="#infra-s-weigand" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/s-weigand/binge-stream/commits?author=s-weigand" title="Tests">⚠️</a> <a href="https://github.com/s-weigand/binge-stream/commits?author=s-weigand" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!