import type { ReactNode } from 'react';
import { CONVERT_TO_HTML } from '~/lib/config';
import { getWikiPageUrl } from '~/lib/wiki';

/** wikitext 模式下将 ReactNode 安全转为文本 */
const asText = (node: ReactNode): string => {
    if (typeof node === 'string' || typeof node === 'number') {
        return String(node);
    }
    return '';
};

// [[page]]
interface WikitextLinkSimpleProps {
    page?: undefined;
    children: string;
}

// [[page|text]]
interface WikitextLinkComplexProps {
    page: string;
    children: ReactNode;
}

type WikitextInternalLinkProps = WikitextLinkSimpleProps | WikitextLinkComplexProps;

interface WikitextExternalLinkProps {
    href: string;
    children: ReactNode;
}

type WikitextLinkProps = WikitextInternalLinkProps | WikitextExternalLinkProps;

const NS_FILE_PATTERN = /^(?:Category|File|Image|Media|分[类類]|文件|[档檔]案|[图圖][片像]):/i;

function WikitextExternalLink({ href, children }: WikitextExternalLinkProps) {
    if (!/^https?:\/\//.test(href)) {
        if (CONVERT_TO_HTML) {
            return <>{children}</>;
        }
        return <>{`[${href} ${asText(children)}]`}</>;
    }

    if (CONVERT_TO_HTML) {
        return (
            <a target="_blank" rel="noreferrer noopener" className="external text" href={href}>
                {children}
            </a>
        );
    }

    return <>{`[${href} ${asText(children)}]`}</>;
}

function WikitextInternalLink({ page, children }: WikitextInternalLinkProps) {
    if (page === undefined) {
        // [[Page]]
        const text = children;
        if (CONVERT_TO_HTML) {
            return (
                <a href={getWikiPageUrl(text)} title={text}>
                    {text}
                </a>
            );
        }
        return <>{`[[${text}]]`}</>;
    }

    // [[page|text]]
    if (NS_FILE_PATTERN.test(page)) {
        console.warn(
            `[[${page}]] 不是有效的 wikitext 内部链接，是否忘记在开头加冒号（:${page}）？`,
        );
    }

    if (CONVERT_TO_HTML) {
        return (
            <a href={getWikiPageUrl(page)} title={page}>
                {children}
            </a>
        );
    }

    return <>{`[[${page}|${asText(children)}]]`}</>;
}

function WikitextLink(props: WikitextLinkProps) {
    if ('href' in props) {
        return <WikitextExternalLink {...props} />;
    }
    return <WikitextInternalLink {...props} />;
}

export { WikitextLink };
