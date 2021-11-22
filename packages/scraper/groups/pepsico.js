import axios from 'axios';
import { getDetailsScraper } from './_common.js';
import slugify from '@sindresorhus/slugify';

// Sometimes we can't get the right info.
const NAME_OVERRIDES = {};
export const ENABLED = false;
export const name = 'PepsiCo';
export const url = 'https://www.pepsico.com/brands/product-information';
export const infoUrl = 'https://en.wikipedia.org/wiki/PepsiCo';

export const scrapDetails = getDetailsScraper(url, infoUrl);

export const scrapBrands = async (get$) => {
    const $ = await get$(url);
    const proms = [];
    const brands = new Map();
    const buttons = $('.data-filter-grid__content.grid-info-collapse > button');

    for (let i = 0; i <= buttons.length; i += 1) {
        const button = buttons.eq(i);
        const id = button.attr('data-content-id');
        proms.push(
            new Promise(async (resolve) => {
                const brand = {};
                try {
                    const { data } = await axios.get(`https://www.pepsico.com/data/getbrand?id=${id}`);
                    brand.name = data.title.trim();
                    brand.links = {
                        nutrition: data.nutritionalInformationLink,
                        where: data.whereToBuyLink,
                    };
                    brand.picture = data.imageUrl.split('?')[0];
                    brand.description = data.description.replace('<p>', '').replace('</p>', '\n');
                    brands.set(slugify(brand.name), brand);
                } catch (e) {
                    console.log(`Couldn't get data from ${button}`);
                }
                resolve(brand);
            }),
        );
    }
    await Promise.all(proms);
    return brands;
};
