window.wgUXS = (
    wg: string,
    hans: string,
    hant?: string,
    cn?: string,
    tw?: string,
    hk?: string,
    sg?: string,
    zh?: string,
    mo?: string,
    my?: string,
): string => {
    const ret: Record<string, string> = {
        zh: zh || hans || hant || cn || tw || hk || sg || mo || my || '',
        'zh-hans': hans || cn || sg || my || '',
        'zh-hant': hant || tw || hk || mo || '',
        'zh-cn': cn || hans || sg || my || '',
        'zh-sg': sg || hans || cn || my || '',
        'zh-tw': tw || hant || hk || mo || '',
        'zh-hk': hk || hant || mo || tw || '',
        'zh-mo': mo || hant || hk || tw || '',
    };
    return ret[wg]! || zh! || hans! || hant! || cn! || tw! || hk! || sg! || mo! || my!;
};

window.wgULS = (
    hans: string,
    hant?: string,
    cn?: string,
    tw?: string,
    hk?: string,
    sg?: string,
    zh?: string,
    mo?: string,
    my?: string,
): string =>
    window.wgUXS(mw.config.get('wgUserLanguage')!, hans, hant!, cn!, tw!, hk!, sg!, zh!, mo!, my!);

window.wgUVS = (
    hans: string,
    hant?: string,
    cn?: string,
    tw?: string,
    hk?: string,
    sg?: string,
    zh?: string,
    mo?: string,
    my?: string,
): string =>
    window.wgUXS(mw.config.get('wgUserVariant')!, hans, hant!, cn!, tw!, hk!, sg!, zh!, mo!, my!);

const deprecate = mw.log.deprecate as (
    obj: unknown,
    prop: string,
    fn: unknown,
    msg: string,
) => void;

deprecate(
    window,
    'addPortletLink',
    (...args: Parameters<typeof mw.util.addPortletLink>) =>
        mw.util.addPortletLink.bind(mw.util)(...args),
    'Use mw.util.addPortletLink() instead',
);

deprecate(
    window,
    'getURLParamValue',
    (...args: Parameters<typeof mw.util.getParamValue>) =>
        mw.util.getParamValue.bind(mw.util)(...args),
    'Use mw.util.getParamValue() instead',
);

deprecate(
    window,
    'hasClass',
    (element: Element, className: string) => $(element).hasClass(className),
    'Use jQuery#hasClass instead',
);

const lc = window.libCachedCode;

deprecate(
    window,
    'importScriptCallback',
    (page: string, ready: () => void) =>
        lc
            .injectCachedCode(
                `${mw.config.get('wgServer')}${mw.config.get('wgScript')}?title=${mw.util.wikiUrlencode(page)}&action=raw&ctype=text/javascript`,
                'script',
            )
            .then(ready),
    'Use `await libCachedCode.injectCachedCode(page, "script")` instead',
);

deprecate(
    window,
    'importScriptURICallback',
    (page: string, ready: () => void) => lc.injectCachedCode(page, 'script').then(ready),
    'Use `await libCachedCode.injectCachedCode(page, "script")` instead',
);

window.libPrefixNumber = (num, length = 2) => `${num}`.padStart(length, '0');

const { wgNamespaceNumber, wgNamespaceIds } = mw.config.get([
    'wgNamespaceNumber',
    'wgNamespaceIds',
]) as { wgNamespaceNumber: number; wgNamespaceIds: Record<string, number> };

window.libGetPageNames = (): pageNames => {
    const result: pageNames = {
        talkPage: false,
        basePageName: false,
    };
    const ns: string[] = [];
    const talkNamespaceNumber =
        wgNamespaceNumber < 0 || wgNamespaceNumber % 2 === 1 ? NaN : wgNamespaceNumber + 1;
    let talkns = '';
    for (const [k, v] of Object.entries(wgNamespaceIds)) {
        if (v === wgNamespaceNumber) {
            ns.push(k);
        }
        if (!talkns && v === talkNamespaceNumber) {
            talkns = k;
        }
    }
    if (ns.length === 0) {
        return result;
    }
    let page = mw.config.get('wgPageName');
    const pageToLowerCase = page.toLowerCase();
    for (const n of ns) {
        const nsPrefix = `${n.toLowerCase()}:`;
        if (pageToLowerCase.startsWith(nsPrefix)) {
            const escapedNs = mw.util.escapeRegExp(n);
            page = page.replace(new RegExp(`^${escapedNs}:`, 'i'), '');
            break;
        }
    }
    result.basePageName = page;
    if (talkns) {
        result.talkPage = `${talkns}:${page}`;
    }
    return result;
};
