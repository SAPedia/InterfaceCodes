import { createElement, type ReactNode } from 'react';
import { CONVERT_TO_HTML } from '~/lib/config';

interface WikitextTranscludeProps {
    children: ReactNode;
}

function WikitextNoInclude({ children }: WikitextTranscludeProps): ReactNode {
    if (CONVERT_TO_HTML) {
        return null;
    }
    return createElement('noinclude', null, children);
}

function WikitextIncludeOnly({ children }: WikitextTranscludeProps): ReactNode {
    if (CONVERT_TO_HTML) {
        return children;
    }
    return createElement('includeonly', null, children);
}

function WikitextOnlyInclude({ children }: WikitextTranscludeProps): ReactNode {
    if (CONVERT_TO_HTML) {
        if (process.env['NODE_ENV'] !== 'production') {
            console.warn('模拟的 <onlyinclude> 行为可能与真实 MediaWiki 不同');
        }
        return children;
    }
    return createElement('onlyinclude', null, children);
}

export { WikitextNoInclude, WikitextIncludeOnly, WikitextOnlyInclude };
