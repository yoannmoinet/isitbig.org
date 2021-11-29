import slugify from '@sindresorhus/slugify';

import { getAttributes, getDetailsScraper } from '../utils/index.js';

export const name = 'Bayer';
export const url = 'https://www.bayer.com/en/products/products-from-A-to-Z';
export const infoUrl = 'https://en.wikipedia.org/wiki/Bayer';

export const scrapDetails = getDetailsScraper(url, infoUrl);

export const scrapBrands = async (get$, getPage) => {
    const proms = [];
    const brands = new Map();

    // Bayer is blocking curl/fetch requests and identifies them as bots.
    // const $ = await get$(url);
    const page = await getPage(url);

    proms.push(
        page.$$('.product-list-grid .views-row').then(async (items) => {
            for (const item of items) {
                const brand = {};

                // Get logo.
                const imgEl = await item.$('img');
                const imageSrc = (await getAttributes(page, imgEl)).src;
                brand.picture = `https://www.bayer.com${imageSrc.split('?')[0]}`;

                // Get name.
                const nameEl = await item.$('.views-field-title .field-content');
                brand.name = await nameEl.evaluate((el) => el.textContent.trim());

                // Get link
                const linkEl = await nameEl.$('a');
                if (linkEl) {
                    brand.links = {
                        Website: (await getAttributes(page, linkEl)).href,
                    };
                }

                // Get description.
                const descEls = [
                    '.views-field-field-field-of-activity',
                    '.views-field-field-application',
                    '.views-field-field-listing-description',
                    '.views-field-field-details',
                    '.views-field-nothing',
                ].map(async (sel) => {
                    const itemEl = await item.$(sel);
                    if (!itemEl) {
                        return null;
                    }
                    return itemEl.evaluate((el) => el.textContent.trim());
                });
                brand.description = (await Promise.all(descEls)).filter((e) => e).join('\n');

                brands.set(slugify(brand.name), brand);
            }
        }),
    );

    await Promise.all(proms);
    return brands;
};
