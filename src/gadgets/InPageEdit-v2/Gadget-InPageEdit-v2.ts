(() => {
    mw.loader.load('https://testingcf.jsdelivr.net/npm/mediawiki-inpageedit@latest');
    mw.hook('InPageEdit').add(ctx => {
        const InPageEdit = ctx.InPageEdit,
            _msg = ctx._msg,
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
                    text:
                        // @ts-ignore
                        typeof Wikiplus !== 'undefined'
                            ? `${_msg('quick-edit')}(IPE)`
                            : _msg('quick-edit'),
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
