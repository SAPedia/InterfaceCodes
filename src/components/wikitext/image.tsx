import type { ReactNode } from 'react';
import { CONVERT_TO_HTML } from '~/lib/config';
import { TokenList } from '~/lib/utils';
import { getWikiPageUrl, normalizeWikiTitle } from '~/lib/wiki';
import { WikiImage } from '../wikiImage';

interface WikitextImageProps {
    file: string;
    width?: number;
    height?: number;
    link?: string | false;
    alt?: string;
    className?: string;
}

function sizeToString(width?: number, height?: number): string | undefined {
    if (width === undefined && height === undefined) {
        return undefined;
    }
    if (width !== undefined) {
        return height !== undefined ? `${width}x${height}px` : `${width}px`;
    }
    return `x${height}px`;
}

function paramsToString(
    size: string | undefined,
    link: string | false | undefined,
    alt: string | undefined,
    className: string | undefined,
): string {
    const params = [
        size,
        link === undefined ? undefined : `link=${link || ''}`,
        alt === undefined ? undefined : `alt=${alt}`,
        className === undefined ? undefined : `class=${className}`,
    ];
    return params.filter((p): p is string => p !== undefined).join('|');
}

function WikitextImagePreview({ file, width, height, link, alt, className }: WikitextImageProps) {
    const img = (
        <WikiImage
            alt={alt}
            file={file}
            decoding="async"
            width={width}
            height={height}
            className="mw-file-element"
        />
    );

    let wrapper: React.ReactNode;
    if (link === undefined) {
        const normalizedFile = 'File:' + normalizeWikiTitle(file);
        wrapper = (
            <a
                href={getWikiPageUrl(normalizedFile)}
                onClick={e => {
                    e.preventDefault();
                    location.hash = '#/media/' + normalizedFile;
                }}
                className="mw-file-description"
            >
                {img}
            </a>
        );
    } else if (link) {
        if (link.startsWith('//')) {
            console.warn('link 不能以 "//" 开头，已忽略');
            wrapper = <span>{img}</span>;
        } else {
            wrapper = (
                <a href={getWikiPageUrl(link)} className="mw-file-description">
                    {img}
                </a>
            );
        }
    } else {
        wrapper = <span>{img}</span>;
    }

    const sizeIsUnset = width === undefined && height === undefined;
    const classList = new TokenList(sizeIsUnset ? 'mw-default-size' : undefined, className);

    return (
        <span className={classList.length > 0 ? classList.toString() : undefined} typeof="mw:File">
            {wrapper}
        </span>
    );
}

function WikitextImage(props: WikitextImageProps): ReactNode {
    if (CONVERT_TO_HTML) {
        return <WikitextImagePreview {...props} />;
    }

    const { file, width, height, link, alt, className } = props;
    const size = sizeToString(width, height);
    const params = paramsToString(size, link, alt, className);
    return `[[File:${file}${params ? `|${params}` : ''}]]`;
}

export { WikitextImage };
