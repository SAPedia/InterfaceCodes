(() => {
    mw.loader.load('https://testingcf.jsdelivr.net/npm/mediawiki-inpageedit@latest');
    mw.hook('InPageEdit').add(ctx => {
        const InPageEdit = ctx.InPageEdit,
            { wgRelevantPageName, wgRevisionId } = mw.config.get([
                'wgRelevantPageName',
                'wgRevisionId',
            ]);
        $('#ca-edit').after(
            $('<li>', {
                id: 'ca-quick-edit',
                class: 'vector-tab-noicon mw-list-item',
            }).append(
                $('<a>', {
                    href: 'javascript:void(0)',
                    text: ctx._msg('quick-edit'),
                }).on('click', () => {
                    InPageEdit.quickEdit({
                        page: wgRelevantPageName,
                        revision: wgRevisionId || undefined,
                    });
                }),
            ),
        );
    });
})();
