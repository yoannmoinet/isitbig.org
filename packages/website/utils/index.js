export const getImageSrc = (src) => {
    return `/${src.split('/').slice(3).join('/')}`;
};
