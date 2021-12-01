import axios from 'axios';
import cheerio from 'cheerio';
import { REQUEST_OPTS, getDetailsScraper, getMetas } from '../utils/index.js';

// Sometimes we can't get the right info.
const NAME_OVERRIDES = {
    'Disney Music | Original': 'Disney Music',
    'Disney Books | Disney Publishing Worldwide': 'Disney Books',
    'shopDisney.com': 'Show Disney',
    'ESPN.com': 'ESPN',
};

export const name = 'Disney';

export const url = 'https://thewaltdisneycompany.com/about/';
export const infoUrl = 'https://en.wikipedia.org/wiki/The_Walt_Disney_Company';

export const scrapDetails = getDetailsScraper(url, infoUrl);

export const scrapBrands = async (get$) => {
    const $ = await get$(url);
    const proms = [];
    const brands = new Map();
    const sections = $('#our-businesses > section');

    for (let i = 0; i <= sections.length; i += 1) {
        const section = sections.eq(i);
        if (!section.html()) continue;

        const cards = section.find('div>div>div>div>a');

        for (let j = 0; j <= cards.length; j += 1) {
            const card = cards.eq(j);
            if (!card.html()) continue;

            const img = card.find('img');
            const name = (img ? img.attr('alt') : link).replace(/[-_ ](Logo)?/gi, ' ');
            const link = card.attr('href');
            const links = new Map();
            links.set(name, link);
            const brand = {
                name,
                picture: img?.attr('src').split('?')[0],
            };

            // Try to get a better name.
            proms.push(
                axios
                    .get(link, REQUEST_OPTS(url))
                    .then(
                        async (response) => {
                            const $$ = cheerio.load(response.data);
                            const metas = getMetas($$('head meta'));

                            let foundName;
                            if (metas['og:site_name']) {
                                foundName = metas['og:site_name'].content;
                            }
                            if (metas.description) {
                                brand.description = metas.description.content;
                            }

                            if (foundName) {
                                // Use overrides as last resort.
                                brand.name = NAME_OVERRIDES[foundName] || foundName;
                            }
                        },
                        (e) => {
                            // What can we do?
                            // Use overrides as last resort.
                            brand.name = NAME_OVERRIDES[brand.name] || brand.name;
                        },
                    )
                    .then(() => {
                        links.set(name, card.attr('href'));
                        brand.links = Object.fromEntries(links);
                        brands.set(name, brand);
                    }),
            );
        }
    }
    await Promise.all(proms);
    return brands;
};
