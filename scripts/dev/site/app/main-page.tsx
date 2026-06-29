import { pages } from './pages';
import { SiteMain } from './site-main';

export function MainPage() {
    return (
        <SiteMain title="SAPedia 开发预览">
            <p>查看：</p>
            <ul>
                {[...pages.values()].map(({ fullPageName, pageName }) => (
                    <li key={fullPageName}>
                        <a href={`/${fullPageName}`}>{pageName}</a>
                    </li>
                ))}
            </ul>
        </SiteMain>
    );
}
