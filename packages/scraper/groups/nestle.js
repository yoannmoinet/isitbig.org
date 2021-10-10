const axios = require('axios');
const cheerio = require('cheerio');
const c = require('chalk');
const { REQUEST_OPTS } = require('../utils');

// Sometimes we can't get the right info.
const NAME_OVERRIDES = {};

module.exports = {
    name: 'Nestlé',
    url: 'https://www.nestle.com/brands/brandssearchlist',
    scrap: async (get$, getPage) => {
        const proms = [];
        const brands = new Map();
        return brands;
    },
};
