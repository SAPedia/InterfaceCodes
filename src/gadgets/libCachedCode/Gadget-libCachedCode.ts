(() => {
    const localObjectStorage = new LocalObjectStorage('AnnTools-libCachedCode', {
        expires: [30, 'days'],
    });
    for (const i of Object.keys(localStorage)) {
        if (i.startsWith('AnnTools-libCachedCode')) {
            localStorage.removeItem(i);
        }
    }
    const codeToUrl = (code: string): string => {
        const blob = new Blob([code], { type: 'text/plain' });
        return URL.createObjectURL(blob);
    };
    const getCachedCode = async (url: string): Promise<string> => {
        let { code } = (localObjectStorage.getItem(`${url}`) as { code?: string }) || {};
        if (typeof code !== 'string') {
            code = await (await fetch(url)).text();
        }
        localObjectStorage.setItem(`AnnTools-libCachedCode:${url}`, { code });
        return code;
    };
    const getCachedCodeUrl = async (url: string): Promise<string> =>
        codeToUrl(await getCachedCode(url));
    const injectCachedCode = async (url: string, _type: string): Promise<void> => {
        const type = _type.toLowerCase();
        if (['script', 'javascript', 'js'].includes(type)) {
            const script = document.createElement('script');
            script.src = await getCachedCodeUrl(url);
            return await new Promise<void>(res => {
                script.addEventListener('load', () => {
                    res();
                });
                document.head.append(script);
            });
        }
        if (['css', 'style'].includes(type)) {
            mw.loader.addStyleTag(await getCachedCode(url));
            return;
        }
    };
    const batchInjectCachedCode = (urls: string[], type: string): Promise<void[]> =>
        Promise.all(urls.map(url => injectCachedCode(url, type)));
    window.libCachedCode = {
        getCachedCode,
        getCachedCodeUrl,
        injectCachedCode,
        batchInjectCachedCode,
    };
})();
