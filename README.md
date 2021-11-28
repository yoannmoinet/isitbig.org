# [isitbig.org](https://isitbig.org)

![GitHub deployments](https://img.shields.io/github/deployments/yoannmoinet/isitbig.org/production?label=vercel&logo=vercel&logoColor=white)

## Overview

Helps you find if a brand is part of a big group.

The data is gathered in `./packages/website/public/data.json` from scrap scripts in `./packages/scraper`.

There's also a `./packages/website/overrides.json` in case we need to enter manual data.

## Groups

We keep a list of groups scraped and to scrap in [this project](https://github.com/yoannmoinet/isitbig.org/projects/1).

You can also [suggest a new group](https://github.com/yoannmoinet/isitbig.org/issues/new?assignees=&labels=group&template=new-group.md&title=%5BGROUP%5D).

## TODOS

We keep a list of things to do in [this project](https://github.com/yoannmoinet/isitbig.org/projects/2).

You can [request a new feature](https://github.com/yoannmoinet/isitbig.org/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFEATURE%5D) or [submit a bug report](https://github.com/yoannmoinet/isitbig.org/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D) as well.

## Components

Built around two components

### [Scraper](./packages/scraper)

Will scrap the web to get information about big groups and use it as the data for [the website](./packages/website).

### [Website](./packages/website)

The source of the website located at https://isitbig.org

## Contribute

```bash
yarn install
```

If you're looking for stuffs to do, you can find something in one of our projects [#1](https://github.com/yoannmoinet/isitbig.org/projects/1) and [#2](https://github.com/yoannmoinet/isitbig.org/projects/2).
