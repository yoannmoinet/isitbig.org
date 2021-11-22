export const getDetailsScraper = (url, infoUrl) => async (get$) => {
    const $ = await get$(infoUrl);
    let description = '';

    const logo = `https:${$('.infobox-image.logo > a.image > img').attr('src')}`;
    const name = $('#firstHeading').text();
    const selector = '#mw-content-text > .mw-parser-output >';

    const indexStart = $(`${selector} .infobox.vcard`).index();
    const indexEnd = $(`${selector} div[class^='toc']`).index();

    for (let i = indexStart + 1; i < indexEnd; i += 1) {
        description += $(`${selector} *`).eq(i).text();
    }

    return {
        name,
        url,
        infoUrl,
        description,
        logo,
    };
};
