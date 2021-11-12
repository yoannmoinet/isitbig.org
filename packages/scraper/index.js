import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import axios from 'axios';
import cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import fs from 'fs';
import c from 'chalk';
import slug from '@sindresorhus/slugify';

const fsP = fs.promises;

import { downloadImage, REQUEST_OPTS, ROOT } from './utils/index.js';

const scrap = async (page, { name, url, scrap }) => {
    console.log(`Scraping ${c.bold.green(name)}...`);
    const group = {
        name,
        url,
    };
    // Scrap websites
    group.brands = await scrap(
        async () => {
            try {
                const response = await axios.get(url, REQUEST_OPTS);
                return cheerio.load(response.data);
            } catch (e) {
                console.log(`[Axios] Error scraping ${c.bold.red(name)}.\n${e}`);
                return {};
            }
        },
        async () => {
            try {
                await page.goto(url);
                return page;
            } catch (e) {
                console.log(`[Puppeteer] Error scraping ${c.bold.red(name)}.\n${e}`);
                return {};
            }
        },
    );

    if (!group.brands.size) {
        return group;
    }

    console.log(`Downloading pictures for ${c.bold.green(name)}...`);
    // Download pictures.
    const proms = [];
    for (const [brandName, brand] of group.brands.entries()) {
        proms.push(
            new Promise(async (resolve) => {
                const groupDir = path.join(ROOT, `./packages/website/assets/${slug(name)}`);
                const imagePath = `${slug(brandName)}${path.extname(brand.picture)}`;

                // Ensure the dir exists.
                await fsP.mkdir(groupDir, { recursive: true });
                try {
                    await downloadImage(brand.picture, path.join(groupDir, imagePath));
                } catch (e) {
                    console.log(`${c.red('Failed')}: ${brand.picture}`);
                }

                // Update the path to the picture.
                brand.picture = path.relative(ROOT, path.join(groupDir, imagePath));
                group.brands.set(brandName, brand);
                resolve();
            }),
        );
    }

    await Promise.all(proms);
    return group;
};

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const proms = [];

        // Get groups' configurations
        const groupsPath = `${__dirname}/groups`;
        for (const name of fs.readdirSync(groupsPath)) {
            // if (!name.startsWith('disney')) continue;
            const config = await import(`${groupsPath}/${name}`);
            proms.push(scrap(page, config));
        }

        try {
            const everything = await Promise.all(proms);
            const groups = {};

            // Index groups by name
            for (const group of everything) {
                groups[slug(group.name)] = {
                    ...group,
                    brands: Object.fromEntries(group.brands),
                };
            }

            // Save the file in the website's assets.
            await fsP.writeFile(
                path.join(ROOT, './packages/website/assets/data.json'),
                JSON.stringify(groups, null, 4),
                'utf-8',
            );
            console.log(c.green.bold(`Done.`));
        } catch (e) {
            console.log(c.red(`Error scrapping:\n`), e);
        }
        await browser.close();
    } catch (e) {
        console.log(c.bold.red('Root unhandled'), e);
        if (browser) {
            await browser.close();
        }
        process.exit(1);
    }
})();
