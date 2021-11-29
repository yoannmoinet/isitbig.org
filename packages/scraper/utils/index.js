import fs from 'fs';
import axios from 'axios';
import cheerio from 'cheerio';
import path from 'path';
import c from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import slugify from '@sindresorhus/slugify';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const downloadImage = async (url, destination) => {
    const tempFile = path.resolve('./temp', path.relative(__dirname, destination));
    const writer = fs.createWriteStream(tempFile);
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', async (result) => {
            await fs.promises.rename(tempFile, destination);
            resolve(result);
        });
        writer.on('error', async (error) => {
            await fs.promises.unlink(tempFile);
            reject(error);
        });
    });
};

export const ROOT = path.resolve(__dirname, '../../../');

export const REQUEST_OPTS = {
    headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
        authority: 'scrapeme.live',
        'cache-control': 'no-cache',
        dnt: '1',
        pragma: 'no-cache',
        referrer: 'https://www.bayer.com',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'sec-gpc': '1',
        'upgrade-insecure-requests': '1',
        'user-agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36',
    },
};

export const getCheerio = (name) => async (url) => {
    try {
        const response = await axios.get(url, REQUEST_OPTS);
        return cheerio.load(response.data);
    } catch (e) {
        console.log(`[Axios] Error scraping ${c.bold.red(name)}: ${c.red(url)}.\n${e}`);
        return () => [];
    }
};

export const getPuppeteer = (name, page) => async (url) => {
    try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        return page;
    } catch (e) {
        console.log(`[Puppeteer] Error scraping ${c.bold.red(name)}.\n${e}`);
        return {};
    }
};

export const getDetailsScraper = (url, infoUrl) => async (get$) => {
    const $ = await get$(infoUrl);
    let description = '';

    const picture = `https:${$('.infobox-image.logo > a.image > img').attr('src')}`
        .split('/')
        .slice(0, -1)
        .join('/')
        .replace('/thumb', '');

    const name = $('#firstHeading').text();
    const selector = '#mw-content-text > .mw-parser-output >';

    const indexStart = $(`${selector} .infobox.vcard`).index();
    const indexEnd = $(`${selector} div[class^='toc']`).index();

    for (let i = indexStart + 1; i < indexEnd; i += 1) {
        description += $(`${selector} *`).eq(i).text();
    }

    return {
        name,
        slug: slugify(name),
        url,
        infoUrl,
        description,
        picture,
    };
};

export const getAttributes = async (page, element) => {
    return page.evaluate((el) => {
        const attr = {};
        const attributes = Array.from(el.attributes);
        for (let a of attributes) {
            attr[a.name] = el.getAttribute(a.name);
        }
        return attr;
    }, element);
};

export const getMetas = (metas) => {
    const allMetas = {};
    for (let i = 0; i <= metas.length; i += 1) {
        const meta = metas.eq(i);
        const metaId = meta.attr('name') || meta.attr('property');
        if (!metaId) {
            continue;
        }
        allMetas[metaId] = { ...meta.attr() };
    }
    return allMetas;
};
