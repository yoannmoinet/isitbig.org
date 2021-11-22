import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import puppeteer from 'puppeteer';
import fs from 'fs';
import c from 'chalk';
import slug from '@sindresorhus/slugify';

const fsP = fs.promises;

import { downloadImage, ROOT, getCheerio, getPuppeteer } from './utils/index.js';

const scrap = async (page, { name, scrapBrands, scrapDetails }) => {
    console.log(`Scraping ${c.bold.green(name)}...`);
    const group = { name };

    // Scrap for details
    group.details = await scrapDetails(getCheerio(name), getPuppeteer(name, page));
    // Scrap websites
    group.brands = await scrapBrands(getCheerio(name), getPuppeteer(name, page));

    console.log(`Downloading pictures for ${c.bold.green(name)}...`);
    const proms = [];
    const groupDir = path.join(ROOT, `./packages/website/public/img/${slug(name)}`);
    // Ensure the dir exists.
    await fsP.mkdir(groupDir, { recursive: true });

    if (group.details.logo) {
        proms.push(
            new Promise(async (resolve) => {
                const fileName = `${slug(group.details.name)}${path.extname(group.details.logo)}`;
                const filePath = path.join(groupDir, fileName);
                try {
                    await downloadImage(group.details.logo, filePath);
                } catch (e) {
                    console.log(`${c.red('Failed')}: ${group.details.logo}`);
                }

                // Update the path to the picture.
                group.details.logo = path.relative(ROOT, filePath);
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
            if (name.startsWith('_')) continue;
            const config = await import(`${groupsPath}/${name}`);
            proms.push(scrap(page, config));
        }

        try {
            const everything = await Promise.all(proms);
            const groups = {};

            // Index groups by name
            for (const group of everything) {
                // Sort brands alphabetically.
                const brands = Object.fromEntries(group.brands);
                const sortedBrands = {};
                for (const brandName of Object.keys(brands).sort()) {
                    sortedBrands[brandName] = brands[brandName];
                }

                groups[slug(group.name)] = {
                    ...group,
                    brands: sortedBrands,
                };
            }

            // Save the file in the website's assets.
            await fsP.writeFile(
                path.join(ROOT, './packages/website/public/data.json'),
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
