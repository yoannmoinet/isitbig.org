import axios from 'axios';
import cheerio from 'cheerio';
import { getDetailsScraper } from '../utils/index.js';

export const name = 'Nestlé';
export const url = 'https://www.nestle.com/brands/brandssearchlist';
export const infoUrl = 'https://en.wikipedia.org/wiki/Nestl%C3%A9';

export const scrapDetails = getDetailsScraper(url, infoUrl);

export const scrapBrands = async (get$) => {
    const $ = await get$(url);
    const proms = [];
    const brands = new Map();
    const sections = $('.view-content > .views-row');

    for (let i = 0; i <= sections.length; i += 1) {
        const section = sections.eq(i);
        if (!section.html()) continue;

        const img = section.find('img');
        const link = section.find('a').attr('href');
        const name = section.find('.title-product').text();
        const description = section.find('.description').text();
        const brand = {
            name,
            description,
            picture: img && img.attr('src') ? `https://www.nestle.com/${img.attr('src').split('?')[0]}` : null,
        };

        if (!img || !img.attr('src')) {
            console.log('No picture', name);
        }

        const links = new Map();
        proms.push(
            axios.get(link).then((response) => {
                const in$ = cheerio.load(response.data);
                const linkOptions = in$('.views-row a');
                for (let j = 0; j <= linkOptions.length; j += 1) {
                    const l = linkOptions.eq(j);
                    if (!l.text() || !l.attr('href')) continue;
                    links.set(l.text(), l.attr('href'));
                }

                // The brand may not have any links so we use the one we have.
                if (!links.size) {
                    links.set(name, link);
                }

                brand.links = Object.fromEntries(links);
                brands.set(name, brand);
            }),
        );
    }

    await Promise.all(proms);
    return brands;
};
