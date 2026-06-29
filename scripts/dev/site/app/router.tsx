/// <reference types="vite/client" />

import { useState, useEffect, lazy, Suspense, type ComponentType } from 'react';
import { BackButton } from './back-button';
import { MainPage } from './main-page';
import { pages } from './pages';
import { SiteMain } from './site-main';

const templateModules = import.meta.glob<{ default: ComponentType }>('~/templates/*/index.tsx');

function findModule(pageName: string) {
    const key = Object.keys(templateModules).find(k =>
        k.includes(`/templates/${pageName}/index.tsx`),
    );
    return key ? templateModules[key] : undefined;
}

export function Router() {
    const [pathname, setPathname] = useState(window.location.pathname);

    useEffect(() => {
        const onPopState = () => setPathname(window.location.pathname);
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    const pageName = decodeURIComponent(pathname.replace(/^\//, ''));

    if (pageName === '') {
        return <MainPage />;
    }

    const pageInfo = pages.get(pageName);
    if (!pageInfo) {
        return (
            <SiteMain title={pageName}>
                <p>不存在"{pageName}"。</p>
                <ul>
                    <li>
                        <BackButton linkLike>返回上一页</BackButton>
                    </li>
                    <li>
                        查看
                        <a href={`https://saoaw.com/${pageName}`} target="_blank">
                            SAPedia同名页面
                        </a>
                    </li>
                </ul>
            </SiteMain>
        );
    }

    const loader = findModule(pageInfo.pageName);
    if (!loader) {
        return (
            <SiteMain title={pageInfo.fullPageName}>
                <p>组件未找到。</p>
            </SiteMain>
        );
    }

    const LazyComponent = lazy(loader);

    return (
        <SiteMain title={pageInfo.fullPageName}>
            <Suspense fallback={<p>加载中……</p>}>
                <LazyComponent />
            </Suspense>
        </SiteMain>
    );
}
