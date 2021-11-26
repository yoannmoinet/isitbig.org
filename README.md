# isitbig.org

## Overview

![GitHub deployments](https://img.shields.io/github/deployments/yoannmoinet/isitbig.org/production?label=vercel&logo=vercel&logoColor=white)

Helps you find if a brand is part of a big group.

The data is gathered in `./packages/website/public/data.json` from scrap scripts in `./packages/scraper`.

There's also a `./packages/website/overrides.json` in case we need to enter manual data.

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
