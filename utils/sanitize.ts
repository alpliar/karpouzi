import xss from 'xss';

export function sanitizeText(string: string) {
    // only include whitelisted tags, remove the others
    const options = {
        whiteList: xss.whiteList,
        stripIgnoreTag: true
    };

    return xss(string, options);
}
