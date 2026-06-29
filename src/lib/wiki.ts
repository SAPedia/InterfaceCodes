import md5 from 'crypto-js/md5';

const WIKI_SITE_BASE = process.env['WIKI_SITE_BASE'] || 'https://saoaw.com';

/**
 * 规范化 wiki 页面标题
 *
 * @param title 页面标题
 */
const normalizeWikiTitle = (title: string): string => {
    let result = title.replace(/ /g, '_').trim();

    if (result.length === 0) {
        throw new Error('Wiki title cannot be empty');
    }

    const chars = Array.from(result);
    const first = chars[0]!;
    const upper = first.toLocaleUpperCase();
    if (first !== upper) {
        chars[0] = upper;
        result = chars.join('');
    }

    return result.replace(/^_+|_+$/g, '');
};

/**
 * 通过 MediaWiki 标准 MD5 哈希路径构造图片相对路径
 *
 * @param fileName - 文件名（如 "Example.jpg"）
 * @returns 图片相对路径
 */
const getWikiImagePath = (fileName: string): string => {
    const normalizedName = normalizeWikiTitle(fileName);
    const hash = md5(normalizedName).toString();
    const first = hash[0]!;
    const prefix = hash.slice(0, 2);
    const encoded = normalizedName.replace(/%/g, '%25');
    return `/images/${first}/${prefix}/${encoded}`;
};

/**
 * 获取图片完整 URL。
 *
 * @param fileName - 文件名
 * @returns 图片完整 URL
 */
const getWikiImageUrl = (fileName: string): string => {
    return `${WIKI_SITE_BASE}${getWikiImagePath(fileName)}`;
};

/**
 * 获取 wiki 页面路径
 *
 * @param pageName - 页面标题
 * @returns 页面相对路径
 */
const getWikiPageUrl = (pageName: string): string => {
    return '/' + pageName.replace(/ /g, '_');
};

export { normalizeWikiTitle, getWikiImagePath, getWikiImageUrl, getWikiPageUrl };
