import fs from 'fs';
import axios from 'axios';
import cheerio from 'cheerio';
import path from 'path';
import c from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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
        'User-Agent':
            'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.112 Safari/535.1',
    },
};

export const getCheerio = (name) => async (url) => {
    try {
        const response = await axios.get(url, REQUEST_OPTS);
        return cheerio.load(response.data);
    } catch (e) {
        console.log(`[Axios] Error scraping ${c.bold.red(name)}.\n${e}`);
        return () => [];
    }
};

export const getPuppeteer = (name, page) => async (url) => {
    try {
        await page.goto(url);
        return page;
    } catch (e) {
        console.log(`[Puppeteer] Error scraping ${c.bold.red(name)}.\n${e}`);
        return {};
    }
};
