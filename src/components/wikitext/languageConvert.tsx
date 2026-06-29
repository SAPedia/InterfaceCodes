import type { ReactNode } from 'react';
import { CONVERT_TO_HTML } from '~/lib/config';

interface WikitextNoLanguageConversionProps {
    children: ReactNode;
}

function WikitextNoLanguageConversion({ children }: WikitextNoLanguageConversionProps) {
    if (CONVERT_TO_HTML) {
        return children;
    }
    return (
        <>
            {'-{'}
            {children}
            {'}-'}
        </>
    );
}

export { WikitextNoLanguageConversion };
