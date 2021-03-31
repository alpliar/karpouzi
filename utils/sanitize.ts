import xss, { whiteList, IFilterXSSOptions } from 'xss';

export function sanitizeText(string: string) {
    // only include whitelisted tags, remove the others
    const options: IFilterXSSOptions = {
        whiteList: whiteList,
        stripIgnoreTag: true
    };

    return xss(string, options);
}
