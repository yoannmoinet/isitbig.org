const axios = require('axios');
const cheerio = require('cheerio');
const c = require('chalk');
const { REQUEST_OPTS } = require('../utils');

// Sometimes we can't get the right info.
const NAME_OVERRIDES = {};

module.exports = {
    name: 'PepsiCo',
    url: 'https://www.pepsico.com/brands/product-information',
    scrap: async (get$, getPage) => {
        const proms = [];
        const brands = new Map();
        return brands;
    },
};
