import axios from 'axios';
import cheerio from 'cheerio';
import c from 'chalk';

// Sometimes we can't get the right info.
const NAME_OVERRIDES = {};

export const name = 'PepsiCo';
export const url = 'https://www.pepsico.com/brands/product-information';
export const scrap = async (get$, getPage) => {
    const proms = [];
    const brands = new Map();
    return brands;
};
