# isitbig.org

## Overview

![GitHub deployments](https://img.shields.io/github/deployments/yoannmoinet/isitbig.org/production?label=vercel&logo=vercel&logoColor=white)

Helps you find if a brand is part of a big group.

The data is gathered in `./packages/website/public/data.json` from scrap scripts in `./packages/scraper`.

There's also a `./packages/website/overrides.json` in case we need to enter manual data.

## Groups

-   [x] [Kellogg's](https://isitbig.org/brand/kellogs)
-   [x] [The Walt Disney Company](https://isitbig.org/brand/disney)
-   [x] [The CocaCola Company](https://isitbig.org/brand/the-coca-cola-company)
-   [x] [Nestlé](https://isitbig.org/brand/nestle)
-   [x] [PepsiCo](https://isitbig.org/brand/pepsico)
-   [ ] [Luxottica](https://www.luxottica.com/en/eyewear-brands)
-   [ ] [LVMH](https://www.lvmh.com/houses/)
-   [ ] [Kering](https://www.kering.com/en/houses/)
-   [ ] [Swatch]()
-   [ ] [Unilever](https://www.unilever.com/brands/all-brands/)
-   [ ] [Monsanto/Bayer](https://www.bayer.com/en/products/products-from-A-to-Z)

## TODOS

-   [ ] Fix logo background for white logos
-   [ ] Fix search slowness
-   [ ] Scrap more groups
-   [ ] Have a logo
-   [ ] Social tags + banners

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
