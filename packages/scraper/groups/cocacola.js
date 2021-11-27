import slugify from '@sindresorhus/slugify';
import axios from 'axios';
import cheerio from 'cheerio';

import { getAttributes, getDetailsScraper, getMetas, REQUEST_OPTS } from '../utils/index.js';

const URL_OVERRIDES = {
    'https://www.schweppes.com/': 'https://www.schweppesus.com/',
};

const METAS_OVERRIDES = {
    'https://www.aquarius-sports.jp/': (metas) => {
        return {
            name: metas['og:title'].content.split('/').reverse().join(' | '),
        };
    },
    'https://www.ayataka.jp/': () => {
        return {
            name: 'Aya Taka | 綾鷹',
        };
    },
    'https://www.georgia.jp/': () => {
        return {
            name: 'Georgia | ジョージア',
        };
    },
    'https://www.i-lohas.jp/': () => {
        return {
            name: 'I Lohas | い･ろ･は･す',
        };
    },
    'https://www.coca-colacompany.com/brands/ades': (metas) => {
        return {
            name: metas['og:title'].content.split(' - ')[0].trim(),
        };
    },
    'https://www.barqs.com/': (metas) => {
        return {
            name: decodeURIComponent(metas['og:title'].content.replace(' Home', '')),
            description: decodeURIComponent(metas['og:description']),
        };
    },
    'https://www.coca-colamexico.com.mx/marcas/ciel': (metas) => {
        return {
            name: 'Ciel',
        };
    },
    'https://us.coca-cola.com/': (metas) => {
        return {
            name: metas['og:title'].content.split(' | ').pop().trim(),
        };
    },
    'https://www.costa.co.uk/': () => {
        return {
            name: 'Costa Coffee',
            description: `Costa is the Nation's Favourite coffee shop and the largest and fastest growing coffee shop chain in the UK.`,
        };
    },
    'https://www.dasani.com': (metas) => {
        return {
            name: metas['og:site_name'].content.split('|')[0].trim(),
        };
    },
    'https://www.fresca.com/': (metas) => {
        return {
            name: metas['og:title'].content.split(' ')[0].trim(),
        };
    },
    'https://www.fanta.com/': (metas) => {
        return {
            name: metas['twitter:site'].content,
            description: metas['twitter:description'].content,
        };
    },
    'https://www.fuze-tea.com/en/home.html': () => {
        return {
            name: 'Fuze Tea',
        };
    },
    'https://www.goldpeakbeverages.com/': (metas) => {
        return {
            name: metas['og:site_name'].content.split('|').pop().trim(),
        };
    },
    'https://www.honesttea.com/': (metas) => {
        return {
            name: metas['og:title'].content.split('|').pop().trim(),
        };
    },
    'https://www.minutemaid.com/': (metas) => {
        return {
            name: metas['og:site_name'].content.split('|')[0].trim(),
        };
    },
    'https://www.peacetea.com/': (metas) => {
        return {
            name: metas.title.content.split('|').pop().trim(),
            description: decodeURIComponent(metas.description.content),
        };
    },
    'https://www.innocentdrinks.co.uk/': (metas) => {
        return {
            name: metas.title.content.split('-')[0].trim(),
            description: metas.description.content,
        };
    },
    'https://www.powerade.com/': (metas) => {
        return {
            name: metas['og:title'].content.split('|')[0].trim(),
        };
    },
    'https://www.drinkbodyarmor.com/': (metas) => {
        return {
            name: metas['og:title'].content.split('|')[1].trim(),
        };
    },
    'https://www.drinksimplybeverages.com/': (metas) => {
        return {
            name: metas['og:title'].content.split('|').pop().trim(),
        };
    },
    'https://www.appletiser.com/': (metas) => {
        return {
            name: 'Appletiser',
        };
    },
    'https://www.drinksmartwater.com/': (metas) => {
        return {
            name: metas['og:title'].content.split(' ')[0].trim(),
        };
    },
    'https://www.sprite.com/': (metas) => {
        return {
            name: metas['twitter:title'].content.split('|').pop().trim(),
            description: metas['twitter:description'].content,
        };
    },
    'https://www.topochicousa.net/': (metas) => {
        return {
            name: metas['og:title'].content.split('|')[0].trim(),
        };
    },
    'https://www.dogadan.com.tr/': (metas) => {
        return {
            name: metas.title.content,
        };
    },
    'https://www.fairlife.com/': (metas) => {
        return {
            name: metas['og:title'].content.split('|').pop().trim(),
        };
    },
};

export const name = 'CocaCola';
export const url = 'https://www.coca-colacompany.com/brands';
export const infoUrl = 'https://en.wikipedia.org/wiki/The_Coca-Cola_Company';

export const scrapDetails = getDetailsScraper(url, infoUrl);

export const scrapBrands = async (get$, getPage) => {
    const proms = [];
    const brands = new Map();
    const page = await getPage(url);
    const cards = await page.$$('.card-deck .card');

    for (let card of cards) {
        proms.push(
            card.$('a').then(async (aEl) => {
                const brand = {};
                const url = (await getAttributes(page, aEl)).href;
                brand.links = { Website: url };
                const image = await aEl.$('.svg-logo-object img');
                brand.picture = `https://www.coca-colacompany.com${(await getAttributes(page, image))['data-src']}`;

                // Get more details
                try {
                    const metasUrl = URL_OVERRIDES[url] || url;
                    const $ = cheerio.load((await axios.get(metasUrl, { timeout: 5000 })).data);
                    const metas = { ...getMetas($('head meta')), title: { content: $('title').text() } };
                    if (metas['og:description'] && metas['og:description'].content.trim()) {
                        brand.description = metas['og:description'].content;
                    }
                    if (metas['og:title'] && metas['og:title'].content.trim()) {
                        brand.name = metas['og:title'].content;
                    }

                    if (METAS_OVERRIDES[url]) {
                        Object.assign(brand, METAS_OVERRIDES[url](metas));
                    }
                } catch (e) {
                    // What can we do? Return the default override
                    if (METAS_OVERRIDES[url]) {
                        Object.assign(brand, METAS_OVERRIDES[url]({}));
                    }
                }

                brands.set(slugify(brand.name), brand);
            }),
        );
    }

    await Promise.all(proms);
    return brands;
};
