import axios from 'axios';
import cheerio from 'cheerio';
import { getDetailsScraper, getMetas } from '../utils/index.js';
import slugify from '@sindresorhus/slugify';

const OVERRIDES_WEBSITES = {
    'All-Bran': 'https://www.all-bran.com/en_US/home.html',
    'Coco Pops/Chocos': 'https://www.kelloggs.com.au/en_AU/brands/coco-pops.html/',
};

export const name = 'Kellogs';
export const url = 'https://www.kelloggcompany.com/en_US/brandportfolio.html';
export const infoUrl = 'https://en.wikipedia.org/wiki/Kellogg%27s';

export const scrapDetails = getDetailsScraper(url, infoUrl);

export const scrapBrands = async (get$) => {
    const proms = [];
    const brands = new Map();
    const $ = await get$(url);
    const brandsElements = $('.brand');

    // First one is just Kellog's
    for (let i = 1; i <= brandsElements.length; i += 1) {
        const brandEl = brandsElements.eq(i);
        if (!brandEl.html()) continue;
        const brand = {};
        brand.picture = `https://www.kelloggcompany.com/${brandEl.find('img').attr('src')}`;
        brand.name = brandEl.find('h2').text();

        // Get english link.
        const brandUrl = OVERRIDES_WEBSITES[brand.name] || brandEl.find('.popup-content a').eq(0).attr('href');

        if (!brandUrl) {
            continue;
        }

        brand.links = {
            Website: brandUrl,
        };

        // Get description
        proms.push(
            axios.get(brandUrl).then(
                (response) => {
                    const $$ = cheerio.load(response.data);
                    const metas = getMetas($$('head meta'));
                    if (metas.description) {
                        brands.description = metas.description.content;
                    }
                    brands.set(slugify(brand.name), brand);
                },
                (e) => {
                    // What can we do?
                    // Use overrides as last resort.
                    console.log('Failed', brand.name, brandUrl);
                },
            ),
        );
    }

    await Promise.all(proms);
    return brands;
};
