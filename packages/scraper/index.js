import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import fs from 'fs';
import c from 'chalk';
import slug from '@sindresorhus/slugify';
import _ from 'lodash';

import { downloadImage, ROOT, getCheerio, getPuppeteer } from './utils/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fsP = fs.promises;

const args = process.argv.slice(2);
const NAME = args[0];

const scrap = async (page, { name, scrapBrands, scrapDetails }) => {
    console.log(`Scraping ${c.bold.green(name)}...`);
    const proms = [];
    const group = { name };

    try {
        // Scrap for details
        group.details = await scrapDetails(getCheerio(name), getPuppeteer(name, page));
    } catch (e) {
        console.log(`Error scraping ${c.bold.cyan('details')} for ${c.bold.red(name)}.`, e);
    }
    try {
        // Scrap websites
        group.brands = await scrapBrands(getCheerio(name), getPuppeteer(name, page));
    } catch (e) {
        console.log(`Error scraping ${c.bold.cyan('website')} for ${c.bold.red(name)}.`, e);
    }

    console.log(`Downloading pictures for ${c.bold.green(name)}...`);
    const groupDir = path.join(ROOT, `./packages/website/public/img/${slug(name)}`);
    // Ensure the dir exists.
    await fsP.mkdir(groupDir, { recursive: true });

    if (group.details.picture) {
        proms.push(
            new Promise(async (resolve) => {
                const fileName = `${slug(group.details.name)}${path.extname(group.details.picture)}`;
                const filePath = path.join(groupDir, fileName);
                try {
                    await downloadImage(group.details.picture, filePath);
                } catch (e) {
                    console.log(`${c.red('Failed')}: ${group.details.picture}`);
                }

                // Update the path to the picture.
                group.details.picture = path.relative(ROOT, filePath);
                resolve();
            }),
        );
    }

    for (const [brandName, brand] of group.brands.entries()) {
        proms.push(
            new Promise(async (resolve) => {
                const fileName = `${slug(brandName)}${path.extname(brand.picture)}`;
                const filePath = path.join(groupDir, fileName);
                try {
                    await downloadImage(brand.picture, filePath);
                } catch (e) {
                    console.log(`${c.red('Failed')}: ${brand.picture}\n${e.toString()}`);
                }

                // Update the path to the picture.
                brand.picture = path.relative(ROOT, filePath);
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
            if (NAME && path.basename(name, path.extname(name)) !== NAME) continue;
            const config = await import(`${groupsPath}/${name}`);
            proms.push(scrap(page, config));
        }

        try {
            const dataPath = path.join(ROOT, './packages/website/public/data.json');
            const everything = await Promise.all(proms);
            const allData = JSON.parse(await fsP.readFile(dataPath));
            const groups = {};

            console.log('Merging data...');
            // Merge data
            for (const group of everything) {
                if (allData[group.details.slug]) {
                    allData[group.details.slug] = _.merge(allData[group.details.slug], group);
                } else {
                    allData[group.details.slug] = group;
                }
            }

            // Index groups by name
            for (const group of [...Object.values(allData)].sort((a, b) => b.details.slug - a.details.slug)) {
                // Sort brands alphabetically.
                const isMap = group.brands.constructor.name === 'Map';
                const brands = isMap ? Object.fromEntries(group.brands) : group.brands;
                const sortedBrands = {};
                for (const brandName of Object.keys(brands).sort()) {
                    sortedBrands[brandName] = brands[brandName];
                }

                groups[group.details.slug] = {
                    ...group,
                    brands: sortedBrands,
                };
            }

            console.log('Writing data...');
            // Save the file in the website's assets.
            await fsP.writeFile(dataPath, `${JSON.stringify(sortedGroups, null, 4)}\n`, 'utf-8');
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
