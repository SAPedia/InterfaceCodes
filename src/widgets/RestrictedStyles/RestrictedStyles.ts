(() => {
    const { wgCanonicalSpecialPageName } = mw.config.get();
    const allowList = [
        'Preferences',
        'Gadgets',
        'Userlogin',
        'BotPasswords',
        'OATHManage',
        'CreateAccount',
        'ChangeCredentials',
        'VerifyOATHForUser',
        'RemoveCredentials',
        'ResetTokens',
    ];
    if (wgCanonicalSpecialPageName && allowList.includes(wgCanonicalSpecialPageName)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href =
            'https://saoaw.com/load.php?lang=zh&modules=ext.gadget.SiteStyles&only=styles&skin=citizen';
        document.head.append(link);
    }
})();
