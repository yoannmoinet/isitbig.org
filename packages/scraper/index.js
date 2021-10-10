const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const fs = require('fs');
const c = require('chalk');

const { REQUEST_OPTS } = require('./utils');

const scrap = async (page, { name, url, scrap }) => {
    const brands = await scrap(
        async () => {
            const response = await axios.get(url, REQUEST_OPTS);
            return cheerio.load(response.data);
        },
        async () => {
            await page.goto(url);
            return page;
        },
    );
    return brands;
};

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const proms = [];

        // Get groups' configurations
        const groupsPath = `${__dirname}/groups`;
        for (const name of fs.readdirSync(groupsPath)) {
            const config = require(`${groupsPath}/${name}`);
            console.log(`Scraping ${c.bold.green(config.name)}...`);
            proms.push(scrap(page, config));
        }
        try {
            const everything = await Promise.all(proms);
            console.log(`Got Everything`);
        } catch (e) {
            console.log(c.red(`Error scrapping:\n`), e);
        }
        await browser.close();
    } catch (e) {
        console.log(c.bold.red('Root unhandled'), e);
        if (browser) {
            await browser.close();
        }
    }
})();
