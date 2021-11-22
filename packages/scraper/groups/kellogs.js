import axios from 'axios';
import cheerio from 'cheerio';
import c from 'chalk';

// Sometimes we can't get the right info.
const NAME_OVERRIDES = {};
export const ENABLED = false;
export const name = 'Kellogs';
export const url = 'https://www.kelloggcompany.com/en_US/brandportfolio.html';
export const urlBrandDetails = 'https://www.kelloggcompany.com/en_US/brandportfolio.html';

export const scrapDetails = async (get$, getPage) => {
    const details = {};
    return details;
};

export const scrapBrands = async (get$, getPage) => {
    const proms = [];
    const brands = new Map();
    return brands;
};
