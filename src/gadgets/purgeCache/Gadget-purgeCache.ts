$(() => {
    const { wgPageName, wgIsArticle } = mw.config.get(['wgPageName', 'wgIsArticle']);

    if (!wgIsArticle) {
        return;
    }

    const api = new mw.Api();

    mw.util.addPortletLink('p-cactions', '#', '清除缓存', 'ca-purge-cache', '点击清除当前页面缓存');
    $('#ca-purge-cache').on('click', async e => {
        e.preventDefault();
        try {
            await api.post({
                action: 'purge',
                title: wgPageName,
                forcelinkupdate: true,
                forcerecursivelinkupdate: true,
            });
            await api.postWithToken('csrf', {
                action: 'edit',
                title: wgPageName,
                appendtext: '',
                nocreate: true,
                watchlist: 'nochange',
            });
            mw.notify('清除成功，即将刷新……', { type: 'success' });
            setTimeout(() => {
                location.reload();
            }, 2000);
        } catch (err) {
            mw.notify('清除缓存失败，请重试或于控制台查看详情', { type: 'error' });
            console.error(`[purgeCache] ${String(err)}`);
        }
    });
});
