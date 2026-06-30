$(() => {
    const { wgPageName, wgIsArticle } = mw.config.get(['wgPageName', 'wgIsArticle']);

    if (!wgIsArticle) {
        return;
    }

    mw.util.addPortletLink('p-cactions', '#', '清除缓存', 'ca-purge-cache', '点击清除当前页面缓存');
    $('#ca-purge-cache').on('click', async e => {
        e.preventDefault();
        try {
            await new mw.Api().post({
                action: 'purge',
                title: wgPageName,
                forcelinkupdate: true,
                forcerecursivelinkupdate: true,
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
