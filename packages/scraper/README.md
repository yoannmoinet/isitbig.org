# Scraper

## Add a new scraper

1. **Create a scraper**

Create a new file in `./groups/<name>.js`

```js
export const name = '<name of group>';
export const url = '<page that list brands>';
export const infoUrl = '<wikipedia page>';

export const scrapDetails = async (get$, getPage) => {
    const details = {
        name,
        slug: slugify(name),
        url,
        infoUrl,
        description,
        picture,
    };
    return details;
};

export const scrapBrands = async (get$, getPage) => {
    const brands = new Map();
    return brands;
};
```

2. **Scrap details**

Usually, we scrap details from the group's wikipedia page.

You have access to a default one `getDetailsScraper`, it will scrap the name, description and logo of a group, given its url.

You can replace the `scrapDetails` function of your group with:

```js
import { getDetailsScraper } from '../utils/index.js';

export const scrapDetails = getDetailsScraper(url, infoUrl);
```

3. **Scrap the brands**

In your `scrapBrands` script you can choose to use either [Cheerio](https://cheerio.js.org/) or [Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v10.4.0&show=outline) by using respectively `get$` and `getPage`:

```js
export const scrapBrands = async (get$, getPage) => {
    const $ = await get$(url);
    const page = await getPage(url);
};
```

Then you're free to use whatever lib you need. Take example of what's been already done in [`./packages/scraper/groups/*`](./groups)

4. **Run the command**

```bash
yarn scrap <name>
```

And it will add the new group and its brands to the shared data in `./packages/website/public/data.json`

## Usage

```bash
yarn start <group>
```

:warning: New data will delete the previous data.
